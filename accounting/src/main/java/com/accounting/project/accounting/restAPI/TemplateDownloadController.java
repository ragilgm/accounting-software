package com.accounting.project.accounting.restAPI;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.core.io.ByteArrayResource;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
	
@CrossOrigin
@RestController
@RequestMapping(value = "/api/v1/")
public class TemplateDownloadController {
	
	
	  String directory =System.getProperty("user.dir")+"/src/main/resources/templates/";
	
		@GetMapping("/bankStatement/template")
	    public ResponseEntity<?> downloadFile() throws IOException {
			  File file = new File(directory + "BankStatement.xlsx");

		        Path path = Paths.get(file.getAbsolutePath());
		        System.out.println(path);
		        ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));


		        HttpHeaders header = new HttpHeaders();
		        header.setContentType(new MediaType("application", "vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
		        header.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=BankStatement.xlsx");
		        
		        return ResponseEntity.ok()
		                .headers(header)
		                .contentLength(file.length())
		                .body(resource);
	    }
		
		@GetMapping("/importAccount/template")
		public ResponseEntity<?> downloadTemplateAccount() throws IOException {
			  File file = new File(directory + "templateAccount.xlsx");

		        Path path = Paths.get(file.getAbsolutePath());
		        System.out.println(path);
		        ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));


		        HttpHeaders header = new HttpHeaders();
		        header.setContentType(new MediaType("application", "vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
		        header.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=templateAccount.xlsx");
		        
		        return ResponseEntity.ok()
		                .headers(header)
		                .contentLength(file.length())
		                .body(resource);
		}
		@GetMapping("/importJournalEntry/template")
		public ResponseEntity<?> importJournalEntryTemplate() throws IOException {
			File file = new File(directory + "templateJournalEntry.xlsx");
			
			Path path = Paths.get(file.getAbsolutePath());
			System.out.println(path);
			ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));
			
			
			HttpHeaders header = new HttpHeaders();
			header.setContentType(new MediaType("application", "vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
			header.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=templateJournalEntry.xlsx");
			
			return ResponseEntity.ok()
					.headers(header)
					.contentLength(file.length())
					.body(resource);
		}

}
