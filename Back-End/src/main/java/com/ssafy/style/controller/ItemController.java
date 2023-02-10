package com.ssafy.style.controller;

import com.ssafy.style.data.dto.ItemDto;
import com.ssafy.style.service.ItemService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/item")
@Api("Item Controller API V1")
public class ItemController {

    public static final Logger logger = LoggerFactory.getLogger(ItemController.class);

    private final ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    @PostMapping("/regist")
    @ApiOperation(value = "아이템 추가", response = ItemDto.class)
    public ResponseEntity<?> createItem(
            @RequestBody @ApiParam(value = "아이템 정보", required = true) ItemDto itemDto) {

        Map<String, Object> check = new HashMap<>();

        logger.info("*** createItem 메소드 호출");
        logger.info("*** createItem itemDto : {}", itemDto);

        try {
            ItemDto item = itemService.createItem(itemDto);
            if (item != null) {

                check.put("msg", "success");
                check.put("data", item);

                logger.info("*** createItem 메소드 종료");
                logger.info("*** 리뷰 정보 : {}", item);
                return ResponseEntity.status(HttpStatus.OK).body(check);
            } else {
                check.put("msg", "fail");
                logger.info("*** createItem 메소드 오류");
                logger.info("*** 리뷰 정보 : {}", item);
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(check);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/show/{userId}")
    @ApiOperation(value = "유저 장바구니 조회")
    public ResponseEntity<?> readUserItem(
            @PathVariable @ApiParam(value = "유저 아이디", required = true) String userId) {

        Map<String, Object> check = new HashMap<>();

        logger.info("*** readUserItem 메소드 호출");
        logger.info("*** readUserItem userId : {}", userId);

        try {
            List<ItemDto> list = itemService.readUserItem(userId);

            check.put("msg", "success");
            check.put("data", list);

            logger.info("*** readUserItem 메소드 종료");
            logger.info("*** 유저 장바구니 리스트 : {}", list);
            return ResponseEntity.status(HttpStatus.OK).body(check);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/delete/{itemNo}")
    @ApiOperation(value = "아이템 삭제")
    public ResponseEntity<?> deleteItem(
            @PathVariable @ApiParam(value = "아이템 번호", required = true) int itemNo) {

        Map<String, Object> check = new HashMap<>();

        logger.info("*** deleteItem 메소드 호출");
        logger.info("*** deleteItem itemNo : {}", itemNo);

        try {
            itemService.deleteItem(itemNo);

            check.put("msg", "success");

            logger.info("*** deleteItem 메소드 호출");
            return ResponseEntity.status(HttpStatus.OK).body(check);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
