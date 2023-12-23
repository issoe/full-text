package com.dacn.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class PageStatistic {
	private Integer numOfPages;
	private Integer currPage;
	private Integer pageSize;
}
