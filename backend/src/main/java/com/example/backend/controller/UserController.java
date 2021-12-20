package com.example.springsocial.controller;

import com.example.springsocial.exception.ResourceNotFoundException;
import com.example.springsocial.model.Clinics;
import com.example.springsocial.model.User;
import com.example.springsocial.repository.UserRepository;
import com.example.springsocial.security.CurrentUser;
import com.example.springsocial.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/me")
    //@PreAuthorize("hasRole('user')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findByEmail(userPrincipal.getName())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getName()));
    }

    //@PreAuthorize("hasAuthority('user')")
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value="/getUserById", produces = { MediaType.APPLICATION_JSON_VALUE } )
    public User getUserById(@RequestParam Map<String, String> params) {
        String userId = params.get("userId");
        User persistedUser = null;
        try {
            persistedUser = userRepository.findByMrn(userId);
            return persistedUser;
        }
        catch(Exception e) {
            return persistedUser;
        }
    }
}
