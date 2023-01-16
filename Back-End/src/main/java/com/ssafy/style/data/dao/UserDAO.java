package com.ssafy.style.data.dao;

import com.ssafy.style.data.dto.UserDto;
import com.ssafy.style.data.entity.User;

import java.util.Map;

public interface UserDAO {
    User insertUser(User user) throws Exception;
    User updateUser(User user)  throws Exception;

    boolean validId(String userId);

    boolean validEamil(String userEmail);

    boolean validNickname(String userNickname);

    User getById(String userId);
}
