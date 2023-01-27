package com.ssafy.style.controller;

import com.ssafy.style.data.dto.ConsultantDto;
import com.ssafy.style.data.dto.UserDto;
import com.ssafy.style.data.entity.Consultant;
import com.ssafy.style.jwt.JwtProvider;
import com.ssafy.style.service.ConsultantService;
import com.ssafy.style.service.MailService;
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
    private final MailService mailService;
    private final JwtProvider jwtProvider = new JwtProvider();

    @Autowired
    public ConsultantController(ConsultantService consultantService, MailService mailService) {
        this.consultantService = consultantService;
        this.mailService = mailService;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    @PostMapping("/login")
    @ApiOperation(value = "컨설턴트 로그인")
    public ResponseEntity<?> loginConsultant(
            @RequestBody  @ApiParam(value = "로그인 정보", required = true)  Map<String, String> data) {
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
    @ApiOperation(value = "컨설턴트 회원정보 수정", response = ConsultantDto.class)
    public ResponseEntity<?> updateConsultant(
            @RequestBody @ApiParam(value = "회원정보", required = true) ConsultantDto consultantDto){

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

    // 컨설턴트 회원가입
    @PostMapping("/register")
    @ApiOperation(value = "컨설턴트 회원가입", response = ConsultantDto.class)
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


    // 컨설턴트 ID를 통한 회원정보 조회
    @GetMapping("/get/{consultantId}")
    @ApiOperation(value = "ID 정보를 이용한 컨설턴트 정보조회")
    public ResponseEntity<?> getById(@PathVariable @ApiParam(value = "컨설턴트 ID" , required = true) String consultantId){

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

    // 비밀번호 변경
    @PostMapping("/password")
    @ApiOperation(value = "컨설턴트 회원가입", response = ConsultantDto.class)
    public ResponseEntity<?> changePassword(@RequestBody @ApiParam Map<String, String> consultantInfo){

        Map<String, Object> check = new HashMap<>();

        try{
            String msg = consultantService.changePw(consultantInfo);

            if(msg.equals("OK")){

                check.put("msg", msg);
                return ResponseEntity.status(HttpStatus.OK).body(check);
            }else{
                check.put("msg", msg);
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(check);
            }
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping(value = "/findpw")
    @ApiOperation(value = "비밀번호 찾기 중 이메일 인증")
    public ResponseEntity<?> findPw(@RequestParam @ApiParam(value = "컨설턴트 ID") String consultantId,
                                    @RequestParam @ApiParam(value = "컨설턴트 Email") String consultantEmail){

        boolean isValid = consultantService.matchIdAndEmail(consultantId, consultantEmail);
        Map<String, String> map = new HashMap<>();

        if(isValid){
            try {
                String authCode = mailService.sendEmail(consultantEmail);

                map.put("msg", "success");
                map.put("data", authCode);

                return ResponseEntity.status(HttpStatus.OK).body(map);
            }catch (Exception e){
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        }else{
            map.put("msg", "fail");
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

    }

    @PutMapping(value = "/findpw/changepw")
    @ApiOperation(value = "이메일 인증 후 비밀번호 변경")
    public ResponseEntity<?> changePwAfterEmailVaild(@RequestBody @ApiParam(value = "컨설턴트 정보") Map<String, String> consultantInfo){

        try{
            consultantService.changePwById(consultantInfo);

            Map<String, String> check = new HashMap<>();

            check.put("msg", "success");
            return ResponseEntity.status(HttpStatus.OK).body(check);

        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    ///////////////////////////////// 여기부터 Valid 중복검사//////////////////////////////

    // ID 중복검사
    @GetMapping("/valid/id/{consultantId}")
    @ApiOperation(value = "ID 중복검사")
    public ResponseEntity<Boolean> validId(@PathVariable  @ApiParam(value = "컨설턴트 ID", required = true) String consultantId){

        try {
            boolean isValid = consultantService.validId(consultantId);
            return ResponseEntity.status(HttpStatus.OK).body(isValid);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    // Email 중복검사
    @GetMapping(value = "/valid/email/{consultantEmail}")
    @ApiOperation(value = "Email 중복검사")
    public ResponseEntity<Boolean> validEmail(@PathVariable @ApiParam(value = "컨설턴트 Email", required = true) String consultantEmail){

        try{
            boolean isValid = consultantService.validEmail(consultantEmail);
            return ResponseEntity.status(HttpStatus.OK).body(isValid);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // NickName 중복검사
    @GetMapping(value = "/valid/nickname/{consultantNickname}")
    @ApiOperation(value = "NickName 중복검사")
    public ResponseEntity<Boolean> validNickname(@PathVariable @ApiParam(value = "컨설턴트 NickName", required = true) String consultantNickname){

        try {
            boolean isValid = consultantService.validNickname(consultantNickname);
            return ResponseEntity.status(HttpStatus.OK).body(isValid);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    ///////////////////////////////////////////////////////////////////////////////////////////
}
