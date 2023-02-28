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
    public Review createReview(Review review) throws Exception {
        Review createReview = reviewRepository.save(review);
        return createReview;
    }

    @Override
    public List<Review> readConsultantReview(String consultantId) throws Exception {
        List<Review> readConsultantReview = reviewRepository.findByConsultantId(consultantRepository.getById(consultantId));
        return readConsultantReview;
    }

    @Override
    public List<Review> readUserReview(String userId) throws Exception {
        List<Review> readUserReview = reviewRepository.findByUserId(userRepository.getById(userId));
        return readUserReview;
    }

    @Override
    public Review readReview(int reviewNo) throws Exception {
        Review readReview = reviewRepository.getById(reviewNo);
        return readReview;
    }

    @Override
    public Review updateReview(Review review) throws Exception {
        Review updateReview = reviewRepository.save(review);
        return updateReview;
    }

    @Override
    public void deleteReview(int reviewNo) throws Exception {
        Optional<Review> readReview = reviewRepository.findById(reviewNo);

        if(readReview.isPresent()) {
            Review deleteReview = readReview.get();

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
