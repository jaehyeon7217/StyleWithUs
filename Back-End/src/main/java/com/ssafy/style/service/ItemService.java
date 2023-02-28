package com.ssafy.style.service;

import com.ssafy.style.data.dto.ItemDto;

import java.util.List;

public interface ItemService {
    ItemDto createItem(ItemDto itemDto) throws Exception;
    List<ItemDto> readUserItem(String userId) throws Exception;
    void deleteItem(int itemNo) throws Exception;
}
