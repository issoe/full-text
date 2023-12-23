package com.dacn.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity @Data
@Table(name="history")
public class HistoryEntity {
	@Id
	@Column(name="ids")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer ids;
	
	@Column(name="keyword")
	private String keyword;

	@Column(name="user_id")
	private String user_id;
	
	@Column(name="vote")
	private Integer vote;
}
