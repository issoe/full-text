package com.dacn.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.dacn.entity.HistoryEntity;

@Repository
public interface HistoryRepository extends JpaRepository<HistoryEntity, Integer> {

    @Query("SELECT h.keyword FROM HistoryEntity h WHERE h.user_id = ?1 AND h.keyword LIKE %?2%")
	public List<String> getMyHistories(String userId, String keyword);
	
    @Query("SELECT COUNT(h.keyword) FROM HistoryEntity h GROUP BY h.keyword ORDER BY COUNT(h.keyword) DESC LIMIT 10")
    public List<Integer> get10Frequence();
    
    @Query("SELECT h.keyword FROM HistoryEntity h GROUP BY h.keyword ORDER BY COUNT(h.keyword) DESC LIMIT 10")
    public List<String> get10FrequenceText();
}
