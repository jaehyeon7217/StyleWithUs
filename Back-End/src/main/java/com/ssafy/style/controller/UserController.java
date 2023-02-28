package com.ssafy.style.controller;

import com.ssafy.style.data.dto.UserDto;
import com.ssafy.style.jwt.JwtProvider;
import com.ssafy.style.service.MailService;
import com.ssafy.style.service.UserService;
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
@RequestMapping(value = "/user")
@Api("User Controller API V1")
public class UserController {

    public static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;
    private final MailService mailService;
    private JwtProvider jwtProvider = new JwtProvider();

    @Autowired
    public UserController(UserService userService, MailService mailService) {
        this.userService = userService;
        this.mailService = mailService;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    // 유저 로그인
    @PostMapping("/login")
    @ApiOperation(value = "유저 로그인")
    public ResponseEntity<?> loginUser(
            @RequestBody @ApiParam(value = "로그인 정보", required = true) Map<String, String> data) {
        Map<String , Object> check = new HashMap<>();

        logger.info("*** loginUser 메서드 호출");
        logger.info("입력 데이터 : userId = " + data.get("userId"));

        UserDto userDto = new UserDto();
        userDto.setUserId(data.get("userId"));
        userDto.setUserPw(data.get("userPw"));

        try {
            UserDto result = userService.loginUser(userDto);
            if (result != null) {

                String key = jwtProvider.createToken(result);
                check.put("msg", "success");
                check.put("data", result);
                check.put("auth_token", key);

                logger.info("*** loginUser 메서드 종료");
                logger.info("반환 데이터 : msg = success, data = " + result);

                return ResponseEntity.status(HttpStatus.OK).body(check);
            } else {
                check.put("msg", "fail");
                logger.info("*** loginUser 메서드 실패");
                logger.info("반환 데이터 : fail");
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(check);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // 회원정보 업데이트
    @PutMapping("/update")
    @ApiOperation(value = "유저 회원정보 수정", response = UserDto.class)
    public ResponseEntity<?> updateUser(
            @RequestBody @ApiParam(value = "회원정보 수정", required = true) UserDto userDto
            ){

        Map<String , Object> check = new HashMap<>();

        logger.info("*** updateUser 메서드 호출");
        logger.info("입력 데이터 :  userDto = " + userDto);


        try{
            UserDto user = userService.updateUser(userDto);
            if(user != null) {

                String key = jwtProvider.createToken(user);
                check.put("msg", "success");
                check.put("data", user);
                check.put("auth_token", key);

                logger.info("*** updateUser 메서드 종료");
                logger.info("반환 데이터 : msg = success, data = " + user);

                return ResponseEntity.status(HttpStatus.OK).body(check);
            } else {
                check.put("msg", "fail");
                logger.info("*** updateUser 메서드 실패");
                logger.info("반환 데이터 : fail");
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(check);
            }
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    // 유저 회원가입
    @PostMapping("/register")
    @ApiOperation(value = "유저 회원가입", response = UserDto.class)
    public ResponseEntity<?> registerUser(
            @RequestBody @ApiParam(value = "회원가입 정보", required = true) UserDto userDto) {

        Map<String, Object> check = new HashMap<>();

        logger.info("*** registerUser 메서드 호출");
        logger.info("입력 데이터 :  userDto = " + userDto);

        try{
            UserDto user = userService.registerUser(userDto);
            if(user != null) {

                check.put("msg", "success");
                logger.info("*** registerUser 메서드 종료");
                logger.info("반환 데이터 : msg = success");

            return ResponseEntity.status(HttpStatus.OK).body(check);
        } else {
            check.put("msg", "fail");
                logger.info("*** registerUser 메서드 실패");
                logger.info("반환 데이터 : fail");
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(check);
        }
    }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

   // ID를 통한 유저정보 획득
   @GetMapping("/get/{userId}")
   @ApiOperation(value = "ID를 통한 유저정보 획득")
    public ResponseEntity<?> getById(@PathVariable @ApiParam(value = "유저 아이디", required = true) String userId){
       logger.info("*** getById 메서드 호출");
       logger.info("입력 데이터 : userId = " + userId);
        Map<String, Object> check = new HashMap<>();

        try {
            UserDto user = userService.getById(userId);

            if(user != null){
                check.put("msg", "success");
                check.put("data", user);

                logger.info("*** getById 메서드 종료");
                logger.info("반환 데이터 : msg = success, data = " + user);

                return ResponseEntity.status(HttpStatus.OK).body(check);
            }else{
                check.put("msg", "fail");
                logger.info("*** getById 메서드 실패");
                logger.info("반환 데이터 : fail");
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(check);
            }

        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // 비밀번호 변경
    @PostMapping("/password")
    @ApiOperation(value = "유저 비밀번호 변경", response = UserDto.class)
    public ResponseEntity<?> updatePassword(@RequestBody @ApiParam(value = "유저 인포") Map<String, String> userInfo){

        logger.info("*** updatePassword 메서드 호출");
        logger.info("입력 데이터 : userId = " + userInfo.get("userId"));
        Map<String, Object> check = new HashMap<>();

        try{
            String msg = userService.updatePassword(userInfo);

            if(msg.equals("OK")){

                check.put("msg", msg);
                logger.info("*** updatePassword 메서드 종료");
                logger.info("반환 데이터 : success");
                return ResponseEntity.status(HttpStatus.OK).body(check);
            }else{
                check.put("msg", msg);
                logger.info("*** updatePassword 메서드 실패");
                logger.info("반환 데이터 : fail");
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(check);
            }
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping(value = "/findpw")
    @ApiOperation(value = "비밀번호 찾기 중 이메일 인증")
    public ResponseEntity<?> findPw(@RequestBody @ApiParam(value = "유저 ID") Map<String, String> data){

        logger.info("*** findPw 메서드 호출");
        logger.info("입력 데이터 :  userId = " + data.get("userId") + ", userEmail = " + data.get("userEmail"));

        String userId = data.get("userId");
        String userEmail = data.get("userEmail");

        boolean isValid = userService.matchIdAndEmail(userId, userEmail);
        Map<String, String> map = new HashMap<>();

        if(isValid){
            try {
                String authCode = mailService.sendEmail(userEmail);

                map.put("msg", "success");
                map.put("data", authCode);

                logger.info("*** findPw 메서드 종료");
                logger.info("반환 데이터 : success");

                return ResponseEntity.status(HttpStatus.OK).body(map);
            }catch (Exception e){
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        }else{
            map.put("msg", "fail");

            logger.info("*** findPw 메서드 실패");
            logger.info("반환 데이터 : fail");

            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

    }

    @PutMapping(value = "/findpw/changepw")
    @ApiOperation(value = "이메일 인증 후 비밀번호 변경")
    public ResponseEntity<?> updatePwAfterEmailVaild(@RequestBody @ApiParam(value = "유저 정보") Map<String, String> userInfo){

        logger.info("*** updatePwById 메서드 호출");
        logger.info("입력 데이터 :  userId = " + userInfo.get("userId"));

        try{
            userService.updatePwById(userInfo);

            Map<String, String> check = new HashMap<>();

            check.put("msg", "success");
            logger.info("*** updatePwById 메서드 종료");
            logger.info("반환 데이터 : success");
            return ResponseEntity.status(HttpStatus.OK).body(check);

        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }


    ////////////////////////////////////////////// 여기부터 Valid 중복검사//////////////////////////////////////////////

    // ID 중복검사
    @GetMapping(value = "/valid/id/{userId}")
    @ApiOperation(value = "ID 중복검사")
    public ResponseEntity<Boolean> validId(@PathVariable @ApiParam(value = "유저 ID", required = true) String userId){
        logger.info("*** validId 메서드 호출");
        logger.info("입력 데이터 :  userId = " + userId);
        try {
            boolean isValid = userService.validId(userId);
            logger.info("*** validId 메서드 종료");
            logger.info("반환 데이터 : isValid = " + isValid);
            return ResponseEntity.status(HttpStatus.OK).body(isValid);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    // Email 중복검사
    @GetMapping(value = "/valid/email/{userEmail}")
    @ApiOperation(value = "Email 중복검사")
    public ResponseEntity<Boolean> validEmail(@PathVariable @ApiParam(value = "유저 Email", required = true) String userEmail){
        logger.info("*** validEmail 메서드 호출");
        logger.info("입력 데이터 :  userEmail = " + userEmail);
        try{
            boolean isValid = userService.validEmail(userEmail);
            logger.info("*** validEmail 메서드 종료");
            logger.info("반환 데이터 : isValid = " + isValid);
            return ResponseEntity.status(HttpStatus.OK).body(isValid);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Nickname 중복검사
    @GetMapping(value = "/valid/nickname/{userNickname}")
    @ApiOperation(value = "Nickname 중복검사")
    public ResponseEntity<Boolean> validNickname(@PathVariable @ApiParam(value = "유저 Nickname", required = true) String userNickname){
        logger.info("*** validNickname 메서드 호출");
        logger.info("입력 데이터 :  userNickname = " + userNickname);
        try {
            boolean isValid = userService.validNickname(userNickname);
            logger.info("*** validNickname 메서드 종료");
            logger.info("반환 데이터 : isValid = " + isValid);
            return ResponseEntity.status(HttpStatus.OK).body(isValid);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping(value = "/gender/{userNickname}")
    @ApiOperation(value = "유저 닉네임으로 유저id와 성별 찾기")
    public ResponseEntity<?> findUserGender(@PathVariable @ApiParam(value = "유저 Nickname", required = true) String userNickname){
        logger.info("*** findUserGender 메서드 호출");
        logger.info("입력 데이터 :  userNickname = " + userNickname);

        Map<String, Object> check = new HashMap<>();

        try {
            UserDto userDto = userService.getUserGender(userNickname);

            check.put("msg", "success");
            check.put("userId", userDto.getUserId());
            check.put("userGender", userDto.getUserGender());

            logger.info("*** findUserGender 메서드 종료");
            logger.info("*** 반환 데이터 : userDto = " + userDto);
            logger.info("*** 반환 데이터 : userId = " + userDto.getUserId());
            logger.info("*** 반환 데이터 : userGender = " + userDto.getUserGender());

            return ResponseEntity.status(HttpStatus.OK).body(check);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}
