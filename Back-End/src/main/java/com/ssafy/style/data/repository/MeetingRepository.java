package com.ssafy.style.data.repository;

import com.ssafy.style.data.entity.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingRepository extends JpaRepository<Meeting, String> {
}
