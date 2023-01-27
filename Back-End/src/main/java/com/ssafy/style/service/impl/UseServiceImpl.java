package com.ssafy.style.service.impl;

import com.ssafy.style.data.dao.UserDAO;
import com.ssafy.style.data.dto.UserDto;
import com.ssafy.style.data.entity.User;
import com.ssafy.style.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Service
public class UseServiceImpl implements UserService {

    private final UserDAO userDAO;
    @Autowired
    public UseServiceImpl(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    @Override
    public UserDto insertUser(UserDto userDto) throws Exception {
        User user = toUser(userDto);
        User saveUser = userDAO.insertUser(user);
        return toUserDto(saveUser);
    }

    @Override
    public UserDto selectUser(UserDto userDto) {

        String userId = userDto.getUserId();
        String userPw = userDto.getUserPw();

        User user = userDAO.getById(userId);

        UserDto savedDto = new UserDto();

        if(user != null && user.getUserPw().equals(userPw)){
            savedDto = toUserDto(user);
            return savedDto;
        }else {
            return null;
        }
    }

    @Override
    public UserDto updateUser(UserDto userDto) throws Exception {
        User user = toUser(userDto);
        user.setUserRegisterTime(userDto.getUserRegisterTime());

        User saveUser = userDAO.updateUser(user);

        UserDto saveuserDto = toUserDto(saveUser);
        return saveuserDto;
    }

    @Override
    public void deleteUser(UserDto userDto) {
        //////////////구현?
    }

    @Override
    public boolean validId(String userId) {
        return userDAO.validId(userId);

    }

    @Override
    public boolean validEmail(String userEmail) {
        return userDAO.validEmail(userEmail);
    }

    @Override
    public boolean validNickname(String userNickname) {
        return userDAO.validNickname(userNickname);

    }

    @Override
    public UserDto getById(String userId) {
        User user = userDAO.getById(userId);
        if(user != null){
            return toUserDto(user);
        }else {
            return null;
        }
    }

    @Override
    public String changePw(Map<String, String> userInfo) throws Exception {
        String userId = userInfo.get("userId");

        User user = userDAO.getById(userId);

        if(user == null){
            return "fail";
        }

        if(user.getUserPw().equals(userInfo.get("userPw"))){
            user.setUserPw(userInfo.get("newUserPw"));

            try {
                userDAO.changePw(user);

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
    public boolean matchIdAndEmail(String userId, String userEmail) {

        User userTemp = userDAO.getById(userId);

        if(userTemp.getUserEmail().equals(userEmail)){
            return true;
        }

        return false;
    }

    @Override
    public void changePwById(Map<String, String> userInfo) {
        User userTemp = userDAO.getById(userInfo.get("userId"));

        userTemp.setUserPw(userInfo.get("userPw"));

        try {
            userDAO.changePw(userTemp);

        }catch (Exception e){
            e.printStackTrace();
        }

    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    private User toUser(UserDto userDto){
        User user = new User();
        user.setUserId(userDto.getUserId());
        user.setUserPw(userDto.getUserPw());
        user.setUserName(userDto.getUserName());
        user.setUserNickname(userDto.getUserNickname());
        user.setUserEmail(userDto.getUserEmail());
        user.setUserGender(userDto.getUserGender());
        user.setUserRegisterTime(LocalDateTime.now());

        return user;
    }
    private UserDto toUserDto(User saveUser){
        UserDto saveuserDto = new UserDto();
        saveuserDto.setUserId(saveUser.getUserId());
        saveuserDto.setUserName(saveUser.getUserName());
        saveuserDto.setUserNickname(saveUser.getUserNickname());
        saveuserDto.setUserEmail(saveUser.getUserEmail());
        saveuserDto.setUserGender(saveUser.getUserGender());
        saveuserDto.setUserRegisterTime(saveUser.getUserRegisterTime());

        return saveuserDto;
    }
}
