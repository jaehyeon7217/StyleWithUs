package com.ssafy.style.jwt;

import com.ssafy.style.data.dto.ConsultantDto;
import com.ssafy.style.data.dto.UserDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.xml.bind.DatatypeConverter;
import java.time.Duration;
import java.util.Base64;
import java.util.Date;

@Slf4j
@Component
public class JwtProvider {
	private String secretKey = "SsafyTeamD105";
	private static JwtProvider instacne  = new JwtProvider();

	public static JwtProvider getInstance() {
		return instacne;
	}
	
    private long tokenValidTime = Duration.ofMinutes(300).toMillis();

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }
    

    public String createToken(UserDto userDto) {
        Claims claims = Jwts.claims();
        claims.put("userId", userDto.getUserId());
        claims.put("userEmail", userDto.getUserEmail());

        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims) 
                .setIssuedAt(now) 
                .setExpiration(new Date(now.getTime() + tokenValidTime)) 
                .signWith(SignatureAlgorithm.HS256, secretKey.getBytes())
                .compact();
    }
    public String createToken(ConsultantDto consultantDto) {
        Claims claims = Jwts.claims();
        claims.put("userId", consultantDto.getConsultantId());
        claims.put("userEmail", consultantDto.getConsultantEmail());

        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + tokenValidTime))
                .signWith(SignatureAlgorithm.HS256, secretKey.getBytes())
                .compact();
    }

    public String createToken(String admin) {
        Claims claims = Jwts.claims();
        claims.put("admin", admin);

        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + tokenValidTime))
                .signWith(SignatureAlgorithm.HS256, secretKey.getBytes())
                .compact();
    }

    public String createExpireToken() {
        Claims claims = Jwts.claims();

        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + 0))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }
    

    public String getUserInfo(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().get("userId").toString();
    }

    public boolean validateToken(String jwtToken) {

        try {

        	Claims claims = Jwts.parser()
        			.setSigningKey(DatatypeConverter.parseBase64Binary(secretKey))
        			.parseClaimsJws(jwtToken)
        			.getBody();
        	return !claims.getExpiration().before(new Date());
        } catch (Exception e) {
        	e.printStackTrace();
            return false;
        }
    }

}
