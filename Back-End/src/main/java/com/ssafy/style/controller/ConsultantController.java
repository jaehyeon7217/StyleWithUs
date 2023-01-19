package com.ssafy.style.controller;

import com.ssafy.style.data.dto.ConsultantDto;
import com.ssafy.style.jwt.JwtProvider;
import com.ssafy.style.service.ConsultantService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/consultant")
@Api("Consultant Controller API V1")
public class ConsultantController {

    public static final Logger logger = LoggerFactory.getLogger(ConsultantController.class);
    private final ConsultantService consultantService;

    private final JwtProvider jwtProvider = new JwtProvider();

    @Autowired
    public ConsultantController(ConsultantService consultantService) {
        this.consultantService = consultantService;
    }
    @PostMapping("/login")
    @ApiOperation(value = "유저 로그인")
    public ResponseEntity<?> loginConsultant(
            @RequestBody Map<String, String> data) {
        Map<String , Object> check = new HashMap<>();

        logger.info("consultantLogin - 호출");

        System.out.println("consultantId : " + data.get("consultantId") + "\nconsultantPw : " + data.get("consultantPw"));
        System.out.println("data : " + data);

        ConsultantDto consultantDto = new ConsultantDto();
        consultantDto.setConsultantId(data.get("consultantId"));
        consultantDto.setConsultantPw(data.get("consultantPw"));

        try {
            ConsultantDto result = consultantService.loginConsultant(consultantDto);
            if (result != null) {
                logger.info("로그인 정보 : {}", result);

                String key = jwtProvider.createToken(result);
                //            check.put("access-token", key);
                check.put("msg", "success");
                check.put("data", result);
                check.put("auth_token", key);
                return ResponseEntity.status(HttpStatus.OK).body(check);
            } else {
                check.put("msg", "fail");
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(check);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    //회원정보 업데이트
    @PutMapping("/update")
    @ApiOperation(value = "유저 회원정보 수정", response = ConsultantDto.class)
    public ResponseEntity<?> updateConsultant(
            @RequestBody @ApiParam(value = "회원정보 수정", required = true) ConsultantDto consultantDto
    ){

        Map<String , Object> check = new HashMap<>();

        logger.info("updateConsultant - 호출");
        logger.info("updateConsultant consultantDto : {}", consultantDto);

        try{
            ConsultantDto consultant = consultantService.updateConsultant(consultantDto);
            if(consultant != null) {
                logger.info("회원 정보 : {}", consultant);

                String key = jwtProvider.createToken(consultant);
                check.put("msg", "success");
                check.put("data", consultant);
                check.put("auth_token", key);

                return ResponseEntity.status(HttpStatus.OK).body(check);
            } else {
                check.put("msg", "fail");
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(check);
            }
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    // 유저 회원가입
    @PostMapping("/register")
    @ApiOperation(value = "유저 회원가입", response = ConsultantDto.class)
    public ResponseEntity<?> registerConsultant(
            @RequestBody @ApiParam(value = "회원가입 정보", required = true) ConsultantDto consultantDto) {

        Map<String, Object> check = new HashMap<>();

        logger.info("registConsultant - 호출");
        logger.info("registConsultant consultantDto : {}", consultantDto);

        try{
            ConsultantDto consultant = consultantService.insertConsultant(consultantDto);
            if(consultant != null) {
                logger.info("회원가입 정보 : {}", consultant);

                check.put("msg", "success");

                return ResponseEntity.status(HttpStatus.OK).body(check);
            } else {
                check.put("msg", "fail");
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(check);
            }
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/get/{consultantId}")
    public ResponseEntity<?> getById(@PathVariable String consultantId){

        Map<String, Object> check = new HashMap<>();

        try {
            ConsultantDto consultant = consultantService.getById(consultantId);

            if(consultant != null){
                check.put("msg", "success");
                check.put("data", consultant);
                return ResponseEntity.status(HttpStatus.OK).body(check);
            }else{
                check.put("msg", "fail");
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(check);
            }

        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    /// 여기부터 Valid 중복검사
    @GetMapping("/valid/id/{consultantId}")
    public ResponseEntity<Boolean> validId(@PathVariable String consultantId){

        try {
            boolean isValid = consultantService.validId(consultantId);
            return ResponseEntity.status(HttpStatus.OK).body(isValid);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    @GetMapping(value = "/valid/email/{consultantEmail}")
    public ResponseEntity<Boolean> validEmail(@PathVariable String consultantEmail){

        try{
            boolean isValid = consultantService.validEmail(consultantEmail);
            return ResponseEntity.status(HttpStatus.OK).body(isValid);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping(value = "/valid/nickname/{consultantNickname}")
    public ResponseEntity<Boolean> validNickname(@PathVariable String consultantNickname){

        try {
            boolean isValid = consultantService.validNickname(consultantNickname);
            return ResponseEntity.status(HttpStatus.OK).body(isValid);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    ////여기까지 Valid 중복검사
}
