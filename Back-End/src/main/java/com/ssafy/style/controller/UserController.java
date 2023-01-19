package com.ssafy.style.controller;

import com.ssafy.style.data.dto.UserDto;
import com.ssafy.style.jwt.JwtProvider;
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
    JwtProvider jwtProvider = new JwtProvider();
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//    // 여기는 로그인
//    @PostMapping("/login")
//    @ApiOperation(value = "유저 로그인")
//    public ResponseEntity<UserDto> loginUser(
//            @RequestBody Map<String, String> data
////            String userId, String userPw
//    ) {
//        logger.info("userLogin - 호출");
//        UserDto userDto = new UserDto();
//        userDto.setUserId(data.get("userId"));
//        userDto.setUserPw(data.get("userPw"));
//
//        try {
//            UserDto result = userService.selectUser(userDto);
//            if (result != null) {
//                logger.info("로그인 정보 : {}", result);
//                return ResponseEntity.status(HttpStatus.OK).body(result);
//            } else {
//                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(result);
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//        }
//    }
// 여기는 로그인
    @PostMapping("/login")
    @ApiOperation(value = "유저 로그인")
    public ResponseEntity<?> loginUser(
            @RequestBody Map<String, String> data) {
        Map<String , Object> check = new HashMap<>();

        logger.info("userLogin - 호출");

        System.out.println("userId : " + data.get("userId") + "\nuserPw : " + data.get("userPw"));
        System.out.println("data : " + data);

        UserDto userDto = new UserDto();
        userDto.setUserId(data.get("userId"));
        userDto.setUserPw(data.get("userPw"));

        try {
            UserDto result = userService.selectUser(userDto);
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
    @ApiOperation(value = "유저 회원정보 수정", response = UserDto.class)
    public ResponseEntity<?> updateUser(
            @RequestBody @ApiParam(value = "회원정보 수정", required = true) UserDto userDto
            ){

        Map<String , Object> check = new HashMap<>();

        logger.info("updateUser - 호출");
        logger.info("updateUser userDto : {}", userDto);

        try{
            UserDto user = userService.updateUser(userDto);
            if(user != null) {
                logger.info("회원 정보 : {}", user);

                String key = jwtProvider.createToken(user);
                check.put("msg", "success");
                check.put("data", user);
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
    @ApiOperation(value = "유저 회원가입", response = UserDto.class)
    public ResponseEntity<?> registerUser(
            @RequestBody @ApiParam(value = "회원가입 정보", required = true) UserDto userDto) {

        Map<String, Object> check = new HashMap<>();

        logger.info("registUser - 호출");
        logger.info("registUser userDto : {}", userDto);

        try{
            UserDto user = userService.insertUser(userDto);
            if(user != null) {
                logger.info("회원가입 정보 : {}", user);

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

    @GetMapping("/get/{userId}")
    public ResponseEntity<?> getById(@PathVariable String userId){

        Map<String, Object> check = new HashMap<>();

        try {
            UserDto user = userService.getById(userId);

            if(user != null){
                check.put("msg", "success");
                check.put("data", user);
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
    @GetMapping(value = "/valid/id/{userId}")
    public ResponseEntity<Boolean> validId(@PathVariable String userId){

        try {
            boolean isValid = userService.validId(userId);
            return ResponseEntity.status(HttpStatus.OK).body(isValid);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    @GetMapping(value = "/valid/email/{userEmail}")
    public ResponseEntity<Boolean> validEmail(@PathVariable String userEmail){

        try{
            boolean isValid = userService.validEmail(userEmail);
            return ResponseEntity.status(HttpStatus.OK).body(isValid);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping(value = "/valid/nickname/{userNickname}")
    public ResponseEntity<Boolean> validNickname(@PathVariable String userNickname){

        try {
            boolean isValid = userService.validNickname(userNickname);
            return ResponseEntity.status(HttpStatus.OK).body(isValid);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    ////여기까지 Valid 중복검사

}
