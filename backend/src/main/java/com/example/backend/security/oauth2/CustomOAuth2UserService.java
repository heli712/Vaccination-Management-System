package com.example.springsocial.security.oauth2;

import com.example.springsocial.exception.OAuth2AuthenticationProcessingException;
import com.example.springsocial.model.AuthProvider;
import com.example.springsocial.model.User;
import com.example.springsocial.model.VerifyToken;
import com.example.springsocial.repository.UserRepository;
import com.example.springsocial.repository.VerifyTokenRepository;
import com.example.springsocial.security.UserPrincipal;
import com.example.springsocial.security.oauth2.user.OAuth2UserInfo;
import com.example.springsocial.security.oauth2.user.OAuth2UserInfoFactory;
import com.example.springsocial.util.CreateToken;
import com.example.springsocial.util.EmailUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.mail.MessagingException;
import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VerifyTokenRepository verifyTokenRepository;

    @Value("${spring.emailVerification.endpoint}")
    private String endpoint;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());
        if(StringUtils.isEmpty(oAuth2UserInfo.getEmail())) {
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }

        Optional<User> userOptional = userRepository.findByEmail(oAuth2UserInfo.getEmail());
        User user;
        if(userOptional.isPresent()) {
            user = userOptional.get();
            user = updateExistingUser(user, oAuth2UserInfo);
        } else {
            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
            //email
            String tokenVerfication = CreateToken.generateToken();
            VerifyToken verifyToken = new VerifyToken(user.getEmail(), tokenVerfication);
            VerifyToken savingToken = verifyTokenRepository.save(verifyToken);
            String text = EmailUtil.getVerificationMail(savingToken, endpoint);
            String subject = "Verify the email for vaccine management system";
            try {
                EmailUtil.sendMail(text, subject, user.getEmail());
            } catch (MessagingException e) {
                e.printStackTrace();
            }
        }

        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }

    private User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        User user = new User();

        user.setFirstName(oAuth2UserInfo.getFirstName());
        user.setLastName(oAuth2UserInfo.getLastName());
        user.setEmail(oAuth2UserInfo.getEmail());

        String userRole = "user";
        if(user.getEmail().split("@")[1].equals("sjsu.edu")) {
            userRole = "admin";
        }
        user.setRole(userRole);

        return userRepository.save(user);
    }

    private User updateExistingUser(User existingUser, OAuth2UserInfo oAuth2UserInfo) {
        existingUser.setFirstName(oAuth2UserInfo.getFirstName());
        existingUser.setLastName(oAuth2UserInfo.getLastName());
        return userRepository.save(existingUser);
    }

}
