package com.covid.news.config;


import nz.net.ultraq.thymeleaf.LayoutDialect;
import org.springframework.boot.web.server.ErrorPage;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;


@Configuration
public class GenericConfig implements WebServerFactoryCustomizer<ConfigurableServletWebServerFactory> {

    @Bean
    public LayoutDialect layoutDialect() {
        return new LayoutDialect();
    }

    @Override
    public void customize(ConfigurableServletWebServerFactory factory) {
        factory.addErrorPages(
                new ErrorPage(HttpStatus.FORBIDDEN, "/403"),
                new ErrorPage(HttpStatus.NOT_FOUND, "/404"),
                new ErrorPage(HttpStatus.UNAUTHORIZED, "/401"),
                new ErrorPage(HttpStatus.GATEWAY_TIMEOUT, "/504"),
                new ErrorPage(HttpStatus.INTERNAL_SERVER_ERROR, "/500"));
    }

}
