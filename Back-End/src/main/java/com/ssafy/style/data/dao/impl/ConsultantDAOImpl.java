package com.ssafy.style.data.dao.impl;

import com.ssafy.style.data.dao.ConsultantDAO;
import com.ssafy.style.data.entity.Consultant;
import com.ssafy.style.data.repository.ConsultantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
public class ConsultantDAOImpl implements ConsultantDAO {
    private final ConsultantRepository consultantRepository;

    @Autowired
    public ConsultantDAOImpl(ConsultantRepository consultantRepository) {
        this.consultantRepository = consultantRepository;
    }

    @Override
    public Consultant insertConsultant(Consultant consultant) {
        Consultant savedconsultant = consultantRepository.save(consultant);
        return savedconsultant;
    }

        @Override
    public boolean validNickname(String consultantNickname) {
        boolean isValid = consultantRepository.existsByConsultantNickname(consultantNickname);

        // 이미 있다 : true => 회원가입 할 수 없다.
        return isValid;
    }

    @Override
    public boolean validEmail(String consultantEmail) {
        boolean isValid = consultantRepository.existsByConsultantEmail(consultantEmail);

        // 이미 있다 : true => 회원가입 할 수 없다.
        return isValid;
    }

    @Override
    public boolean validId(String consultantId) {
        boolean isValid = consultantRepository.existsByConsultantId(consultantId);

        // 이미 있다 : true => 회원가입 할 수 없다.
        return isValid;
    }
    @Override
    public Consultant getById(String consultantId) {
        boolean isValid = consultantRepository.existsByConsultantId(consultantId);

        if(isValid) {
            Consultant selectedConsultant = consultantRepository.getById(consultantId);
            return selectedConsultant;
        }
        else{
            return null;
        }

    }
    @Transactional
    @Override
    public Consultant updateConsultant(Consultant consultant){
        Consultant temp = consultantRepository.getById(consultant.getConsultantId());
        consultant.setConsultantPw(temp.getConsultantPw());
        return consultantRepository.save(consultant);


    }
}
