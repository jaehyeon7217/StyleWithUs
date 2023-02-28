package com.ssafy.style.data.dao;

import com.ssafy.style.data.entity.Item;
import com.ssafy.style.data.entity.User;

import java.util.List;

public interface ItemDAO {
    Item createItem(Item item) throws Exception;
    List<Item> readUserItem(String userId) throws Exception;
    void deleteItem(int itemNo) throws Exception;
    User toUser(String userId);
    String toUserId(User user);
}
