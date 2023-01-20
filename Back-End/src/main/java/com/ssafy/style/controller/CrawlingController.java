package com.ssafy.style.controller;


import com.ssafy.style.data.dto.CrawlingDto;
import com.ssafy.style.service.CrawlingService;
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
@RequestMapping(value = "/crawling")
@Api("Crawling Controller API V1")
public class CrawlingController {

    private final CrawlingService crawlingService;
    public static final Logger logger = LoggerFactory.getLogger(CrawlingController.class);

    @Autowired
    public CrawlingController(CrawlingService crawlingService){
        this.crawlingService = crawlingService;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    // 무신사 Item 정보 크롤링
    @GetMapping(value = "/{no}")
    @ApiOperation(value = "무신사 Item 정보 크롤링")
    public ResponseEntity<?> crawlingTest(
            @PathVariable @ApiParam(value = "Item 카테고리 number", required = true) String no){
        Map<String, Object> map = new HashMap<>();

        logger.info("Start Crawling");
        logger.info("Item Category number : " + no);

        try {
            List<CrawlingDto> list = new ArrayList<>();
            list = crawlingService.crawling(no);

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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////

}
