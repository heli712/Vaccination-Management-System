package com.example.springsocial.controller;

import com.example.springsocial.exception.ResourceNotFoundException;
import com.example.springsocial.model.User;
import com.example.springsocial.model.VerifyToken;
import com.example.springsocial.repository.UserRepository;
import com.example.springsocial.repository.VerifyTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Example;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.Optional;

@RestController
@RequestMapping(path = "/verifyEmail")
public class VerifyEmailController {

    @Autowired
    private VerifyTokenRepository verifyTokenRepository;

    @Autowired
    private UserRepository userRepository;

    @Value("${spring.emailVerification.redirect}")
    private String verifyRedirect;

    @GetMapping
    public ModelAndView verifyEmail(@RequestParam String email, @RequestParam String token) {
        VerifyToken vt = new VerifyToken(email, token);
        Optional<VerifyToken> ot = verifyTokenRepository.findOne(Example.of(vt));
        if(ot.isEmpty()) {
            throw new BadCredentialsException("token invalid");
        }

        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("user", "email", email));

        user.setVerifyUser(true);
        userRepository.save(user);

        return new ModelAndView("redirect:"+verifyRedirect);
    }
}