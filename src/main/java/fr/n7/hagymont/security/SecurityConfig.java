package fr.n7.hagymont.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Cette classe configure la sécurité Spring Security pour gérer
 * l'authentification
 * et l'autorisation des utilisateurs. Elle définit les règles d'accès aux
 * ressources,
 * les utilisateurs en mémoire, et le mécanisme de chiffrement des mots de
 * passe.
 */
@Configuration // Indique que cette classe contient des configurations Spring.
@EnableWebSecurity // Active la sécurité Web Spring Security.
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf((csrf) -> csrf.disable()) // Désactive la protection CSRF
                .authorizeHttpRequests((requests) -> requests
                        .requestMatchers("/Serv/**").authenticated() // Authentifie toutes les requêtes vers /Serv/**.
                        .anyRequest().permitAll() // Permet l'accès à toutes les autres requêtes.
                )
                .formLogin((form) -> form
                        .loginPage("/login") // Use /login as the login page URL.
                        .loginProcessingUrl("/login")
                        .defaultSuccessUrl("/", false)
                        .permitAll() // Allow everyone to access the login page.
                )
                .logout((logout) -> logout
                        .permitAll() // Allow everyone to access the logout functionality.
                );
        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        InMemoryUserDetailsManager userDetailsService = new InMemoryUserDetailsManager();

        UserDetails user = User.withUsername("user")
                .password(passwordEncoder().encode("password")) // Mot de passe encodé.
                .roles("USER") // Rôle utilisateur.
                .build();

        UserDetails admin = User.withUsername("admin")
                .password(passwordEncoder().encode("admin")) // Mot de passe encodé.
                .roles("ADMIN") // Rôle administrateur.
                .build();

        userDetailsService.createUser(user); // Ajoute l'utilisateur.
        userDetailsService.createUser(admin); // Ajoute l'administrateur.
        return userDetailsService;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}