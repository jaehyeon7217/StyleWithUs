package com.ssafy.style.data.dao;

import com.ssafy.style.data.entity.Consultant;
import com.ssafy.style.data.entity.User;

public interface ConsultantDAO {
    Consultant insertConsultant(Consultant consultant);

    boolean validNickname(String userNickname);

    boolean validEmail(String userEmail);

    boolean validId(String userId);

    Consultant updateConsultant(Consultant consultant) throws Exception;

    Consultant getById(String consultantId);
}
