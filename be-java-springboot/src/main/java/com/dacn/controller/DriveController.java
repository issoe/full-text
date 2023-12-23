package com.dacn.controller;

import java.io.IOException;
import java.security.GeneralSecurityException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dacn.response.EResponse;
import com.dacn.service.GoogleDriveService;

@RestController
public class DriveController {
    @Autowired
    private GoogleDriveService service;
    
    // for testing
    @GetMapping("/")
    public String getAllFiles() throws IOException, GeneralSecurityException {
        return service.getfiles();
    }
    
    @GetMapping("/page/{id}")
    public ResponseEntity<?> getFilesByPageId(@PathVariable Integer id) throws IOException, GeneralSecurityException {
    	return ResponseEntity.ok(service.getFileByPageId(id));
    }
    
    @PostMapping("/upload")
    @CrossOrigin(origins = "http://127.0.0.1:5173/")
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file,
    								@RequestParam("upload_id") String upload_id_firebase,
    								@RequestParam("upload_mail") String upload_mail
    		) throws IOException, GeneralSecurityException {
    	if (service.uploadFile(file, upload_id_firebase, upload_mail)) return EResponse.ok("Successfully uploaded");
    	else return EResponse.notFound("Impossible to upload file");
    }
    
    @PostMapping("/get")
    public String getFileById(@RequestParam String id_drive) throws IOException, GeneralSecurityException {
    	return service.getFileById(id_drive);
    }
    
    @GetMapping("/download/{id}")
    public ResponseEntity<?> downloadFileById(@PathVariable String id) throws IOException, GeneralSecurityException {
    	String res = service.downloadFile(id);
        if (res == "") System.out.println("Id drive not found");
        else System.out.println("Successfully downloaded");
        return EResponse.ok(res);
    }

    @DeleteMapping("/file")
    public ResponseEntity<?> deleteFileById(@RequestParam String id) throws GeneralSecurityException, IOException {
    	if (service.deleteFileById(id, false)) return EResponse.ok("Id = " + id + " was deleted");
    	else return EResponse.notFound("Id not found, or deleted");
    }
}
