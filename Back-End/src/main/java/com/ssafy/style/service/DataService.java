package com.ssafy.style.service;

import com.ssafy.style.data.dto.DataDto;
import com.ssafy.style.data.dto.UserDto;

import java.util.List;

public interface DataService {
    List<DataDto> getData(String no);

    List<DataDto> getWData(String no);

    List<DataDto> getRecommendTopItem(UserDto userInfo);

    List<DataDto> getRecommendBottomItem(UserDto userInfo);

    List<DataDto> getRecommendOuterItem(UserDto userInfo);

    List<DataDto> getRecommendShoesItem(UserDto userInfo);
}
