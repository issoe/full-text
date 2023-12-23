package com.dacn.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dacn.entity.HistoryEntity;
import com.dacn.repository.HistoryRepository;
import com.dacn.response.OneTopHit;

@Service
public class HistoryService {
	@Autowired
	private HistoryRepository historyRepository;
	
	public List<String> getHistoryByKeyword(String userId, String keyword) {
		return historyRepository.getMyHistories(userId, keyword);
	}
	
	public Boolean newKeyword(String userId, String keyword) {
		HistoryEntity entity = new HistoryEntity();
		entity.setUser_id(userId);
		entity.setKeyword(keyword);
		entity.setVote(0);
		historyRepository.save(entity);
		return true;
	}
	
	public List<OneTopHit> getTopHit() {
		List<Integer> nums = historyRepository.get10Frequence();
		List<String> keywords = historyRepository.get10FrequenceText();
		List<OneTopHit> tophits = new ArrayList<>();
		for(int i = 0; i < 10 ; i++) tophits.add(new OneTopHit(keywords.get(i), nums.get(i)));
		return tophits;
	}
}
