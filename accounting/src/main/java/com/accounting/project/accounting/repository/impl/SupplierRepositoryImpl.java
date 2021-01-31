package com.accounting.project.accounting.repository.impl;
//package com.accounting.project.accounting.entity.repository.impl;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.accounting.project.accounting.entity.Supplier;
//import com.accounting.project.accounting.repository.SupplierRepository;
//
//@Service
//public class SupplierRepositoryImpl {
//
//	@Autowired
//	private SupplierRepository supplierRepository;
//	
//	public Supplier addSupplier(Supplier supplier) {
//		return supplierRepository.save(supplier);
//	}
//	
//	public Supplier findSupplierById(int id) {
//		return supplierRepository.findSupplierById(id);
//	}
//	
////	public Supplier editSupplier(int id, Supplier supplier) {
////		Supplier suppEdit = supplierRepository.findSupplierById(id);
////			suppEdit.setSupplierName(supplier.getSupplierName());
////			suppEdit.setCompanyName(supplier.getCompanyName());
////			suppEdit.setPhone(supplier.getPhone());
////			suppEdit.setEmail(supplier.getEmail());
////			suppEdit.setAddress(supplier.getAddress());
////			suppEdit.setCity(supplier.getCity());
////			suppEdit.setCountry(supplier.getCountry());
////			suppEdit.setZipCode(supplier.getZipCode());
////			supplier.setNote(supplier.getNote());
////		return supplierRepository.save(suppEdit);
////	}
//	
//	public void deleteSupplier(int id) {
//		 supplierRepository.deleteById(id);
//	}
//	
//	public List<Supplier> findAllSupplier(){
//		return supplierRepository.findAll();
//	}
//	
//}
