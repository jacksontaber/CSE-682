	
	//function to check if the string is empty or blank
	function isBlank(str) {
    	return (!str || /^\s*$/.test(str)); //check for empty and all blank
	}
		
	//function to compare new and reentered password boxes and alert if they do not match
	function checkMatch()
	{		
		var newPassword = $('#newpassword').val(); //get the new password
		var retypePassword = $('#retypepassword').val(); //get the reentered password
		
		//check if either is blank
		if(isBlank(newPassword) || isBlank(retypePassword)) return false;
		
		//check if the passwords match and set message
		if(newPassword != retypePassword)
		{
			document.getElementById("pwdmatch").style.display = "block"; //show message
			return false;
		}
		else
		{
			document.getElementById("pwdmatch").style.display = "none";  //hide message			
			return true;	
		}
	}
	
	//function to enable change button only when all fields are populated and the new passwords match
	function checkReady()
	{
		var username = $('#username').val(); //get the username
			
		if(isBlank(username) || !checkMatch()) //check if user name is not blank and new password matches reentered password 
		{
			document.getElementById("subbtn").style.display = "none"; //hide the submit buttons divider
			return false;
		}
		else
		{
			document.getElementById("subbtn").style.display = "inline"; //show the button's divider		
			return true;
		}
	
	}
	
	//assume no error and set display
	$(document).ready(function() {
	document.getElementById("error").style.display = "none"; 
	});
	
	//handle the user's click of the submit button
	$(document).ready(function() {
		
		
		//register the user
		$('#submit').off('click').on('click', function(){
	//	alert ('reg');
		
		var saveObj = {};
		//saveObj.userid =  parseInt("0");
		saveObj.userName = $('#username').val();		
		saveObj.password = $('#newpassword').val();
		
		//add the user
		$.ajax({
			url: "/api/User/addUser",
			method: "POST",
			contentType: "application/json",
    		dataType: "json",
			data: JSON.stringify(saveObj),
			success: function() {
            	 //now login the new user if created
            	 alert ('created ok');         	 
            	 $.ajax({
            	 	url: "/login",
					method: "POST",		
					contentType: "application/json",				
					data: saveObj,						
            			error: function() {    
            				//show the error message         
             				alert('post error'); 
            			}
					});
					
            },
            error: function() {    
            //show the error message         
             document.getElementById("error").style.display = "block"; 
            }
          });
	});
	
	});	
	