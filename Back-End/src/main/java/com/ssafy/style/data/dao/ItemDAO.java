package com.ssafy.style.data.dao;

import com.ssafy.style.data.entity.Item;
import com.ssafy.style.data.entity.User;

import java.util.List;

public interface ItemDAO {
    Item insertItem(Item item) throws Exception;
    List<Item> selectUserItem(String userId) throws Exception;
    void deleteItem(int itemNo) throws Exception;
    User toUser(String userId);
    String toUserId(User user);
}
