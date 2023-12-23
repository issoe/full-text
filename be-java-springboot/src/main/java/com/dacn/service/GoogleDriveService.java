package com.dacn.service;

import java.io.ByteArrayInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.security.GeneralSecurityException;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.dacn.entity.FileEntity;
import com.dacn.repository.FileRepository;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.InputStreamContent;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;;

@Component
public class GoogleDriveService {
	// Directory to store authorization tokens for this application.
	private static final Integer PAGE_SIZE = 10;
    private static final String TOKENS_DIRECTORY_PATH = "./src/main/java/com/dacn/service";
    private static final String CREDENTIALS_FILE_PATH = "credentials.json";
//    private static final String CREDENTIALS_FILE_PATH = "../tokens/credentials.json";    
    private static final String OUTPUT_PATH = "../fe-react-js/src/storage/";
    private static final String FOLDER_ID = "1EBVvBWqKI-NruWL98ToG4PuiTcYG6JkW";
    // Application name
    private static final String APPLICATION_NAME = "SearchApp";
    // Global instance of the JSON factory.
    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    
    /**
	 * Global instance of the scopes required by this quickstart.
     * If modifying these scopes, delete your previously saved tokens/ folder.
     */
    private static final List<String> SCOPES = Collections.singletonList(DriveScopes.DRIVE_FILE);

    /**
     * Creates an authorized Credential object.
     *
     * @param HTTP_TRANSPORT The network HTTP Transport.
     * @return An authorized Credential object.
     * @throws IOException If the credentials.json file cannot be found.
     */
  
    @Autowired
    FileRepository fileRepository;
  
    private static Credential getCredentials(final NetHttpTransport HTTP_TRANSPORT) throws IOException {
	    // Load client secrets.
	    InputStream in = GoogleDriveService.class.getResourceAsStream(CREDENTIALS_FILE_PATH);
	    if (in == null) {
	      throw new FileNotFoundException("Resource not found: " + CREDENTIALS_FILE_PATH);
	    }
	    GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));
	    
	    // Build flow and trigger user authorization request.
	    GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, SCOPES)
	    		.setDataStoreFactory(new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH)))
	    		.setAccessType("offline").build();
	    
	    LocalServerReceiver receiver = new LocalServerReceiver.Builder().setPort(8888).build();
	    Credential credential = new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");
	    //returns an authorized Credential object.
	    return credential;
    }

	public Drive getInstance() throws GeneralSecurityException, IOException {
		// Build a new authorized API client service.
		final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
		Drive service = new Drive.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(HTTP_TRANSPORT))
				.setApplicationName(APPLICATION_NAME).build();
		return service;
	}

	public  String getfiles() throws IOException, GeneralSecurityException {
		Drive service = getInstance();
	    
	    // Print the names and IDs for up to 10 files.
	    FileList result = service.files().list().setPageSize(10).execute();
	    List<File> files = result.getFiles();
	    
	    if (files == null || files.isEmpty()) {
	      System.out.println("No files found.");
	      return "No files found.";
	    } else return files.toString();    
	}

  	// Done
  	public Page<FileEntity> getFileByPageId(Integer pageId) throws IOException, GeneralSecurityException {
        Sort sort = Sort.by(Sort.Order.desc("ids"));
  		Pageable pageable = PageRequest.of(pageId, PAGE_SIZE, sort);
  		Page<FileEntity> filePage = fileRepository.getFilesByPageId(pageable);
  		return filePage;
  	}
  
  
  	public Boolean uploadFile(MultipartFile file, String id_firebase, String upload_mail) {
	  try {
	     if (null != file) {
	    	String fileName = file.getOriginalFilename(); 
	    	
	    	
            int lastIndex = fileName.lastIndexOf('.');
            String extension = "unsupport";
            if (lastIndex > 0) {
            	extension = fileName.substring(lastIndex + 1).toLowerCase();
            }
            
	    	 
	        File fileMetadata = new File();
	        fileMetadata.setParents(Collections.singletonList(FOLDER_ID));
	        fileMetadata.setName(fileName);
	        
	        File uploadFile = getInstance()
	              .files()
	              .create(fileMetadata, new InputStreamContent(
	                    file.getContentType(),
	                    new ByteArrayInputStream(file.getBytes()))
	              )
	              .setFields("id").execute();
	        
            FileEntity myFile = new FileEntity();
            myFile.setId_drive(uploadFile.getId());
            myFile.setFilename(fileName);
            myFile.setIs_deleted(false);
            myFile.setUpload_id_firebase(id_firebase);
            myFile.setUpload_mail(upload_mail);
            myFile.setIntro("Wating from elastic");
            myFile.setTitle("Wating from elastic");
            myFile.setCreate_on(LocalDate.now());            
            myFile.setFiletype(extension);
            fileRepository.save(myFile);
            
            System.out.println("[Successfully uploaded] File: '" + file.getOriginalFilename() + "' with id: '" + uploadFile.getId() + "' with extension: " + extension);
	        return true;
	     }
	  } catch (Exception e) {
	     System.out.printf("Error: "+ e);
	     return false;
	  }
	  return false;
	}

  	public String getFileById(String id) throws IOException, GeneralSecurityException {
	    Drive service = getInstance();
	    File file = service.files().get(id).execute();
	    
	    if (file == null || file.isEmpty()) {
	      System.out.println("No files found.");
	      return "No files found.";
	    } else {
	      return "Filename: " + id + " --> " + file.toString();
	    }  		
  	}
  	
  	public Boolean deleteFileById(String id, Boolean isDrive) throws GeneralSecurityException, IOException {
  		if (isDrive) {
  	  		try {
  	  			Drive service = getInstance();
  	  	  		service.files().delete(id).execute();
  	  	  		return true;
  	  		} catch(Exception e) {
  	  		     System.out.printf("Error: "+ e);  	
  	  		     return false;
  	  		}
  		} else {
  			Optional<FileEntity> myFile = fileRepository.findById(Integer.parseInt(id));
  			if (myFile.isPresent() && (myFile.get().getIs_deleted() == false)) {  				
  				myFile.get().setIs_deleted(true);
  				fileRepository.save(myFile.get());
  				return true;
  			} else return false;
  		}
  	}
	

  	
  	// Done
  	/**
     * Download a Document file in PDF format.
     *
     * @param realFileId file ID of any workspace document format file.
     * @return byte array stream if successful, {@code null} otherwise.
     * @throws IOException if service account credentials file not found.
  	 * @throws GeneralSecurityException 
     */
    public String downloadFile(String realFileId) throws IOException, GeneralSecurityException {
    	try {
        	String fileName = fileRepository.getFileNameByDriveId(realFileId);
        	if (fileName != null) {
        		String destinationPath = OUTPUT_PATH + fileName;        		
        		OutputStream oOutputStream = new FileOutputStream(destinationPath);
        		Drive service = getInstance();
        		service.files().get(realFileId).executeMediaAndDownloadTo(oOutputStream);
        		oOutputStream.flush();
        		oOutputStream.close();
        		System.out.println("[Successfully downloaded] Destination: '" + destinationPath + "'");
        		return fileName;
        	} else return "";
        } catch (IOException e) {
            return "";
        }
    }
}