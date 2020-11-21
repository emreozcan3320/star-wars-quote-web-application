package com.example.crudapplication.repository;

import com.example.crudapplication.model.Quote;
import org.springframework.data.repository.CrudRepository;


public interface QuoteRepository extends CrudRepository<Quote, Integer> {
}
