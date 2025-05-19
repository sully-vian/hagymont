
package fr.n7.hagymont.controller;

import java.time.LocalDate;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.n7.hagymont.config.JwtProvider;
import fr.n7.hagymont.model.User;
import fr.n7.hagymont.service.UserService;
import fr.n7.hagymont.repository.UserRepository;
import fr.n7.hagymont.service.UserServiceImplementation;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;
    /*
    @Autowired
    private PasswordEncoder passwordEncoder;
 */
   
    @Autowired
    private UserServiceImplementation customUserDetails;
    
    @Autowired
    private UserService userService;


    @PostMapping("/signup")
    public ResponseEntity<?> createUserHandler(@RequestBody User user)  {
        String username = user.getUsername();
        String email = user.getEmail();
        String password = user.getPassword();
        String firstname = user.getFirstname();
        String secondname = user.getSecondname();
        User.UserType role = user.getType();
        //LocalDate birthdate = user.getBirthdate();
        String phone = user.getPhone();
        User.UserGender gender = user.getGender();

        User isUsernameExist = userRepository.findByUsername(username);
        if (isUsernameExist != null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Username " + username + " already exist");

        }
        //TODO verifier email
        User createdUser = new User();
        createdUser.setUsername(username);
        createdUser.setEmail(email);
        createdUser.setPassword(password);
        createdUser.setFirstname(firstname);
        createdUser.setSecondname(secondname);
        createdUser.setType(role);
        //
        //createdUser.setBirthdate(birthdate);
        createdUser.setPhone(phone);
        createdUser.setGender(gender);

        User savedUser = userRepository.save(createdUser);
          userRepository.save(savedUser);
        Authentication authentication = new UsernamePasswordAuthenticationToken(username,password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = JwtProvider.generateToken(authentication);


        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Register Success");
        authResponse.setStatus(true);
        return new ResponseEntity<>(authResponse, HttpStatus.OK);

    }


    @PostMapping("/login")
    public ResponseEntity<AuthResponse> signin(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");

        System.out.println(username+"-------"+password);
        
        Authentication authentication = authenticate(username,password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        System.out.println(authentication);
        String token = JwtProvider.generateToken(authentication);
        AuthResponse authResponse = new AuthResponse();
        System.out.println(token);

        authResponse.setMessage("Login success");
        authResponse.setJwt(token);
        authResponse.setStatus(true);

        return new ResponseEntity<>(authResponse,HttpStatus.OK);
    }



    private Authentication authenticate(String username, String password) {

        System.out.println(username+"---++----"+password);

        UserDetails userDetails = customUserDetails.loadUserByUsername(username);

        System.out.println("Sig in in user details"+ userDetails);

        if(userDetails == null) {
            System.out.println("Sign in details - null" + userDetails);

            throw new BadCredentialsException("Invalid username and password");
        }
        //if(!passwordEncoder.matches(password,userDetails.getPassword())) {
        if(!password.equals(userDetails.getPassword())) {
            System.out.println("Sign in userDetails - password mismatch"+userDetails);

            throw new BadCredentialsException("Invalid password");

        }
        return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());

    }

}