package com.dacn.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class PdfFile {
	private Integer id;
	private Integer upload_id;
	private String upload_name;
	private String id_drive;
	private String filename;
	private String intro;
	private String title;
}
