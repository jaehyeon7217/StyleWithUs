package com.ssafy.style.data.repository;

import com.ssafy.style.data.entity.Consultant;
import com.ssafy.style.data.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    List<Review> findByConsultantId(Consultant consultantId);
}
