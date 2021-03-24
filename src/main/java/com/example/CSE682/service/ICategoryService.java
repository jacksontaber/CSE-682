package com.example.CSE682.service;

import java.util.List;

import com.example.CSE682.model.Category;
import com.example.CSE682.model.User;

public interface ICategoryService {
	
	List<Category> getAll();
	
	Category getCategoryById(Long id);
	
	Category save(Category category);
	
	void deleteById(Long id);
	
	Category edit(Category newCategory, Long id);
	
	void addDefaultCategories(User user);

}
