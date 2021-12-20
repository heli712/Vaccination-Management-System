package com.example.springsocial.controller;
import com.example.springsocial.model.Vaccines;
import com.example.springsocial.service.VaccineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Transactional
@RestController
@RequestMapping(path="/vaccine")
public class VaccineController {
    @Autowired
    private final VaccineService vaccineService;

    public VaccineController(VaccineService vaccineService) {
        this.vaccineService = vaccineService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value="/createVaccine", produces = { MediaType.APPLICATION_JSON_VALUE } )
    public Vaccines createVaccine(@RequestParam Map<String, String> params, Vaccines vaccine) {
        String[] diseases = params.get("diseaseNumbers").split(",");
        List<String> diseaseList = Arrays.asList(diseases);
        try {
            System.out.println("Entered");
            Vaccines persistedVaccine = vaccineService.createVaccine(vaccine,diseaseList);
            return persistedVaccine;
        }
        catch(Exception e) {
            return null;
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value="/getAllVaccines", produces = { MediaType.APPLICATION_JSON_VALUE } )
    public List<Vaccines> getAllVaccines() {
        try {
            List<Vaccines> persistedVaccineList = vaccineService.getVaccines();
            return persistedVaccineList;
        }
        catch(Exception e) {
            return null;
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value="/getFilteredVaccinesAndDiseases", produces = { MediaType.APPLICATION_JSON_VALUE } )
    public List<Vaccines> getFilteredVaccinesAndDiseases(@RequestParam Map<String, String> params) {
        String clinicId = params.get("clinicId");
        try {
            List<Vaccines> persistedVaccineList = vaccineService.getFilteredVaccinesAndDiseases(clinicId);
            return persistedVaccineList;
        }
        catch(Exception e) {
            return null;
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value="/getDiseasesByVaccineId", produces = { MediaType.APPLICATION_JSON_VALUE } )
    public Vaccines getDiseasesByVaccineId(@RequestParam Map<String, String> params) {
        String vaccineId = params.get("vaccineId");
        try {
            Vaccines persistedVaccineList = vaccineService.getDiseasesByVaccineId(vaccineId);
            return persistedVaccineList;
        }
        catch(Exception e) {
            return null;
        }
    }
}
