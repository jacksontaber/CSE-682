package com.example.CSE682.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.CSE682.model.Limit;

public interface LimitRepository extends CrudRepository<Limit, Long>{

	List<Limit> findAll();
	
	Optional<Limit> findById(Long id);
	
//	@Query("select l from limit l")
//	Limit getLimitById2(Long id);
	
	@Query("select l from Limit l where l.limitid = :id")
	Limit getLimitById(@Param("id") Long id);
	
	void deleteById(Long id);
}
