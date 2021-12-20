package com.example.springsocial.util;

import com.example.springsocial.model.VerifyToken;

import java.util.Properties;
import javax.mail.*;
import javax.mail.internet.*;

public class EmailUtil {
    private static final String USERNAME = "vaccinemanagement.vms@gmail.com";
    private static final String PASSWORD = "Password@123";
    private static final String EMAIL_FROM = "vaccinemanagement.vms@gmail.com";

    public static int sendMail(String text, String subject, String targetMail) throws MessagingException, AddressException {

        Properties prop = new Properties();
        prop.put("mail.smtp.host", "smtp.gmail.com");
        prop.put("mail.smtp.port", "587");
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.starttls.enable", "true");

        Session session = Session.getInstance(prop,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(USERNAME, PASSWORD);
                    }
                });
        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress(EMAIL_FROM));
        message.setRecipients(
                Message.RecipientType.TO,
                InternetAddress.parse(targetMail)
        );
        message.setSubject(subject);
        message.setText(text);

        Transport.send(message);

        return 0;
    }

    public static String getVerificationMail(VerifyToken token, String verifyEndpoint) {
        return "Click on the below link to verify your account. \n" + verifyEndpoint + "?email=" + token.getEmail() + "&token=" + token.getToken();
    }
}
