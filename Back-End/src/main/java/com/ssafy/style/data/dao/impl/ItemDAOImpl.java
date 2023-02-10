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
    public Item createItem(Item item) throws Exception {
        Item createItem = itemRepository.save(item);
        return createItem;
    }

    @Override
    public List<Item> readUserItem(String userId) throws Exception {
        List<Item> readUserItem = itemRepository.findByUserId(userRepository.getById(userId));
        return readUserItem;
    }

    @Override
    public void deleteItem(int itemNo) throws Exception {
        Optional<Item> readItem = itemRepository.findById(itemNo);

        if(readItem.isPresent()) {
            Item deleteItem = readItem.get();

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
