package com.ssafy.style.service;

import com.ssafy.style.data.dto.ConsultantDto;

public interface ConsultantService {
    ConsultantDto insertConsultant(ConsultantDto consultantDto);

    ConsultantDto loginConsultant(ConsultantDto consultantDto);

    boolean validId(String userId);

    boolean validEmail(String userEmail);

    boolean validNickname(String userNickname);
    ConsultantDto getById(String consultantId);

    ConsultantDto updateConsultant(ConsultantDto consultantDto) throws Exception;
}
