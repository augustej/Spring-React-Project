package com.example.demo.controller;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.Details;
import com.example.demo.entity.DetailsRepository;
import com.univocity.parsers.csv.CsvParser;
import com.univocity.parsers.common.record.Record;
import com.univocity.parsers.csv.CsvParserSettings;

@RestController
public class Controller {
	
	@Autowired
	DetailsRepository service;
	
    @CrossOrigin(origins = "http://localhost:3000")
	@PostMapping(path = "upload")	
	public  List<Details> uploadData(@RequestParam("file") MultipartFile file) throws Exception {
		List<Details> detailsList = new ArrayList<>();
		InputStream inputStream = file.getInputStream();
		CsvParserSettings setting = new CsvParserSettings();
		setting.setHeaderExtractionEnabled(true);
		CsvParser parser = new CsvParser(setting);
		List<Record> parseAllRecords = parser.parseAllRecords(inputStream);
		parseAllRecords.forEach(record -> {
			Details personDetails = new Details();
			personDetails.setName(record.getString("name"));
			personDetails.setEmail(record.getString("email"));
			personDetails.setPhone(record.getString("phone"));
			personDetails.setId(parseAllRecords.indexOf(record));
			detailsList.add(personDetails);

		});
		
		service.saveAll(detailsList);
		return service.findAll();
	}
	
    @CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/")
    public List<Details> getDetails() {
    	
        return service.findAll();
    }
}
