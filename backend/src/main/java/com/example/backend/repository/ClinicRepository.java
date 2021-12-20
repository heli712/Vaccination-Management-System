package com.example.springsocial.repository;

import com.example.springsocial.model.Clinics;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface ClinicRepository  extends CrudRepository<Clinics, Integer> {
    Clinics findByCid(String id);
    void deleteByCid(String id);

}
