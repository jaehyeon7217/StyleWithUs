package com.ssafy.style.service.impl;

import com.ssafy.style.data.dao.ConsultantDAO;
import com.ssafy.style.data.dto.ConsultantDto;
import com.ssafy.style.data.dto.ConsultantDto;
import com.ssafy.style.data.entity.Consultant;
import com.ssafy.style.data.entity.Consultant;
import com.ssafy.style.data.entity.User;
import com.ssafy.style.service.ConsultantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

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
        consultant.setConsultantRegisterTime(consultantDto.getConsultantRegisterTime());

        Consultant saveConsultant = consultantDAO.updateConsultant(consultant);

        ConsultantDto saveConsultantDto = toConsultantDto(saveConsultant);

        return saveConsultantDto;
    }

    @Override
    public String changePw(Map<String, String> consultantInfo) {
        String consultantId = consultantInfo.get("consultantId");

        Consultant consultant = consultantDAO.getById(consultantId);

        if(consultant == null){
            return "fail";
        }

        if(consultant.getConsultantPw().equals(consultantInfo.get("consultantPw"))){
            consultant.setConsultantPw(consultantInfo.get("newConsultantPw"));

            try {
                consultantDAO.changePw(consultant);

                return "OK";
            }catch (Exception e){
                e.printStackTrace();
                return "Error";
            }
        }else{
            return "Fail";
        }
    }

    @Override
    public boolean matchIdAndEmail(String consultantId, String consultantEmail) {

        Consultant consultantTemp = consultantDAO.getById(consultantId);

        if(consultantTemp.getConsultantEmail().equals(consultantEmail)){
            return true;
        }

        return false;
    }

    @Override
    public void changePwById(Map<String, String> consultantInfo) {
        Consultant consultantTemp = consultantDAO.getById(consultantInfo.get("consultantId"));

        consultantTemp.setConsultantPw(consultantInfo.get("consultantPw"));

        try {
            consultantDAO.changePw(consultantTemp);

        }catch (Exception e){
            e.printStackTrace();
        }

    }

    //////////////////////////////////////////////////////////////////////////////////////////////////

    private Consultant toConsultant(ConsultantDto consultantDto){
        Consultant consultant = new Consultant();
        consultant.setConsultantId(consultantDto.getConsultantId());
        consultant.setConsultantPw(consultantDto.getConsultantPw());
        consultant.setConsultantName(consultantDto.getConsultantName());
        consultant.setConsultantNickname(consultantDto.getConsultantNickname());
        consultant.setConsultantEmail(consultantDto.getConsultantEmail());
        consultant.setConsultantGender(consultantDto.getConsultantGender());
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
        saveDto.setConsultantRegisterTime(saveConsultant.getConsultantRegisterTime());
        saveDto.setConsultantResume(saveConsultant.getConsultantResume());
        saveDto.setConsultantApproval(0);
        return saveDto;
    }
}
