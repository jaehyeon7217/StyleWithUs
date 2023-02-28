package com.ssafy.style.service;

import com.ssafy.style.data.dto.ConsultantDto;

import java.util.List;
import java.util.Map;

public interface AdminService {
    boolean loginAdmin(Map<String, String> data);

    List<ConsultantDto> getConsultant();

    int updateApproval(String consultantId);
}
