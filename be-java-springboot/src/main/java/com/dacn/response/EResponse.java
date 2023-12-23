package com.dacn.response;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data 
@AllArgsConstructor
public class EResponse {
    private SubResponse subRes;
    

	/**
	 * OK: success
	 * Status code: 200
	 * 
	 * @param obj Object
	 * @return ResponsEntity
	 */
    public static ResponseEntity<Object> ok(Object obj) {
    	return ResponseEntity.ok(obj);
    }
    
	/**
	 * for create and update, delete method
	 * OK: success
	 * Status code: 200
	 * 
	 * @param message String 
	 * @return ResponsEntity
	 */    
    public static ResponseEntity<?> ok(String message) {
    	return ResponseEntity.ok(new SubResponse(LocalDateTime.now(), 200, message));
    }
    
	/**
	 * for create and update, delete method
	 * OK: success
	 * Status code: 200
	 * 
	 * @param message String 
	 * @return ResponsEntity
	 */    
    public static ResponseEntity<?> ok(Boolean status) {
    	if (status) return ResponseEntity.ok(new SubResponse(LocalDateTime.now(), 200, "success"));
    	else return ResponseEntity.badRequest().body(new SubResponse(LocalDateTime.now(), 400, "fail"));
    }
    
	/**
	 * bad request
	 * Status code: 400
	 * 
	 * @param errorMessage String 
	 * @return ResponsEntity
	 */    
    public static ResponseEntity<SubResponse> badRequest(String errorMessage) {
        return ResponseEntity.badRequest().body(new SubResponse(LocalDateTime.now(), 400, errorMessage));
    }
    
	/**
	 * not found
	 * Status code: 404
	 * 
	 * @param errorMessage String 
	 * @return ResponsEntity
	 */   
    public static ResponseEntity<SubResponse> notFound(String errorMessage) {
    	return ResponseEntity.status(HttpStatus.NOT_FOUND)
    				.body(new SubResponse(LocalDateTime.now(), 404, errorMessage));
    }
    
	/**
	 * come from server, when impossible create or update data
	 * Status code: 500
	 * 
	 * @param errorMessage String 
	 * @return ResponsEntity
	 */   
    public static ResponseEntity<?> exception(String message) {
    	return ResponseEntity.internalServerError().body(new SubResponse(LocalDateTime.now(), 500, message));
    }
    
    @Data 
    @AllArgsConstructor
    private static class SubResponse {
    	private LocalDateTime timestamp;
    	private Integer status;
        private String message;
    }
}