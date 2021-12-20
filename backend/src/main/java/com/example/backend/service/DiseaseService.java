package com.example.springsocial.service;

import com.example.springsocial.model.Diseases;
import com.example.springsocial.repository.DiseaseRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.UnexpectedRollbackException;
import org.springframework.web.bind.annotation.*;
import javax.persistence.*;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;
import java.util.UUID;

@Service
//@SqlResultSetMapping(name="updatePassengerDetails", columns = { @ColumnResult(name = "count")})
//@NamedNativeQueries({
//        @NamedNativeQuery(
//                name    =   "updatePassengerDetails",
//                query   =   "UPDATE passenger SET firstname = ?, lastname = ?, phone=?, age = ?, gender = ? WHERE id = ?"
//                ,resultSetMapping = "updateResult"
//        )
//})

public class DiseaseService {
    @Autowired // This means to get the bean called userRepository
    private DiseaseRepository diseaseRepository;

    @PostMapping
    public Diseases createDisease(Diseases diseaseDetails) throws Exception {
        Diseases newDisease = null;
        try {
            newDisease = diseaseRepository.save(diseaseDetails);
        } catch (DataIntegrityViolationException ex) {
            throw new Exception("constraint violation", ex);
        }
        return newDisease;
    }

    @GetMapping
    public List<Diseases> getDiseases() throws Exception {
        List<Diseases> diseaseList = null;
        try {
            diseaseList = (List<Diseases>) diseaseRepository.findAll();
        } catch (DataIntegrityViolationException ex) {
            throw new Exception("constraint violation", ex);
        }
        return diseaseList;
    }
}

