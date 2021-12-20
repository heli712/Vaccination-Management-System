package com.example.springsocial.controller;

import com.example.springsocial.model.Diseases;
import com.example.springsocial.service.DiseaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;

@Transactional
@RestController
@RequestMapping(path="/disease")
public class DiseaseController {
    @Autowired
    private final DiseaseService diseaseService;

    public DiseaseController(DiseaseService diseaseService) {
        this.diseaseService = diseaseService;
    }

//   // @PreAuthorize("hasAuthority('admin')")
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value="/createDisease", produces = { MediaType.APPLICATION_JSON_VALUE } )
    public ResponseEntity<?> createDisease(@RequestParam Map<String, String> params, Diseases disease) {
        try {
            Diseases persistedDisease = diseaseService.createDisease(disease);
            return ResponseEntity.accepted().body(persistedDisease);
        }
        catch(Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
        }
    }

    //@PreAuthorize("hasAuthority('admin')")
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value="/getAllDiseases", produces = { MediaType.APPLICATION_JSON_VALUE } )
    public List<Diseases> getAllDiseases() {
        try {
            List<Diseases> persistedDiseaseList = diseaseService.getDiseases();
            return persistedDiseaseList;
        }
        catch(Exception e) {
            return null;
        }
    }


}
