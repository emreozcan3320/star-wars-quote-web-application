package com.example.crudapplication.repository;

import com.example.crudapplication.model.Quote;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

public interface QuoteRepository extends CrudRepository<Quote, Integer> {
}
