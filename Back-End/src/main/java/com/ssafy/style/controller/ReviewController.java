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
    public ResponseEntity<?> createReview(
            @RequestBody @ApiParam(value = "리뷰 작성 정보", required = true) ReviewDto reviewDto) {

        Map<String, Object> check = new HashMap<>();

        logger.info("*** createReview 메소드 호출");
        logger.info("*** createReview reviewDto : {}", reviewDto);

        try {
            ReviewDto review = reviewService.createReview(reviewDto);
            if (review != null) {

                check.put("msg", "success");
                check.put("data", review);

                logger.info("*** createReview 메소드 종료");
                logger.info("*** 리뷰 정보 : {}", review);
                return ResponseEntity.status(HttpStatus.OK).body(check);
            } else {
                check.put("msg", "fail");
                logger.info("*** createReview 메소드 실패");
                logger.info("*** 리뷰 정보 : {}", review);
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(check);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/show/consultant/{consultantId}")
    @ApiOperation(value = "컨설턴트 리뷰 조회")
    public ResponseEntity<?> getConsultantReview(
            @PathVariable @ApiParam(value = "컨설턴트 아이디", required = true) String consultantId) {

        Map<String, Object> check = new HashMap<>();

        logger.info("*** getConsultantReview 메소드 호출");
        logger.info("*** getConsultantReview consultantId : {}", consultantId);

        try {
            List<ReviewDto> list = reviewService.readConsultantReview(consultantId);

            double avgScore = 0;

            for(ReviewDto r : list) {
                avgScore += r.getReviewScore();
            }

            avgScore /= list.size();

            avgScore = Math.round(avgScore*10)/10.0;


            check.put("msg", "success");
            check.put("data", list);
            check.put("avgScore", avgScore);

            logger.info("*** getConsultantReview 메소드 호출");
            logger.info("*** 컨설턴트 리뷰 리스트 : {}", list);
            logger.info("*** 컨설턴트 리뷰 점수 : {}", avgScore);

            return ResponseEntity.status(HttpStatus.OK).body(check);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/show/user/{userId}")
    @ApiOperation(value = "유저가 작성한 리뷰 조회")
    public ResponseEntity<?> getUserReview(
            @PathVariable @ApiParam(value = "유저 아이디", required = true) String userId) {

        Map<String, Object> check = new HashMap<>();

        logger.info("*** getUserReview 메소드 호출");
        logger.info("*** getUserReview userId : {}", userId);

        try {
            List<ReviewDto> list = reviewService.readUserReview(userId);

            check.put("msg", "success");
            check.put("data", list);

            logger.info("*** getUserReview 메소드 호출");
            logger.info("*** 유저 리뷰 리스트 : {}", list);

            return ResponseEntity.status(HttpStatus.OK).body(check);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/update/{reviewNo}")
    @ApiOperation(value = "리뷰 수정", response = ReviewDto.class)
    public ResponseEntity<?> updateReview(
            @RequestBody @ApiParam(value = "리뷰 작성 정보", required = true) ReviewDto reviewDto,
            @PathVariable @ApiParam(value = "리뷰 번호", required = true) int reviewNo) {

        Map<String, Object> check = new HashMap<>();

        logger.info("*** updateReview 메소드 호출");
        logger.info("*** updateReview reviewDto : {}", reviewDto);
        logger.info("*** updateReview reviewNo : {}", reviewNo);

        try {
            ReviewDto review = reviewService.updateReview(reviewDto, reviewNo);
            if(review != null) {

                check.put("msg", "success");
                check.put("data", review);

                logger.info("*** updateReview 메소드 종료");
                logger.info("*** 리뷰 정보 : {}", review);
                return ResponseEntity.status(HttpStatus.OK).body(check);
            } else {
                check.put("msg", "fail");
                logger.info("*** updateReview 메소드 실패");
                logger.info("*** 리뷰 정보 : {}", review);
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

        logger.info("*** deleteReview 메소드 호출");
        logger.info("*** deleteReview reviewNo : {}", reviewNo);

        try {
            reviewService.deleteReview(reviewNo);

            check.put("msg", "success");

            logger.info("*** deleteReview 메소드 종료");
            return ResponseEntity.status(HttpStatus.OK).body(check);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
