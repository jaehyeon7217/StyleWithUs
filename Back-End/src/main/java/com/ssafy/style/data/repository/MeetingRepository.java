package com.ssafy.style.data.repository;

import com.ssafy.style.data.entity.Consultant;
import com.ssafy.style.data.entity.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MeetingRepository extends JpaRepository<Meeting, String> {
    List<Meeting> findByConsultantId(Consultant consultantId);
}
