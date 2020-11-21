package com.example.crudapplication.controller;

import com.example.crudapplication.exception.QuoteNotFoundException;
import com.example.crudapplication.model.Quote;
import com.example.crudapplication.service.QuoteService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = {"*"})
@RequestMapping("api/v1/quotes")
public class QuoteController {

	private final QuoteService quoteService;

	@GetMapping
	public Iterable<Quote> getAllQuotes() {	return quoteService.getAll();}

	@GetMapping("/{quoteId}")
	public Quote getQuoteById(@PathVariable String quoteId) throws QuoteNotFoundException {
		Optional<Quote> responseQuote = quoteService.getById(quoteId);
		if(responseQuote.isPresent()) {
			return responseQuote.get();
		} else {
			throw new QuoteNotFoundException("Quote not found");
		}
	}

	@PostMapping
	public Quote saveQuote(@RequestBody Quote quote) {
		return quoteService.save(quote);
	}

	@PutMapping("/{quoteId}")
	public Quote updateQuote(@PathVariable String quoteId, @RequestBody Quote quote) throws QuoteNotFoundException {
		return quoteService.update(quoteId, quote);
	}

	@DeleteMapping("/{quoteId}")
	public void deleteQuote(@PathVariable String quoteId) {
		quoteService.delete(quoteId);
	}
}
