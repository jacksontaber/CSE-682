var table;
var chart;
var button = false;
var buttonModal = true;

$(document).ready(function() {
	init();
});

function init(){
	getUser();
	createChart();
	createTable();
	enableListeners();
}

//creates the income donut chart
function createChart() {
	var categoryArr = [];
	$.ajax({
			url: "/api/income/getIncomes"
		}).done(function(data){
			for(let item in data){
				categoryArr.push([ data[item].income, data[item].cost]);	
			}								
				chart = c3.generate({
        			bindto: "#c3chart_Income",
					data: {
						columns: categoryArr,
						type: 'donut',
        			},
					donut: {
						label: {
							show: false
						}
				},
        });
		});
    
    };

	//creates the income table
	function createTable() {
		
		$('#example thead tr').clone(true).appendTo( '#example thead' );
		$('#example thead tr:eq(1) th').each( function (i) {
        var title = $(this).text();
        $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
 
        $( 'input', this ).on( 'keyup change', function () {
            if ( table.column(i).search() !== this.value ) {
                table
                    .column(i)
                    .search( this.value )
                    .draw();
            }
        } );
		} );
		
		table = $('#example').DataTable({
			 "columnDefs": [
            {
                "targets": [ 0 ],
                "visible": false,
                "searchable": false
            },
            {
        		targets: 2,
        		className: 'dt-body-right'
    		}
        ]
		});
		
		$.ajax({
			url: "/api/income/getIncomes"
		}).done(function(data){
			for(let item in data){
				table.row.add([
					data[item].incomeid,
					data[item].income,					
					data[item].cost.toFixed(2),
					"<input id='btnDelete' class='btn btn-success' width='15px' value='Delete' />"
				]).draw( false );
			}
		});

		$('#example tbody').on('click', 'tr', function () {
			createModal(table.row( this ).data(), $(this));
		} );
		
	}

	//enable listeners for income page
	function enableListeners(){
		//add a new income
		$('#submit').off('click').on('click', function(){
			if(button){
				var income = createIncome($('#description').val(), $('#income').val());
				$('#description').val('');
				$('#income').val('');
				button = false;
				$('#submit').addClass('disabled');	
				$.ajax({
					url: "/api/income/addIncome",
					method: "POST",
					contentType: "application/json",
					dataType: "json",
					data: JSON.stringify(income)
				}).done(function(income){
					table.row.add([
						income.incomeid,
						income.income,
						income.cost
					]).draw( false );
					createChart();
				});
		}
	});

	$('#submit').addClass('disabled');
	//validates the income form
	$('.card-body').off('change input').on('change input', function(){
		if(!isBlank($('#description').val()) && !isBlank($('#income').val())){
			$('#submit').removeClass('disabled');
			button = true;
		}
		else{
			$('#submit').addClass('disabled');
			button = false;
		}
	});

	//validates the income modal
	$('#incomeModalForm').off('change input').on('change input', function(){
		if(!isBlank($('#descriptionModal').val()) && !isBlank($('#incomeModal').val())){
			$('#submitModal').removeClass('disabled');
			buttonModal = true;
		}
		else{
			$('#submitModal').addClass('disabled');
			buttonModal = false;
		}
	});

	//validates that income is not negative 
	$('#income').off('input').on('input', function(){
		if($('#income').val() < 0){
			$('#income').val(0);
		}
	});

	//validates that income modal is not negative
	$('#incomeModal').off('input').on('input', function(){
		if($('#incomeModal').val() < 0){
			$('#incomeModal').val(0);
		}
	});
	
	} 

	//creates modal to edit a income
	function createModal(data, row){
		// Get the modal
		var modal = document.getElementById("myModal");

		modal.style.display = "block";

		$('#descriptionModal').val(data[1]); 
		$('#incomeModal').val(data[2]);

		//edit income
		$('#submitModal').off('click').on('click', function(){
			if(buttonModal){
				var income = createIncome($('#descriptionModal').val(), $('#incomeModal').val());
				$.ajax({
					url: "/api/income/editIncome/" + data[0],
					method: "PUT",
					contentType: "application/json",
					dataType: "json",
					data: JSON.stringify(income)
				}).done(function(income){
					table.row( row ).remove().draw();
					table.row.add([
						income.incomeid,
						income.income,
						income.cost
					]).draw( false );
					createChart();
					modal.style.display = "none";
				});
		}
		});

		//delete income
		$('#deleteModal').off('click').on('click', function(){
			$.ajax({
				url: "/api/income/deleteIncome/" + data[0],
				method: "DELETE",
				contentType: "application/json",
				dataType: "json"
			}).always(function(){
				table.row( row ).remove().draw();
				createChart();
				modal.style.display = "none";
			});
		});
		
		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("close")[0];

		// When the user clicks on <span> (x), close the modal
		span.onclick = function() {
			modal.style.display = "none";
		}

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
		}
	}

	function getUser() {
		$.ajax({
				url: "/api/User/getUsername"
			}).done(function(data){			
				var x = document.getElementById("username");
				x.innerHTML = data; 
			});
	}
	
	function isBlank(str) {
		return (!str || /^\s*$/.test(str)); //check for empty and all blank
	}
	
	