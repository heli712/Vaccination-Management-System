package com.example.springsocial.repository;


import com.example.springsocial.model.Vaccines;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface VaccineRepository  extends CrudRepository<Vaccines, Integer> {
    Vaccines findByVid(String id);
    void deleteByVid(String id);
}
