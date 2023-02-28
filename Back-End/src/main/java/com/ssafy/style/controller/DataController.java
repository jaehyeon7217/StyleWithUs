package com.ssafy.style.controller;


import com.ssafy.style.data.dto.DataDto;
import com.ssafy.style.data.dto.UserDto;
import com.ssafy.style.service.DataService;
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
@RequestMapping(value = "/data")
@Api("data Controller API V1")
public class DataController {

    private final DataService dataService;
    public static final Logger logger = LoggerFactory.getLogger(DataController.class);

    @Autowired
    public DataController(DataService dataService){
        this.dataService = dataService;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    // 무신사 Item 정보 크롤링
    @GetMapping(value = "consulting/{gender}/{no}")
    @ApiOperation(value = "무신사 Item 정보 크롤링")
    public ResponseEntity<?> getData(
            @PathVariable @ApiParam(value = "Item 카테고리 number", required = true) String no,
            @PathVariable @ApiParam(value = "Item 카테고리 number", required = true) String gender){
        Map<String, Object> map = new HashMap<>();
        logger.info("*** getData 메서드 호출");
        logger.info("입력 데이터 :  no = "+ no+ ", gender = " + gender);

        try {
            List<DataDto> list = new ArrayList<>();
            if(gender.equals("men")){
                list = dataService.getData(no);
            }else if(gender.equals("women")){
                list = dataService.getWData(no);
            }else{
                list = null;
            }

            if(list != null) {
                map.put("msg", "success");
                map.put("data", list);

                logger.info("*** getData 메서드 종료");
                logger.info("반환 데이터 : msg = success, data = " + list);
                return ResponseEntity.status(HttpStatus.OK).body(map);
            }else{
                map.put("msg", "fail");
                logger.info("*** getData 메서드 실패");
                logger.info("반환 데이터 : fail");
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(map);
            }
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping(value = "/recommend")
    @ApiOperation(value = "추천 상품")
    public ResponseEntity<?> getRecomemendItem (@RequestBody @ApiParam UserDto userInfo){
        logger.info("*** getRecomemendItem 메서드 호출");
        logger.info("입력 데이터 :  userInfo = " + userInfo);
        Map<String, Object> map = new HashMap<>();

        if(userInfo.getUserHeight() == null)
            return  ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);

        try{
            List<DataDto> list = new ArrayList<>();
            list = dataService.getRecommendTopItem(userInfo);
            map.put("top", list);
            list = new ArrayList<>();
            list = dataService.getRecommendBottomItem(userInfo);
            map.put("bottom", list);
            list = new ArrayList<>();
            list = dataService.getRecommendOuterItem(userInfo);
            map.put("outer", list);
            list = new ArrayList<>();
            list = dataService.getRecommendShoesItem(userInfo);
            map.put("shoes", list);

            map.put("msg", "success");
            logger.info("*** getRecomemendItem 메서드 종료");
            logger.info("반환 데이터 : msg = success, list = " + list);
            return ResponseEntity.status(HttpStatus.OK).body(map);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////

}
