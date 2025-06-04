package fr.n7.hagymont.config;

import java.util.Date;
import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class JwtProvider {
    static SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

    public static String generateToken(Authentication auth) {
        List<String> auths = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();
        String roles = String.join(",", auths);
        System.out.println("Roles in generateToken :" + roles);
        String jwt;
        jwt = Jwts.builder()
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + 86400000))
                .claim("username", auth.getName())
                .claim("authorities", roles)
                .signWith(key)
                .compact();
        System.out.println("Token for parsing in JwtProvider: " + jwt);
        return jwt;

    }

    public static String getUsernameFromJwtToken(String jwt) {
        jwt = jwt.substring(7); // "Bearer " is removed from the token
        try {
            Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
            String username = String.valueOf(claims.get("username"));
            System.out.println("Username extracted from JWT: " + claims);
            return username;
        } catch (Exception e) {
            System.err.println("Error extracting username from JWT: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

}