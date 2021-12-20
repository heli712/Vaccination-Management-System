package com.example.springsocial.service;
import com.example.springsocial.model.Diseases;
import com.example.springsocial.model.Vaccines;
import com.example.springsocial.repository.DiseaseRepository;
import com.example.springsocial.repository.VaccineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.ArrayList;
import java.util.List;

@Service
public class VaccineService {
    @Autowired // This means to get the bean called userRepository
    private VaccineRepository vaccineRepository;
    @Autowired // This means to get the bean called userRepository
    private DiseaseRepository diseaseRepository;
    @PostMapping
    public Vaccines createVaccine(Vaccines vaccineDetails, List<String> diseaseNumbers) throws Exception {
        Vaccines newVaccine = null;
        List<Diseases> diseases = new ArrayList<>();
        for(int i=0;i<diseaseNumbers.size();i++) {
            Diseases diseaseDetails = diseaseRepository.findByDid(diseaseNumbers.get(i));
            diseases.add(diseaseDetails);
        }
        vaccineDetails.setDiseaseId(diseases);
        try {
            newVaccine = vaccineRepository.save(vaccineDetails);
        } catch (DataIntegrityViolationException ex) {
            throw new Exception("constraint violation", ex);
        }
        return newVaccine;
    }


    @GetMapping
    public List<Vaccines> getVaccines() throws Exception {
        List<Vaccines> vaccineList = null;
        try {
            vaccineList = (List<Vaccines>) vaccineRepository.findAll();
        } catch (DataIntegrityViolationException ex) {
            throw new Exception("constraint violation", ex);
        }
        return vaccineList;
    }
    @GetMapping
    public List<Vaccines> getFilteredVaccinesAndDiseases(String clinicId) throws Exception {
        List<Vaccines> filteredVaccinesDiseasesList = null;
        try {
            //logic for get vaccines and diseases based on clinicID
            //filteredVaccinesDiseasesList =  Get vaccine details for a clinic and get Disease details of each vaccine there is
        } catch (DataIntegrityViolationException ex) {
            throw new Exception("constraint violation", ex);
        }
        return filteredVaccinesDiseasesList;
    }

    @GetMapping
    public Vaccines getDiseasesByVaccineId(String vaccineId) throws Exception {
        Vaccines filteredVaccinesDiseasesList = null;
        try {
            //logic for get vaccines and diseases based on clinicID
            //filteredVaccinesDiseasesList =  Get vaccine details for a clinic and get Disease details of each vaccine there is
            filteredVaccinesDiseasesList = vaccineRepository.findByVid(vaccineId);
        } catch (DataIntegrityViolationException ex) {
            throw new Exception("constraint violation", ex);
        }
        return filteredVaccinesDiseasesList;
    }
}


