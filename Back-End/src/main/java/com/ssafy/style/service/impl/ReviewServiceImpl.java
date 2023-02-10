package com.ssafy.style.service.impl;

import com.ssafy.style.data.dao.ReviewDAO;
import com.ssafy.style.data.dto.ReviewDto;
import com.ssafy.style.data.entity.Review;
import com.ssafy.style.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    private final ReviewDAO reviewDAO;
    @Autowired
    public ReviewServiceImpl(ReviewDAO reviewDAO) {
        this.reviewDAO = reviewDAO;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    @Override
    public ReviewDto createReview(ReviewDto reviewDto) throws Exception {
        Review review = toReview(reviewDto);
        Review createReview = reviewDAO.createReview(review);
        return toReviewDto(createReview);
    }

    @Override
    public List<ReviewDto> readConsultantReview(String consultantId) throws Exception {
        ArrayList<ReviewDto> list = new ArrayList<ReviewDto>();
        List<Review> readConsultantReview = reviewDAO.readConsultantReview(consultantId);

        for(Review r : readConsultantReview) {
            list.add(new ReviewDto(
                    r.getReviewNo(),
                    reviewDAO.toUserId(r.getUserId()),
                    reviewDAO.toConsultantId(r.getConsultantId()),
                    r.getReviewScore(),
                    r.getReviewContent(),
                    r.getReviewRegisterTime()
            ));
        }

        return list;
    }

    @Override
    public List<ReviewDto> readUserReview(String userId) throws Exception {
        ArrayList<ReviewDto> list = new ArrayList<ReviewDto>();
        List<Review> readUserReview = reviewDAO.readUserReview(userId);

        for(Review r : readUserReview) {
            list.add(new ReviewDto(
                    r.getReviewNo(),
                    reviewDAO.toUserId(r.getUserId()),
                    reviewDAO.toConsultantId(r.getConsultantId()),
                    r.getReviewScore(),
                    r.getReviewContent(),
                    r.getReviewRegisterTime()
            ));
        }

        return list;
    }

    @Override
    public ReviewDto updateReview(ReviewDto reviewDto, int reviewNo) throws Exception {
        reviewDto.setReviewNo(reviewDAO.readReview(reviewNo).getReviewNo());
        reviewDto.setConsultantId(reviewDAO.toConsultantId(reviewDAO.readReview(reviewNo).getConsultantId()));
        reviewDto.setUserId(reviewDAO.toUserId(reviewDAO.readReview(reviewNo).getUserId()));
        reviewDto.setReviewRegisterTime(reviewDAO.readReview(reviewNo).getReviewRegisterTime());

        Review updateReview = reviewDAO.updateReview(toReview(reviewDto));
        return toReviewDto(updateReview);
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
