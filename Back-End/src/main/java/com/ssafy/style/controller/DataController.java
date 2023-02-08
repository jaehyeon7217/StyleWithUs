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

import java.util.*;

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
    public ResponseEntity<?> getDataTest(
            @PathVariable @ApiParam(value = "Item 카테고리 number", required = true) String no,
            @PathVariable @ApiParam(value = "Item 카테고리 number", required = true) String gender){
        Map<String, Object> map = new HashMap<>();

        logger.info("Starting get data");
        logger.info("Item Category number : " + no);

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

                return ResponseEntity.status(HttpStatus.OK).body(map);
            }else{
                map.put("msg", "fail");
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(map);
            }
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping(value = "/recommend")
    @ApiOperation(value = "추천 상품")
    public ResponseEntity<?> recomemendItem (@RequestBody @ApiParam UserDto userInfo){
        logger.info("Call the recommendItem Methods");

        Map<String, Object> map = new HashMap<>();
//        int[] no = {001, 003, 002, 005};

        if(userInfo.getUserHeight() == null)
            return  ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);

        try{
            List<DataDto> list = new LinkedList<>();
            list = dataService.getCommendTopItem(userInfo);
            map.put("top", list);
            list.clear();
            list = dataService.getCommendBottomItem(userInfo);
            map.put("bottom", list);
            list.clear();
            list = dataService.getCommendOuterItem(userInfo);
            map.put("outer", list);
            list.clear();
            list = dataService.getCommendShoesItem(userInfo);
            map.put("shoes", list);

            map.put("msg", "success");
            return ResponseEntity.status(HttpStatus.OK).body(map);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////

}
