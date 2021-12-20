package com.example.springsocial.repository;

import com.example.springsocial.model.VerifyToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerifyTokenRepository extends JpaRepository<VerifyToken, Integer> {
}
