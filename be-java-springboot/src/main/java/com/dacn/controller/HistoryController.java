package com.dacn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.dacn.request.Keyword;
import com.dacn.response.EResponse;
import com.dacn.service.HistoryService;

@RestController
public class HistoryController {
	@Autowired
	private HistoryService historyService;
	

	@PostMapping("/history")
	public ResponseEntity<?> getHistoriesByKeyword(@RequestBody Keyword keyword) {
		return EResponse.ok(historyService.getHistoryByKeyword(keyword.getUserId(), keyword.getKeyword()));
	}
	
	@PostMapping("/history-create")
	public ResponseEntity<?> newKeyword(@RequestBody Keyword keyword) {
		return EResponse.ok(historyService.newKeyword(keyword.getUserId(), keyword.getKeyword()));
	}
	
	@GetMapping("/top-hit")
	public ResponseEntity<?> getTopHit() {
		return EResponse.ok(historyService.getTopHit());
	}
}
