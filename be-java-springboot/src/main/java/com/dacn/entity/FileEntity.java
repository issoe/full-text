package com.dacn.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity @Data
@Table(name="files")
public class FileEntity {
	@Id
	@Column(name="ids")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer ids;
	
	@Column(name="id_drive")
	private String id_drive;

	@Column(name="filename")
	private String filename;
	
	@Column(name="is_deleted")
	private Boolean is_deleted;
	
	@Column(name="upload_id_firebase")
	private String upload_id_firebase;

	@Column(name="upload_mail")
	private String upload_mail;

	@Column(name="intro")
	private String intro;
	
	@Column(name="title")
	private String title;
	
	@Column(name="create_on")
	private LocalDate create_on;
	
	@Column(name="filetype")
	private String filetype;
}
