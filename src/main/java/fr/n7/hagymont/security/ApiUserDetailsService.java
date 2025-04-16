package fr.n7.hagymont.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import fr.n7.hagymont.api.controller.AuthResponse;

@Service
public class ApiUserDetailsService implements UserDetailsService {

    // récupérer le por écrit dans application.properties
    @Value("${server.port}")
    private int serverPort;

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String authUrl = "http://localhost:" + serverPort + "/api/auth/" + username;

        ResponseEntity<AuthResponse> response = restTemplate.getForEntity(authUrl, AuthResponse.class);

        if (response == null || response.getBody() == null) {
            throw new UsernameNotFoundException("User not found");
        }

        // "{noop}"  pour indiquer que le mot de passe n'est pas encodé
        // spring security pète un câble sinon
        String password = "{noop}" + response.getBody().getPassword();

        return User.builder()
                .username(username)
                .password(password)
                .roles("USER")
                .build();

    }
}