package com.ssafy.style.data.dao.impl;

import com.ssafy.style.data.dao.ReviewDAO;
import com.ssafy.style.data.entity.Consultant;
import com.ssafy.style.data.entity.Review;
import com.ssafy.style.data.entity.User;
import com.ssafy.style.data.repository.ConsultantRepository;
import com.ssafy.style.data.repository.ReviewRepository;
import com.ssafy.style.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class ReviewDAOImpl implements ReviewDAO {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ConsultantRepository consultantRepository;

    @Autowired
    public ReviewDAOImpl(ReviewRepository reviewRepository, UserRepository userRepository, ConsultantRepository consultantRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.consultantRepository = consultantRepository;
    }

    @Override
    public Review insertReview(Review review) throws Exception {
        Review saveReview = reviewRepository.save(review);
        return saveReview;
    }

    @Override
    public List<Review> selectConsultantReview(String consultantId) throws Exception {
        System.out.println("selectConsultantReview 호출");
        List<Review> showConsultantReview = reviewRepository.findByConsultantId(consultantRepository.getById(consultantId));
        System.out.println("selectConsultantReview 종료");
        System.out.println("showConsultantReview : " + showConsultantReview);
        return showConsultantReview;
    }

    @Override
    public Review updateReview(Review review) throws Exception {
        Review temp = reviewRepository.getById(review.getReviewNo());
        review.setUserId(temp.getUserId());
        review.setConsultantId(temp.getConsultantId());
        review.setReviewRegisterTime(temp.getReviewRegisterTime());
        return reviewRepository.save(review);
    }

    @Override
    public void deleteReview(int reviewNo) throws Exception {
        Optional<Review> selectedReview = reviewRepository.findById(reviewNo);

        if(selectedReview.isPresent()) {
            Review deleteReview = selectedReview.get();

            reviewRepository.delete(deleteReview);
        } else {
            throw new Exception();
        }

    }

    @Override
    public Consultant toConsultant(String consultantId) {
        return consultantRepository.getById(consultantId);
    }

    @Override
    public String toConsultantId(Consultant consultant) {
        return consultant.getConsultantId();
    }

    @Override
    public User toUser(String userId) {
        return userRepository.getById(userId);
    }

    @Override
    public String toUserId(User user) {
        return user.getUserId();
    }
}
