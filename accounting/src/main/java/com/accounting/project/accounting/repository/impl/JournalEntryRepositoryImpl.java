package com.accounting.project.accounting.repository.impl;

import java.io.File;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.accounting.project.accounting.entity.CategoryAccount;
import com.accounting.project.accounting.entity.Company;
import com.accounting.project.accounting.entity.JournalEntry;
import com.accounting.project.accounting.repository.JournalEntryRepository;

@Service
public class JournalEntryRepositoryImpl {

	@Autowired
	private JournalEntryRepository journalEntryServices;
	
	  String directory =System.getProperty("user.dir")+"/src/main/resources/attachment/journalEntry/";
	
	public JournalEntry findById(int id) {
		return journalEntryServices.getOne(id);
	}
	
	
	public JournalEntry save(JournalEntry entry){
		return journalEntryServices.save(entry);
	}
	
	public void deleteJournal (int id) {
		
		JournalEntry journalEntry = journalEntryServices.getOne(id);
		for (String attachment : journalEntry.getAttachments()) {
			File filetoDelete = new File(directory + attachment);
			filetoDelete.delete();
			
		}

		 journalEntryServices.deleteById(id);
	}

//	public void deleteAttachment(int id) {
//		JournalEntry journalEntry = findById(id);
//		File filetoDelete = new File(directory+journalEntry.getAttachments());
//		filetoDelete.delete();	
//		journalEntry.setAttachments(null);
//		journalEntryServices.save(journalEntry);
//	}
//	
//
	public Resource getAttachment(String filename) throws MalformedURLException {
        Path filePath =Paths.get(directory+filename)
                .toAbsolutePath().normalize();
        Resource resource = new UrlResource(filePath.toUri());
	return resource;

	}


	public boolean updateAttachment(int id, MultipartFile[] attachment) {
	System.out.println("update attachment");
		boolean status = false;
		System.out.println(attachment.length);
		JournalEntry journalEntry = findById(id);
		for (int i = 0; i < attachment.length; i++) {
			MultipartFile multipartFile = attachment[i];
			Path filePath = Paths.get(directory,multipartFile.getOriginalFilename());
			try {
				Files.write(filePath, multipartFile.getBytes());
				System.out.println("upload successfull");
				Path source = Paths.get(directory,multipartFile.getOriginalFilename());
		         UUID uuid = UUID.randomUUID();
			    String newFileName = "journal-entry-"+journalEntry.getId()+"-"+uuid.toString() + "."+FilenameUtils.getExtension(multipartFile.getOriginalFilename());
	            Files.move(source, source.resolveSibling(newFileName));
				journalEntry.getAttachments().add(newFileName);	
				System.out.println(filePath);
				journalEntryServices.save(journalEntry);
				status = true;
			} catch (Exception e) {
				System.out.println("failed "+e);
				status = false;
			}
		}
	
		return status;
	}


	public void deleteAttachment(int id, String name) {
		System.out.println(name);
			JournalEntry jouranlEntry = findById(id);
			for (String attachment : jouranlEntry.getAttachments()) {
				System.out.println(attachment.equals(name));
				System.out.println(attachment);
				if(attachment.equals(name)) {
					File filetoDelete = new File(directory + name);
					filetoDelete.delete();
					if(jouranlEntry.getAttachments().size()==1) {
						jouranlEntry.setAttachments(null);
					}else {
						jouranlEntry.getAttachments().remove(name);
					}
					
				}
			}
			
			journalEntryServices.save(jouranlEntry);
		
	}




}
