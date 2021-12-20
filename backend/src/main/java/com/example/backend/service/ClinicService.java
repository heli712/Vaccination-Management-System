package com.example.springsocial.service;

import com.example.springsocial.model.Clinics;
import com.example.springsocial.model.Vaccines;
import com.example.springsocial.repository.ClinicRepository;
import com.example.springsocial.repository.VaccineRepository;

import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.UnexpectedRollbackException;
import org.springframework.web.bind.annotation.*;
import javax.persistence.*;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

//@Service
//@SqlResultSetMapping(name="updatePassengerDetails", columns = { @ColumnResult(name = "count")})
//@NamedNativeQueries({
//        @NamedNativeQuery(
//                name    =   "updatePassengerDetails",
//                query   =   "UPDATE passenger SET firstname = ?, lastname = ?, phone=?, age = ?, gender = ? WHERE id = ?"
//                ,resultSetMapping = "updateResult"
//        )
//})

@Service
public class ClinicService {
    @Autowired // This means to get the bean called userRepository
    private ClinicRepository clinicRepository;
    @Autowired // This means to get the bean called userRepository
    private VaccineRepository vaccineRepository;

    @PostMapping
    public Clinics createClinic(Clinics clinicDetails, List<String> vaccines) throws Exception {
        Clinics newClinic = null;
        List<Vaccines> vaccine = new ArrayList<>();
        for(int i=0;i<vaccines.size();i++) {
            Vaccines vaccineDetails = vaccineRepository.findByVid(vaccines.get(i));
            vaccine.add(vaccineDetails);
        }
        clinicDetails.setVaccineId(vaccine);
        try {
            newClinic = clinicRepository.save(clinicDetails);
        } catch (DataIntegrityViolationException ex) {
            throw new Exception("constraint violation", ex);
        }
        return newClinic;
    }

    @GetMapping
    public List<Clinics> getClinics() throws Exception {
        List<Clinics> clinicList = null;
        try {
            clinicList = (List<Clinics>) clinicRepository.findAll();
        } catch (DataIntegrityViolationException ex) {
            throw new Exception("constraint violation", ex);
        }
        return clinicList;
    }

    @GetMapping
    public Clinics getClinicsByCid(String cid) throws Exception {
        Clinics getClinic = null;
        try {
            getClinic = clinicRepository.findByCid(cid);
        } catch (DataIntegrityViolationException ex) {
            throw new Exception("constraint violation", ex);
        }
        return getClinic;
    }

    @GetMapping
    public List<Clinics> getFilteredClinics( List<String> diseaseList) throws Exception {
        List<Clinics> filteredClinicsList = new ArrayList<Clinics>();
        try {
            //logic for get clinics based on diseases
            //filteredClinicsList =  Get Vaccines for diseases and later get clinics with that Id

            List<Vaccines> allVaccines = (List<Vaccines>) vaccineRepository.findAll();
            List<Vaccines> filteredVaccines = new ArrayList<Vaccines>();
            for(int i=0;i<allVaccines.size();i++){
                for(int j=0;j<diseaseList.size();j++){
                    if(allVaccines.get(i).getDiseaseId().contains(diseaseList.get(j))){
                        filteredVaccines.add(allVaccines.get(i));
                        break;
                    }
                }
            }
            List<Clinics> allClinics = (List<Clinics>) clinicRepository.findAll();
            for(int i=0;i<allClinics.size();i++){
                int flag = 0;
                for(int j=0;j<filteredVaccines.size();j++){
                    if(!allClinics.get(i).getVaccineId().contains(filteredVaccines.get(j))){
                        flag = 1;
                        break;
                    }
                }
                if(flag == 0){
                    filteredClinicsList.add(allClinics.get(i));
                }
            }
        } catch (DataIntegrityViolationException ex) {
            throw new Exception("constraint violation", ex);
        }
        return filteredClinicsList;
    }
}

