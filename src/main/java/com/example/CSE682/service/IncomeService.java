package com.example.CSE682.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.CSE682.repository.IncomeRepository;
import com.example.CSE682.model.Income;

@Service
public class IncomeService implements IIncomeService{
	
	@Autowired
	IncomeRepository incomeRepository;
	
	@Override
	public List<Income> getAllIncomes(){
		return incomeRepository.findAll();
	}
	
	@Override
	public Income getIncomeById(Long id){
		return incomeRepository.getIncomeById(id);
	}
	
	
	@Override 
	public Income save(Income income) {
		return incomeRepository.save(income);
	}
	
	@Override
	public Income edit(Income newIncome, Long id) {
		Income income = incomeRepository.getIncomeById(id);
		income.setIncome(newIncome.getIncome());
		income.setCategory(newIncome.getCategory());
		income.setIncomeid(newIncome.getIncomeid());
	    return incomeRepository.save(income);
	}
	
	@Override
	public void delete(Long id) {
		incomeRepository.deleteById(id);

	}
}
