package com.ssafy.style.controller;

import com.ssafy.style.data.dto.ReviewDto;
import com.ssafy.style.service.ReviewService;
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
@RequestMapping(value = "/review")
@Api("Review Controller API V1")
public class ReviewController {

    public static final Logger logger = LoggerFactory.getLogger(ReviewController.class);

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    @PostMapping("/write")
    @ApiOperation(value = "리뷰 작성", response = ReviewDto.class)
    public ResponseEntity<?> writeReview(
            @RequestBody @ApiParam(value = "리뷰 작성 정보", required = true) ReviewDto reviewDto) {

        Map<String, Object> check = new HashMap<>();

        logger.info("writeReview - 호출");
        logger.info("writeReview reviewDto : {}", reviewDto);

        try {
            ReviewDto review = reviewService.insertReview(reviewDto);
            if (review != null) {
                logger.info("리뷰 정보 : {}", review);

                check.put("msg", "success");
                check.put("data", review);

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

    @GetMapping("/show/{consultantId}")
    @ApiOperation(value = "컨설턴트 리뷰 조회")
    public ResponseEntity<?> showConsultantReview(
            @PathVariable @ApiParam(value = "컨설턴트 아이디", required = true) String consultantId) {

        Map<String, Object> check = new HashMap<>();

        logger.info("showConsultantReview - 호출");
        logger.info("showConsultantReview consultantId : {}", consultantId);

        try {
            List<ReviewDto> list = reviewService.selectConsultantReview(consultantId);

            logger.info("컨설턴트 리뷰 리스트 : {}", list);

            check.put("msg", "success");
            check.put("data", list);

            return ResponseEntity.status(HttpStatus.OK).body(check);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/update")
    @ApiOperation(value = "리뷰 수정", response = ReviewDto.class)
    public ResponseEntity<?> updateReview(
            @RequestBody @ApiParam(value = "리뷰 작성 정보", required = true) ReviewDto reviewDto) {

        Map<String, Object> check = new HashMap<>();

        logger.info("updateReview - 호출");
        logger.info("updateReview reviewDto : {}", reviewDto);

        try {
            ReviewDto review = reviewService.updateReview(reviewDto);
            if(review != null) {
                logger.info("리뷰 정보 : {}", review);

                check.put("msg", "success");
                check.put("data", review);

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

    @DeleteMapping("/delete/{reviewNo}")
    @ApiOperation(value = "리뷰 삭제")
    public ResponseEntity<?> deleteReview(
            @PathVariable @ApiParam(value = "리뷰 번호", required = true) int reviewNo) {

        Map<String, Object> check = new HashMap<>();

        logger.info("deleteReview - 호출");
        logger.info("deleteReview reviewNo : {}", reviewNo);

        try {
            reviewService.deleteReview(reviewNo);

            check.put("msg", "success");

            return ResponseEntity.status(HttpStatus.OK).body(check);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
