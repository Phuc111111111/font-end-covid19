
package com.covid.news.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.rememberme.InMemoryTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.security.web.session.HttpSessionEventPublisher;
@Configuration
@EnableWebSecurity
public  class SecurityConfig extends WebSecurityConfigurerAdapter {

    private CustomSuccessHandler customSuccessHandler;

    private CustomUserDetailService customUserDetailsService;

    public SecurityConfig(CustomSuccessHandler customSuccessHandler, CustomUserDetailService customUserDetailsService) {
        this.customSuccessHandler = customSuccessHandler;
        this.customUserDetailsService = customUserDetailsService;
    }

    @Bean
    public HttpSessionEventPublisher httpSessionEventPublisher() {
        return new HttpSessionEventPublisher();
    }

    @Bean
    public AuthenticationSuccessHandler myAuthenticationSuccessHandler() {
        return customSuccessHandler;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder managerBuilder) throws Exception {
        managerBuilder.userDetailsService(customUserDetailsService).passwordEncoder(passwordEncoder());
    }

    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();


        http.authorizeRequests().antMatchers("/login").permitAll();
        http.authorizeRequests().antMatchers("/admin/**").authenticated();

        http.authorizeRequests().antMatchers("/user/chat/**").authenticated();
        http.authorizeRequests().antMatchers("/admin/**")
                .hasAuthority("ADMIN");

        http .authorizeRequests()
                .and().formLogin().loginPage("/login").usernameParameter("username").passwordParameter("password")
                .loginProcessingUrl("/j_spring_security")
                .successHandler(customSuccessHandler)
                .failureUrl("/login?accessDenied=true").permitAll()
                .and().logout().logoutUrl("/logout").logoutSuccessUrl("/user/home").invalidateHttpSession(true);

    }


    @Override
    public void configure(WebSecurity web) throws Exception {
            web.ignoring()
                    .antMatchers("/ws/**", "/webjars/**", "/api/**","/user/static/**");
    }

}