package com.ssafy.style.service;

import com.ssafy.style.data.dto.ReviewDto;

import java.util.List;

public interface ReviewService {
    ReviewDto insertReview(ReviewDto reviewDto) throws Exception;
    List<ReviewDto> selectConsultantReview(String consultantId) throws Exception;
    ReviewDto updateReview(ReviewDto reviewDto, int reviewNo) throws Exception;
    void deleteReview(int reviewNo) throws Exception;
}
