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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public CrawlingController(CrawlingService crawlingService){
        this.crawlingService = crawlingService;
    }

    @PostMapping
    @ApiOperation(value = "크롤링 테스트")
    public ResponseEntity<?> crawlingTest(
            @RequestBody @ApiParam(value = "크롤링 테스트", required = true) Map<String, String> data
    ){
        Map<String, Object> map = new HashMap<>();

        logger.info("* -- 크롤링 테스트");
        logger.info("url : " + data.get("no"));

        try {
            List<CrawlingDto> list = new ArrayList<>();
            list = crawlingService.crawling(data.get("no"));

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



}
