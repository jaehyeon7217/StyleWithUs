package com.ssafy.style.data.dao.impl;

import com.ssafy.style.data.dao.ItemDAO;
import com.ssafy.style.data.entity.Item;
import com.ssafy.style.data.entity.User;
import com.ssafy.style.data.repository.ItemRepository;
import com.ssafy.style.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class ItemDAOImpl implements ItemDAO {

    private final ItemRepository itemRepository;
    private final UserRepository userRepository;

    @Autowired
    public ItemDAOImpl(ItemRepository itemRepository, UserRepository userRepository) {
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Item insertItem(Item item) throws Exception {
        Item saveitem = itemRepository.save(item);
        return saveitem;
    }

    @Override
    public List<Item> selectUserItem(String userId) throws Exception {
        List<Item> showUserItem = itemRepository.findByUserId(userRepository.getById(userId));
        return showUserItem;
    }

    @Override
    public void deleteItem(int itemNo) throws Exception {
        Optional<Item> seletedItem = itemRepository.findById(itemNo);

        if(seletedItem.isPresent()) {
            Item deleteItem = seletedItem.get();

            itemRepository.delete(deleteItem);
        } else {
            throw new Exception();
        }
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
