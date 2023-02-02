package com.ssafy.style.service.impl;

import com.ssafy.style.data.dao.ItemDAO;
import com.ssafy.style.data.dto.ItemDto;
import com.ssafy.style.data.entity.Item;
import com.ssafy.style.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {

    private final ItemDAO itemDAO;
    @Autowired
    public ItemServiceImpl(ItemDAO itemDAO) {
        this.itemDAO = itemDAO;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    @Override
    public ItemDto insertItem(ItemDto itemDto) throws Exception {
        Item item = toItem(itemDto);
        Item saveItem = itemDAO.insertItem(item);
        return toItemDto(saveItem);
    }

    @Override
    public List<ItemDto> selectUserItem(String userId) throws Exception {
        ArrayList<ItemDto> list = new ArrayList<ItemDto>();
        List<Item> selectUserItem = itemDAO.selectUserItem(userId);

        for(Item i : selectUserItem) {
            list.add(new ItemDto(
                    i.getItemNo(),
                    itemDAO.toUserId(i.getUserId()),
                    i.getItemImgLink(),
                    i.getItemName(),
                    i.getItemUri(),
                    i.getItemPrice(),
                    i.getItemRegisterTime()
            ));
        }

        return list;
    }

    @Override
    public void deleteItem(int itemNo) throws Exception {
        itemDAO.deleteItem(itemNo);
    }

    private Item toItem(ItemDto itemDto) {
        Item item = new Item();
        item.setItemNo(itemDto.getItemNo());
        item.setUserId(itemDAO.toUser(itemDto.getUserId()));
        item.setItemImgLink(itemDto.getItemImgLink());
        item.setItemName(itemDto.getItemName() );
        item.setItemUri(itemDto.getItemUri());
        item.setItemPrice(itemDto.getItemPrice());
        item.setItemRegisterTime(itemDto.getItemRegisterTime());
        return item;
    }
    private ItemDto toItemDto(Item item) {
        ItemDto itemDto = new ItemDto();
        itemDto.setItemNo(item.getItemNo());
        itemDto.setUserId(itemDAO.toUserId(item.getUserId()));
        itemDto.setItemImgLink(item.getItemImgLink());
        itemDto.setItemName(item.getItemName() );
        itemDto.setItemUri(item.getItemUri());
        itemDto.setItemPrice(item.getItemPrice());
        itemDto.setItemRegisterTime(item.getItemRegisterTime());
        return itemDto;
    }
}
