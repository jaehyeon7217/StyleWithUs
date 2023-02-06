package com.ssafy.style.controller;

import com.ssafy.style.data.dto.ConsultantDto;
import com.ssafy.style.jwt.JwtProvider;
import com.ssafy.style.service.AdminService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private JwtProvider jwtProvider = new JwtProvider();
    private final AdminService adminService;
    @Autowired
    public AdminController(AdminService adminService){
        this.adminService = adminService;
    }

    @PostMapping(value = "/login")
    @ApiOperation(value = "admin 로그인")
    public ResponseEntity<?> adminLogin(@RequestBody @ApiParam(value = "로그인 정보") Map<String, String> data) {

        Map<String, Object> check = new HashMap<>();

        try {
            boolean result = adminService.adminLogin(data);
            if (result) {

                String key = jwtProvider.createToken("D105");
                //            check.put("access-token", key);
                check.put("msg", "success");
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

    @GetMapping(value = "/list")
    @ApiParam(value = "컨설턴트 리스트 호출")
    public ResponseEntity<?> getConsultant(){

        try{
            List<ConsultantDto> list = new ArrayList<>();

            list = adminService.getConsultant();

            Map<String, Object> map = new HashMap<>();

            map.put("msg", "success");
            map.put("data", list);
            return ResponseEntity.status(HttpStatus.OK).body(map);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping(value = "/approval/{consultantId}")
    @ApiOperation(value = "컨설턴트 허용 변경")
    public ResponseEntity<?> changeApproval(@PathVariable @ApiParam(value = "컨설턴트 ID") String consultantId){

        Map<String,Object> map = new HashMap<>();

        try{
            int approval = adminService.changeApproval(consultantId);

            map.put("msg", "success");
            map.put("approval", approval);

            return ResponseEntity.status(HttpStatus.OK).body(map);
        }catch (Exception e){
            e.printStackTrace();
            map.put("msg","fail");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(map);
        }
    }

}
