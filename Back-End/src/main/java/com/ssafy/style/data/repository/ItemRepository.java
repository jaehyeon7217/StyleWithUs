package com.ssafy.style.data.repository;

import com.ssafy.style.data.entity.Item;
import com.ssafy.style.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Integer> {
    List<Item> findByUserId(User userId);
}
