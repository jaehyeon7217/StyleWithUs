package com.ssafy.style.controller;

import com.ssafy.style.service.MailService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/mail")
@Api("Mail Controller API V1")
@RequiredArgsConstructor
public class MailController {

    public static final Logger logger = LoggerFactory.getLogger(MailController.class);
    private final MailService mailService;

//    @Autowired
//    public MailController(MailService mailService) {
//        this.mailService = mailService;
//    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // 인증메일 발송
    @PostMapping
    @ApiOperation(value = "메일인증")
    public ResponseEntity<?> checkMail(@RequestBody @ApiParam(value = "전송할 이메일", required = true) Map<String, String> data){

        String email = data.get("email");
        logger.info("*** checkMail 메서드 호출");
        logger.info("입력 데이터 :  email = " +data.get("email"));

        try {
            String authCode = mailService.sendEmail(email);

            Map<String, String> map = new HashMap<>();

            map.put("msg", "success");
            map.put("data", authCode);
            logger.info("*** checkMail 메서드 종료");
            logger.info("반환 데이터 : success");
            return ResponseEntity.status(HttpStatus.OK).body(map);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}
