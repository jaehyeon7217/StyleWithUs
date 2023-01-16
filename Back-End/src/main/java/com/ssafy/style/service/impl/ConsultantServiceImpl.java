package com.ssafy.style.service.impl;

import com.ssafy.style.data.dao.ConsultantDAO;
import com.ssafy.style.data.dto.ConsultantDto;
import com.ssafy.style.data.dto.ConsultantDto;
import com.ssafy.style.data.entity.Consultant;
import com.ssafy.style.data.entity.Consultant;
import com.ssafy.style.service.ConsultantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ConsultantServiceImpl implements ConsultantService {
    private final ConsultantDAO consultantDAO;

    @Autowired
    public ConsultantServiceImpl(ConsultantDAO consultantDAO) {
        this.consultantDAO = consultantDAO;
    }

    @Override
    public ConsultantDto insertConsultant(ConsultantDto consultantDto) {

        Consultant consultant = toConsultant(consultantDto);

        Consultant saveConsultant = consultantDAO.insertConsultant(consultant);

        ConsultantDto saveDto = toConsultantDto(saveConsultant);


        return saveDto;
    }

    @Override
    public ConsultantDto loginConsultant(ConsultantDto consultantDto) {
        String consultantId = consultantDto.getConsultantId();
        String consultantPw = consultantDto.getConsultantPw();

        Consultant consultant = consultantDAO.getById(consultantId);

        ConsultantDto savedDto = new ConsultantDto();

        if(consultant != null && consultant.getConsultantPw().equals(consultantPw)){
            savedDto = toConsultantDto(consultant);

            return savedDto;
        }else {

            return null;
        }
    }

    @Override
    public boolean validId(String consultantId) {
        return consultantDAO.validId(consultantId);
    }

    @Override
    public boolean validEmail(String consultantEmail) {
        return consultantDAO.validEmail(consultantEmail);
    }

    @Override
    public boolean validNickname(String consultantNickname) {
        return consultantDAO.validNickname(consultantNickname);
    }

    @Override
    public ConsultantDto getById(String consultantId) {

        Consultant consultant = consultantDAO.getById(consultantId);

        if(consultant != null){
            return toConsultantDto(consultant);
        }else {

            return null;
        }
    }

    @Override
    public ConsultantDto updateConsultant(ConsultantDto consultantDto) throws Exception {
        Consultant consultant = toConsultant(consultantDto);

        consultant.setConsultantType(consultantDto.getConsultantType());
        consultant.setConsultantRegisterTime(consultantDto.getConsultantRegisterTime());

        Consultant saveConsultant = consultantDAO.updateConsultant(consultant);

        ConsultantDto saveconsultantDto = toConsultantDto(saveConsultant);


        return saveconsultantDto;
    }

    private Consultant toConsultant(ConsultantDto consultantDto){

        Consultant consultant = new Consultant();
        consultant.setConsultantId(consultantDto.getConsultantId());
        consultant.setConsultantPw(consultantDto.getConsultantPw());
        consultant.setConsultantName(consultantDto.getConsultantName());
        consultant.setConsultantNickname(consultantDto.getConsultantNickname());
        consultant.setConsultantEmail(consultantDto.getConsultantEmail());
        consultant.setConsultantGender(consultantDto.getConsultantGender());
        consultant.setConsultantType(1);
        consultant.setConsultantRegisterTime(LocalDateTime.now());
        consultant.setConsultantResume(consultantDto.getConsultantResume());
        consultant.setConsultantApproval(0);

        return consultant;
    }
    private ConsultantDto toConsultantDto(Consultant saveConsultant){
        ConsultantDto saveDto = new ConsultantDto();
        saveDto.setConsultantId(saveConsultant.getConsultantId());
        saveDto.setConsultantName(saveConsultant.getConsultantName());
        saveDto.setConsultantNickname(saveConsultant.getConsultantNickname());
        saveDto.setConsultantEmail(saveConsultant.getConsultantEmail());
        saveDto.setConsultantGender(saveConsultant.getConsultantGender());
        saveDto.setConsultantType(saveConsultant.getConsultantType());
        saveDto.setConsultantRegisterTime(saveConsultant.getConsultantRegisterTime());
        saveDto.setConsultantResume(saveConsultant.getConsultantResume());
        saveDto.setConsultantApproval(0);

        return saveDto;
    }
}
