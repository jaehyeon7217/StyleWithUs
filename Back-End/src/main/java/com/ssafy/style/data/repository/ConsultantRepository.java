package com.ssafy.style.data.repository;

import com.ssafy.style.data.dto.ConsultantDto;
import com.ssafy.style.data.entity.Consultant;
import com.ssafy.style.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ConsultantRepository extends JpaRepository<Consultant, String> {
    boolean existsByConsultantId(String s);
    boolean existsByConsultantNickname(String s);
    boolean existsByConsultantEmail(String s);

    @Query(value = "select * from consultant ", nativeQuery = true)
    List<Consultant> getConsultant();

}

