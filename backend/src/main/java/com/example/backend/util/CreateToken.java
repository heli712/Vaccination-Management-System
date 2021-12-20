package com.example.springsocial.util;
import java.util.Random;
public class CreateToken {
    public static String generateToken(){
        int left = 50;
        int right = 120;
        int targetLength = 40;
        Random ran = new Random();
        String verificationString = ran.ints(left, right + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
        return verificationString;
    }
}
