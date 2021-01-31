package com.accounting.project.accounting.repository.impl;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.accounting.project.accounting.entity.BankTransfer;
import com.accounting.project.accounting.entity.JournalEntry;
import com.accounting.project.accounting.repository.BankTransferRepository;

@Service
public class BankTranferRepositoryImpl {
	
	  String directory =System.getProperty("user.dir")+"/src/main/resources/attachment/bankTransfer/";

	@Autowired
	BankTransferRepository bankTransferRepository;
	
	public List<BankTransfer> listBankTransfer(){
		return bankTransferRepository.findAll();
	}
	
	public BankTransfer getSingleBankTransfer(int id) {
		return bankTransferRepository.getOne(id);
	}
	
	
	public BankTransfer saveBankTransfer(BankTransfer bankTransfer) {
		return bankTransferRepository.save(bankTransfer);
	}
	
	public BankTransfer editBankTransfer(int id, BankTransfer bankTransfer) {
		return bankTransferRepository.save(bankTransfer);
	}
	
	public void deleteBankTransfer(int id) {
		bankTransferRepository.deleteById(id);
	}

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
		BankTransfer bankTransfer = getSingleBankTransfer(id);
		for (int i = 0; i < attachment.length; i++) {
			MultipartFile multipartFile = attachment[i];
			Path filePath = Paths.get(directory,multipartFile.getOriginalFilename());
			try {
				Files.write(filePath, multipartFile.getBytes());
				System.out.println("upload successfull");
				Path source = Paths.get(directory,multipartFile.getOriginalFilename());
		         UUID uuid = UUID.randomUUID();
			    String newFileName = "bank-transfer-"+bankTransfer.getId()+"-"+uuid.toString() + "."+FilenameUtils.getExtension(multipartFile.getOriginalFilename());
	            Files.move(source, source.resolveSibling(newFileName));
	            bankTransfer.getAttachments().add(newFileName);	
				System.out.println(filePath);
				saveBankTransfer(bankTransfer);
				status = true;
			} catch (Exception e) {
				System.out.println("failed "+e);
				status = false;
			}
		}
	
		return status;
	}

}
