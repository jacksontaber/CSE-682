package com.example.CSE682.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.CSE682.model.Category;
import com.example.CSE682.model.Expense;
import com.example.CSE682.service.CategoryService;
import com.example.CSE682.service.IExpenseService;


@RestController
@RequestMapping("/api")
public class HomeController {
	
	@Autowired
	CategoryService categoryService;
	
	@Autowired
	IExpenseService expenseService;

	//for testing - do not include in main program
	@GetMapping("/test")
	public void test() {
		
//		Category a = new Category("Rent");
//		Category aSaved = categoryService.save(a);
//		Category b = new Category("Food");
//		Category bSaved = categoryService.save(b);
//		
		
//		Category g = new Category("Transportation");
//		Category gSaved = categoryService.save(g);
//		Category h = new Category("Entertainment");
//		Category hSaved = categoryService.save(h);
		
		
//		Expense c = new Expense("Apartment", aSaved, 1000);
//		Expense cSaved = expenseService.save(c);
//		Expense d = new Expense("Groceries", bSaved, 200);
//		Expense dSaved = expenseService.save(d);
//		Expense e = new Expense("Summer Home", aSaved, 1500);
//		Expense eSaved = expenseService.save(e);
//		Expense f = new Expense("Chipotle", bSaved, 9.95);
//		Expense fSaved = expenseService.save(f);
//		
//		double total = expenseService.getTotalCost();
//		System.out.println(total);
		
		
	}
}