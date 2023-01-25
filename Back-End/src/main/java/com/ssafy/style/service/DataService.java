package com.ssafy.style.service;

import com.ssafy.style.data.dto.DataDto;

import java.util.List;

public interface DataService {
    List<DataDto> getData(String no);
}
