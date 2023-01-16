package com.ssafy.style.config;

import com.ssafy.style.interceptor.JwtInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class JwtConfiguration implements WebMvcConfigurer {

    private final JwtInterceptor jwtInterceptor;

    public JwtConfiguration(JwtInterceptor jwtInterceptor) {
        this.jwtInterceptor = jwtInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        registry.addInterceptor(jwtInterceptor)
                .order(1)
                .addPathPatterns("/consultant/**","/user/**")
                .excludePathPatterns("/user/login","/user/valid/*", "/user/register",
                        "/consultant/login","/consultant/valid/*", "/consultant/register");

    }

}
