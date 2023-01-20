package com.ssafy.style.service;

import com.ssafy.style.data.dto.CrawlingDto;

import java.util.List;

public interface CrawlingService {
    List<CrawlingDto> crawling(String no);
}
