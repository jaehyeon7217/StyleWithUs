package com.ssafy.style.interceptor;


import com.ssafy.style.jwt.JwtProvider;
import com.sun.net.httpserver.HttpsConfigurator;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
@Slf4j
public class JwtInterceptor implements HandlerInterceptor {

public static final Logger logger = LoggerFactory.getLogger(JwtInterceptor.class);
	
	private static final String HEADER_AUTH = "Authorization";
	private static final String HEADER_AUTH2 = "auth-token";
//	private static final String HEADER_AUTH = "Authorization";

	private final JwtProvider jwtService;

	@Autowired
	public JwtInterceptor(JwtProvider jwtService) {

		this.jwtService = jwtService;
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {

//		if(HttpMethod.GET.matches(request.getMethod())){
//			return true;
//		}

		log.info("첫 번째 : " + request.getHeader(HEADER_AUTH));
		log.info("두 번째 : " + request.getHeader(HEADER_AUTH2));

		if(HttpMethod.OPTIONS.matches(request.getMethod())){
			return true;
		}

		String token = request.getHeader(HEADER_AUTH);

		log.info("token={}",token);

		try {
			if(!jwtService.validateToken(token)){
				response.sendError(401, "UNAUTHORIZATION");
				return false;
			} else{
				return true;
			}
		}catch(Exception e){
			e.printStackTrace();
		}

		return false;

	}

}
