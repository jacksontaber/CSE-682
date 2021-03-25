package com.example.CSE682.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.CSE682.model.Income;
import com.example.CSE682.service.IIncomeService;

@RestController
@RequestMapping("/api/income")
public class IncomeController {

	@Autowired
	IIncomeService incomeService;
	
	@GetMapping("/getIncome")
    public Income getIncomeById(Long id) {
		return incomeService.getIncomeById(id);
    }
	@GetMapping("/getIncomes")
    public List<Income> getIncomes() {
		return incomeService.getAllIncomes();
    }

	@PostMapping("/addIncome")
	public Income addIncome(@RequestBody Income income){
		return incomeService.save(income);
	}

	@PutMapping("/editIncome/{id}")
	public Income editIncome(@RequestBody Income income, @PathVariable Long id){
		return incomeService.edit(income, id);
	}
	
	@DeleteMapping("/deleteIncome/{id}")
	void deleteIncome(@PathVariable Long id) {
		incomeService.delete(id);
	}
	
	@GetMapping("/getAllIncomes")
    public List<Income> getAllIncomes() {
		return incomeService.getAllIncomes();
    }
	
	@GetMapping("/getTotalIncome")
    public double getTotalIncome() {
		return incomeService.getTotalIncome();
    }

	@GetMapping("/getIdByVal")
	public Long GetIdByVal(@PathVariable String desc, @PathVariable double income)
	{
		return incomeService.GetIdByVal(desc, income);
		
	}

}
	

	
	
    
	


