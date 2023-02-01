package com.ssafy.style.service.impl;

import com.ssafy.style.data.dao.ReviewDAO;
import com.ssafy.style.data.dto.ReviewDto;
import com.ssafy.style.data.entity.Review;
import com.ssafy.style.service.ReviewService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    private final ReviewDAO reviewDAO;

    public ReviewServiceImpl(ReviewDAO reviewDAO) {
        this.reviewDAO = reviewDAO;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    @Override
    public ReviewDto insertReview(ReviewDto reviewDto) throws Exception {
        Review review = toReview(reviewDto);
        Review saveReview = reviewDAO.insertReview(review);
        return toReviewDto(saveReview);
    }

    @Override
    public List<ReviewDto> selectConsultantReview(String consultantId) throws Exception {

        System.out.println("selectConsultantReview 호출");

        ArrayList<ReviewDto> list = new ArrayList<ReviewDto>();
        List<Review> selectConsultantReview = reviewDAO.selectConsultantReview(consultantId);

        for(Review r : selectConsultantReview) {
            list.add(new ReviewDto(
                    r.getReviewNo(),
                    reviewDAO.toUserId(r.getUserId()),
                    reviewDAO.toConsultantId(r.getConsultantId()),
                    r.getReviewScore(),
                    r.getReviewContent(),
                    r.getReviewRegisterTime()
            ));
        }

        System.out.println("selectConsultantReview 종료");
        System.out.println("list : " + list);


        return list;
    }

    @Override
    public ReviewDto updateReview(ReviewDto reviewDto) throws Exception {
        Review review = toReview(reviewDto);
        Review saveReview = reviewDAO.updateReview(review);
        return toReviewDto(saveReview);
    }

    @Override
    public void deleteReview(int reviewNo) throws Exception {
        reviewDAO.deleteReview(reviewNo);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    private Review toReview(ReviewDto reviewDto) {
        Review review = new Review();
        review.setReviewNo(reviewDto.getReviewNo());
        review.setUserId(reviewDAO.toUser(reviewDto.getUserId()));
        review.setConsultantId(reviewDAO.toConsultant(reviewDto.getConsultantId()));
        review.setReviewScore(reviewDto.getReviewScore());
        review.setReviewContent(reviewDto.getReviewContent());
        review.setReviewRegisterTime(reviewDto.getReviewRegisterTime());
        return review;
    }

    private ReviewDto toReviewDto(Review review) {
        ReviewDto reviewDto = new ReviewDto();
        reviewDto.setReviewNo(review.getReviewNo());
        reviewDto.setUserId(reviewDAO.toUserId(review.getUserId()));
        reviewDto.setConsultantId(reviewDAO.toConsultantId(review.getConsultantId()));
        reviewDto.setReviewScore(review.getReviewScore());
        reviewDto.setReviewContent(review.getReviewContent());
        reviewDto.setReviewRegisterTime(review.getReviewRegisterTime());
        return reviewDto;
    }
}
