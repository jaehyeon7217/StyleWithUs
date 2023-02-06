package com.ssafy.style.service.impl;

import com.ssafy.style.data.dto.ConsultantDto;
import com.ssafy.style.data.entity.Consultant;
import com.ssafy.style.data.repository.ConsultantRepository;
import com.ssafy.style.service.AdminService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class AdminServiceImpl implements AdminService {

    private PasswordEncoder passwordEncoder;
    private ConsultantRepository consultantRepository;

    public AdminServiceImpl (PasswordEncoder passwordEncoder, ConsultantRepository consultantRepository){
        this.passwordEncoder = passwordEncoder;
        this.consultantRepository = consultantRepository;
    }

    @Override
    public boolean adminLogin(Map<String, String> data) {

        String adminId = data.get("adminId");
        String adminPw = data.get("adminPw");


        boolean idCheck = adminId.equals("admin");
        boolean pwCheck = passwordEncoder.matches(adminPw, "$2a$10$A6/4irQishP2gry8b0bza.W6HCZolB0YcVFdpAd4wQ2oCshbjmqGy");

        if(idCheck && pwCheck) return true;
        else
            return false;
    }

    @Override
    public List<ConsultantDto> getConsultant() {
        List<Consultant> list = consultantRepository.getConsultant();

        List<ConsultantDto> data = new ArrayList<>();

        for(Consultant en : list){
            ConsultantDto temp = new ConsultantDto();

            temp.setConsultantId(en.getConsultantId());
            temp.setConsultantApproval(en.getConsultantApproval());
            temp.setConsultantEmail(en.getConsultantEmail());
            temp.setConsultantGender(en.getConsultantGender());
            temp.setConsultantName(en.getConsultantName());
            temp.setConsultantNickname(en.getConsultantNickname());
            temp.setConsultantRegisterTime(en.getConsultantRegisterTime());
            temp.setConsultantResume(en.getConsultantResume());

            data.add(temp);
        }

        return data;


    }

    @Override
    public int changeApproval(String consultantId) {

        Consultant consultant = consultantRepository.getById(consultantId);

        int temp = 0;

        if( consultant.getConsultantApproval() == 0){
            consultant.setConsultantApproval(1);
            temp =1;
        }else{
            consultant.setConsultantApproval(0);
        }

        consultantRepository.save(consultant);

        return temp;
    }
}
