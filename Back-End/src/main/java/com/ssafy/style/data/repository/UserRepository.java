package com.ssafy.style.data.repository;

import com.ssafy.style.data.entity.User;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Map;

public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByUserId(String s);

    boolean existsByUserNickname(String s);

    boolean existsByUserEmail(String s);
}
