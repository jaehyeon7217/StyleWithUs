package com.ssafy.style.service;

import com.ssafy.style.data.dto.UserDto;
import com.ssafy.style.data.entity.User;

import java.util.Map;

public interface UserService {
    UserDto insertUser(UserDto userDto) throws Exception;
    UserDto selectUser(UserDto userDto)  throws Exception;
    UserDto updateUser(UserDto userDto)  throws Exception;
    void deleteUser(UserDto userDto) throws Exception;
    boolean validId(String userId);
    boolean validEmail(String userEmail);
    boolean validNickname(String userNickname);
    UserDto getById(String userId);
}
