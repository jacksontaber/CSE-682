package com.example.CSE682.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.CSE682.model.Income;

@Repository
public interface IncomeRepository extends CrudRepository<Income, Long>{

	List<Income> findAll();
	
	
	Optional<Income> findById(Long id);
		
	@Query("select i from Income i where i.incomeid = :id")
	Income getIncomeById(@Param("id") Long id);
	
	void deleteById(Long id);
}