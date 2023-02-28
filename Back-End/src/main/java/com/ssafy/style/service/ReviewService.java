package com.ssafy.style.service;

import com.ssafy.style.data.dto.ReviewDto;

import java.util.List;

public interface ReviewService {
    ReviewDto createReview(ReviewDto reviewDto) throws Exception;
    List<ReviewDto> readConsultantReview(String consultantId) throws Exception;
    List<ReviewDto> readUserReview(String userId) throws Exception;
    ReviewDto updateReview(ReviewDto reviewDto, int reviewNo) throws Exception;
    void deleteReview(int reviewNo) throws Exception;
}
