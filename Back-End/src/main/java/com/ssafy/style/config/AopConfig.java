package com.ssafy.style.config;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class AopConfig {
    private static final Logger logger = LoggerFactory.getLogger(AopConfig.class);

    @AfterThrowing(value = "execution(* com.ssafy.style.controller.*.*(..))", throwing = "e")
    public void AfterThrowing(JoinPoint joinPoint, Throwable e){
        logger.error("AOP : Error ");
        Object arg = joinPoint.getArgs()[0];
        logger.error("Method Parameter : {}", arg.toString());
        e.printStackTrace();
    }

    @AfterReturning(value = "execution(* com.ssafy.style.controller.*.*(..))", returning = "returnValue")
    public void AfterReturning(JoinPoint joinPoint, Object returnValue) throws RuntimeException {
        logger.info("AOP : AfterReturning ");
        logger.info("Return Parameter : {}", returnValue.toString());
    }

    @AfterReturning(value = "execution(* com.ssafy.style.interceptor.*.*(..))", returning = "returnValue")
    public void AfterReturningJWT(JoinPoint joinPoint, Object returnValue) throws RuntimeException {
        logger.info("AOP : AfterReturning ");
        logger.info("Return Parameter : {}", returnValue.toString());
    }
}
