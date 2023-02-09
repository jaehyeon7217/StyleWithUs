package com.ssafy.style.service;

import com.ssafy.style.data.dto.UserDto;
import com.ssafy.style.data.entity.User;

import java.util.Map;

public interface UserService {
    UserDto registerUser(UserDto userDto) throws Exception;
    UserDto loginUser(UserDto userDto)  throws Exception;
    UserDto updateUser(UserDto userDto)  throws Exception;
    boolean validId(String userId);
    boolean validEmail(String userEmail);
    boolean validNickname(String userNickname);
    UserDto getById(String userId);
    String updatePassword(Map<String, String> userInfo) throws Exception;
    boolean matchIdAndEmail(String userId, String userEmail);
    void updatePwById(Map<String, String> userInfo);
}
