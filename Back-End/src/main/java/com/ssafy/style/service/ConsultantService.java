package com.ssafy.style.service;

import com.ssafy.style.data.dto.ConsultantDto;

import java.util.Map;

public interface ConsultantService {
    ConsultantDto insertConsultant(ConsultantDto consultantDto);
    ConsultantDto loginConsultant(ConsultantDto consultantDto);
    boolean validId(String userId);
    boolean validEmail(String userEmail);
    boolean validNickname(String userNickname);
    ConsultantDto getById(String consultantId);
    ConsultantDto updateConsultant(ConsultantDto consultantDto) throws Exception;
    String changePw(Map<String, String> consultantInfo);

    boolean matchIdAndEmail(String consultantId, String consultantEmail);

    void changePwById(Map<String, String> consultantInfo);
}
