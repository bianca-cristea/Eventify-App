package org.example.backend.security;

import org.example.backend.models.*;
import org.example.backend.repositories.CategoryRepository;
import org.example.backend.repositories.EventRepository;
import org.example.backend.repositories.RoleRepository;
import org.example.backend.repositories.UserRepository;
import org.example.backend.security.jwt.AuthEntryPoint;
import org.example.backend.security.jwt.AuthTokenFilter;
import org.example.backend.security.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig {
    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @Autowired
    private AuthEntryPoint unauthorizedHandler;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }


    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(userDetailsService);

        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }



    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .cors(cors -> {})
                .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth ->
                                auth
                                        .requestMatchers("/api/auth/**").permitAll()
                                        .requestMatchers("/v3/api-docs/**").permitAll()
                                        .requestMatchers("/swagger-ui/**").permitAll()
                                        .requestMatchers("/h2-console/**").permitAll()
                                        .requestMatchers("/images/**").permitAll()
                                        .requestMatchers(HttpMethod.GET, "/api/categories").permitAll()
                                        .requestMatchers(HttpMethod.GET, "/api/events/**").permitAll()
                                        .requestMatchers(HttpMethod.GET, "/api/categories/*/events").permitAll()
                                        .requestMatchers("/api/public/**").permitAll()
                                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                                        .requestMatchers("/api/organizer/**").hasAnyRole("ADMIN", "ORGANIZER")
                                        .requestMatchers("/api/staff/**").hasAnyRole("ADMIN", "STAFF")
                                        .requestMatchers("/api/user/**").hasAnyRole("ADMIN", "STAFF", "ORGANIZER", "PARTICIPANT")

                                        .anyRequest().authenticated());


        http.authenticationProvider(authenticationProvider());

        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
        http.headers(headers -> headers.frameOptions(
                frameOptions -> frameOptions.sameOrigin()));

        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web -> web.ignoring().requestMatchers("/v2/api-docs",
                "/configuration/ui",
                "/swagger-resources/**",
                "/configuration/security",
                "/swagger-ui.html",
                "/webjars/**"));
    }
    @Bean
    public CommandLineRunner initData(RoleRepository roleRepository,
                                      UserRepository userRepository,
                                      PasswordEncoder passwordEncoder) {

        return args -> {



            Role participantRole = roleRepository.findByRoleName(AppRole.ROLE_PARTICIPANT)
                    .orElseGet(() ->
                            roleRepository.save(new Role(AppRole.ROLE_PARTICIPANT)));

            Role organizerRole = roleRepository.findByRoleName(AppRole.ROLE_ORGANIZER)
                    .orElseGet(() ->
                            roleRepository.save(new Role(AppRole.ROLE_ORGANIZER)));

            Role staffRole = roleRepository.findByRoleName(AppRole.ROLE_STAFF)
                    .orElseGet(() ->
                            roleRepository.save(new Role(AppRole.ROLE_STAFF)));

            Role adminRole = roleRepository.findByRoleName(AppRole.ROLE_ADMIN)
                    .orElseGet(() ->
                            roleRepository.save(new Role(AppRole.ROLE_ADMIN)));




            if (!userRepository.existsByUsername("participant")) {

                User participant = new User(
                        "participant",
                        "participant@example.com",
                        passwordEncoder.encode("password1")
                );

                participant.setRoles(Set.of(participantRole));

                userRepository.save(participant);
            }

            if (!userRepository.existsByUsername("organizer")) {

                User organizer = new User(
                        "organizer",
                        "organizer@example.com",
                        passwordEncoder.encode("password2")
                );

                organizer.setRoles(Set.of(organizerRole));

                userRepository.save(organizer);
            }

            if (!userRepository.existsByUsername("staff")) {

                User staff = new User(
                        "staff",
                        "staff@example.com",
                        passwordEncoder.encode("staffPass")
                );

                staff.setRoles(Set.of(staffRole));

                userRepository.save(staff);
            }

            if (!userRepository.existsByUsername("admin")) {

                User admin = new User(
                        "admin",
                        "admin@example.com",
                        passwordEncoder.encode("adminPass")
                );

                admin.setRoles(Set.of(adminRole));

                userRepository.save(admin);
            }
        };
    }


}