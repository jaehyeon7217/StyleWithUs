package com.ssafy.style.controller;

import com.ssafy.style.data.dto.ConsultantDto;
import com.ssafy.style.jwt.JwtProvider;
import com.ssafy.style.service.AdminService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@Api("Admin Controller API V1")
public class AdminController {

    public static final Logger logger = LoggerFactory.getLogger(AdminController.class);

    private JwtProvider jwtProvider = new JwtProvider();
    private final AdminService adminService;
    @Autowired
    public AdminController(AdminService adminService){
        this.adminService = adminService;
    }

    @PostMapping(value = "/login")
    @ApiOperation(value = "admin 로그인")
    public ResponseEntity<?> loginAdmin(@RequestBody @ApiParam(value = "로그인 정보") Map<String, String> data) {
        logger.info("*** loginAdmin 메서드 호출");
        logger.info("입력 데이터 : adminId = " + data.get("adminId"));
        Map<String, Object> check = new HashMap<>();

        try {
            boolean result = adminService.loginAdmin(data);
            if (result) {

                String key = jwtProvider.createToken("D105");
                //            check.put("access-token", key);
                check.put("msg", "success");
                check.put("auth_token", key);

                logger.info("*** loginAdmin 메서드 종료");
                logger.info("반환 데이터 : success");
                return ResponseEntity.status(HttpStatus.OK).body(check);
            } else {
                check.put("msg", "fail");

                logger.info("*** loginAdmin 메서드 실패");
                logger.info("반환 데이터 : fail");
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(check);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping(value = "/list")
    @ApiParam(value = "컨설턴트 리스트 호출")
    public ResponseEntity<?> getConsultant(){
        logger.info("*** getConsultant메서드 호출");
        logger.info("입력 데이터 없음");

        try{
            List<ConsultantDto> list = new ArrayList<>();

            list = adminService.getConsultant();

            Map<String, Object> map = new HashMap<>();

            map.put("msg", "success");
            map.put("data", list);

            logger.info("*** getConsultant 메서드 종료");
            logger.info("반환 데이터 : msg = success, list = " + list);
            return ResponseEntity.status(HttpStatus.OK).body(map);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping(value = "/approval/{consultantId}")
    @ApiOperation(value = "컨설턴트 허용 변경")
    public ResponseEntity<?> updateApproval(@PathVariable @ApiParam(value = "컨설턴트 ID") String consultantId){
        logger.info("*** updateApproval 메서드 호출");
        logger.info("입력 데이터 :  consultantId = " + consultantId);
        Map<String,Object> map = new HashMap<>();

        try{
            int approval = adminService.updateApproval(consultantId);

            map.put("msg", "success");
            map.put("approval", approval);

            logger.info("*** updateApproval 메서드 종료");
            logger.info("반환 데이터 : msg = success, approval = " + approval);

            return ResponseEntity.status(HttpStatus.OK).body(map);
        }catch (Exception e){
            e.printStackTrace();
            map.put("msg","fail");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(map);
        }
    }

}
