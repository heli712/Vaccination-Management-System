package com.example.springsocial.repository;

import com.example.springsocial.model.Diseases;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface DiseaseRepository  extends CrudRepository<Diseases, Integer> {
    Diseases findByDid(String id);
    void deleteByDid(String id);
}
