package com.example.springsocial.controller;

import com.example.springsocial.model.Clinics;
import com.example.springsocial.service.ClinicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Transactional
@RestController
@RequestMapping(path="/clinic")
public class ClinicController {
    @Autowired
    private final ClinicService clinicService;

    public ClinicController(ClinicService clinicService) {
        this.clinicService = clinicService;
    }
    //@PreAuthorize("hasAuthority('admin')")
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value="/createClinic", produces = { MediaType.APPLICATION_JSON_VALUE } )
    public Clinics createClinic(@RequestParam Map<String, String> params, Clinics clinic) {

        try {
            String[] vaccines = params.get("vaccineNumbers").split(",");
            List<String> vaccineList = Arrays.asList(vaccines);
            System.out.print("HEHEHEHEHEHE");
            Clinics persistedClinic = clinicService.createClinic(clinic,vaccineList);
            return persistedClinic;
        }
        catch(Exception e) {
            System.out.print(e);
            return null;
        }
    }

    //@PreAuthorize("hasAuthority('admin')")
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value="/getAllClinics", produces = { MediaType.APPLICATION_JSON_VALUE } )
    public List<Clinics> getAllClinics() {
        try {
            List<Clinics> persistedClinicList = clinicService.getClinics();
            return persistedClinicList;
        }
        catch(Exception e) {
            return null;
        }
    }

   // @PreAuthorize("hasAuthority('admin')")
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value="/getClinicsById", produces = { MediaType.APPLICATION_JSON_VALUE } )
    public Clinics getClinicsById(@RequestParam Map<String, String> params) {
        String clinicId = params.get("clinicId");
        try {
            Clinics persistedClinicList = clinicService.getClinicsByCid(clinicId);
            return persistedClinicList;
        }
        catch(Exception e) {
            return null;
        }
    }

    //@PreAuthorize("hasAuthority('admin')")
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value="/getClinicsFromDiseases", produces = { MediaType.APPLICATION_JSON_VALUE } )
    public List<Clinics> getClinicsFromDiseases(@RequestParam Map<String, String> params) {
        String[] diseases = params.get("diseaseIds").split(",");
        List<String> diseaseList = Arrays.asList(diseases);
        try {
            List<Clinics> filteredClinics = clinicService.getFilteredClinics(diseaseList);
            return filteredClinics;
        }
        catch(Exception e) {
            return null;
        }
    }
}
