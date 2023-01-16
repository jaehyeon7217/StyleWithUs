package com.ssafy.style.data.repository;

import com.ssafy.style.data.entity.Consultant;
import com.ssafy.style.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsultantRepository extends JpaRepository<Consultant, String> {
//    public interface ConsultantRepository {

    boolean existsByConsultantId(String s);

    boolean existsByConsultantNickname(String s);

    boolean existsByConsultantEmail(String s);

}

