package com.example.springsocial.controller;

import com.example.springsocial.exception.BadRequestException;
import com.example.springsocial.model.AuthProvider;
import com.example.springsocial.model.User;
import com.example.springsocial.model.VerifyToken;
import com.example.springsocial.payload.ApiResponse;
import com.example.springsocial.payload.AuthResponse;
import com.example.springsocial.payload.LoginRequest;
import com.example.springsocial.payload.SignUpRequest;
import com.example.springsocial.repository.UserRepository;
import com.example.springsocial.repository.VerifyTokenRepository;
import com.example.springsocial.security.TokenProvider;
import com.example.springsocial.util.CreateToken;
import com.example.springsocial.util.EmailUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private VerifyTokenRepository verifyTokenRepository;

    @Value("${spring.emailVerification.endpoint}")
    private String endpoint;
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = tokenProvider.createToken(authentication);
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser( @RequestBody SignUpRequest signUpRequest) {
        System.out.println(signUpRequest);
        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new BadRequestException("Email address already in use.");
        }

        String userRole = "user";
        if(signUpRequest.getEmail().split("@")[1].equals("sjsu.edu")) {
            userRole = "admin";
        }

        // Creating user's account
        User user = new User();
        user.setFirstName(signUpRequest.getFirstName());
        user.setLastName(signUpRequest.getLastName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(signUpRequest.getPassword());
        user.setRole(userRole);
        user.setVerifyUser(false);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User result = userRepository.save(user);
        List<GrantedAuthority> role = new ArrayList<>();
        role.add(new SimpleGrantedAuthority(userRole));
        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(result.getEmail(), signUpRequest.getPassword(), role ));
        SecurityContextHolder.getContext().setAuthentication(auth);
        String token = tokenProvider.createToken(auth);
        String tokenVerfication = CreateToken.generateToken();
        VerifyToken verifyToken = new VerifyToken(result.getEmail(), tokenVerfication);
        VerifyToken savingToken = verifyTokenRepository.save(verifyToken);
        String text = EmailUtil.getVerificationMail(savingToken, endpoint);
        String subject = "Verify the email for vaccine management system";
        try {
            EmailUtil.sendMail(text, subject, result.getEmail());
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok(token);
    }

}
