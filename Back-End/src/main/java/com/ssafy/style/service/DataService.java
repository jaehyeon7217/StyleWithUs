package com.ssafy.style.service;

import com.ssafy.style.data.dto.DataDto;
import com.ssafy.style.data.dto.UserDto;

import java.util.List;

public interface DataService {
    List<DataDto> getData(String no);

    List<DataDto> getWData(String no);

    List<DataDto> getCommendTopItem(UserDto userInfo);

    List<DataDto> getCommendBottomItem(UserDto userInfo);

    List<DataDto> getCommendOuterItem(UserDto userInfo);

    List<DataDto> getCommendShoesItem(UserDto userInfo);
}
