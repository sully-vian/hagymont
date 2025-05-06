package fr.n7.hagymont.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import fr.n7.hagymont.model.User;
import fr.n7.hagymont.repository.UserRepository;


@Service
public class UserServiceImplementation implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    
    public UserServiceImplementation(UserRepository userRepository) {
        this.userRepository=userRepository;
    }
    
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        System.out.println(user);
       
        if(user==null) {
            throw new UsernameNotFoundException("User not found with this email"+username);

        }

        
        System.out.println("Loaded user: " + user.getUsername() + ", Role: " + user.getType());
        List<GrantedAuthority> authorities = getAuthorities(user);
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                authorities);
    }

    private List<GrantedAuthority> getAuthorities(User user){
        List<GrantedAuthority> authorities = new ArrayList<>();
        switch(user.getType()){
            case admin :
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
            case coach :
            authorities.add(new SimpleGrantedAuthority("ROLE_COACH"));
            case premium :
            authorities.add(new SimpleGrantedAuthority("ROLE_PREMIUM"));
            case classic :
            authorities.add(new SimpleGrantedAuthority("ROLE_CLASSIC"));
        }
        return authorities;
    }
}