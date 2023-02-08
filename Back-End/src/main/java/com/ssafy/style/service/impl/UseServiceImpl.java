package com.ssafy.style.service.impl;

import com.ssafy.style.data.dao.UserDAO;
import com.ssafy.style.data.dto.UserDto;
import com.ssafy.style.data.entity.User;
import com.ssafy.style.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Service
public class UseServiceImpl implements UserService {

    private final UserDAO userDAO;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UseServiceImpl(UserDAO userDAO, PasswordEncoder passwordEncoder) {
        this.userDAO = userDAO;
        this.passwordEncoder = passwordEncoder;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    @Override
    public UserDto insertUser(UserDto userDto) throws Exception {

        String encodedPW = passwordEncoder.encode(userDto.getUserPw());

        userDto.setUserPw(encodedPW);

        User user = toUser(userDto);
        User saveUser = userDAO.insertUser(user);
        return toUserDto(saveUser);
    }

    @Override
    public UserDto selectUser(UserDto userDto) {

        String userId = userDto.getUserId();

        User user = userDAO.getById(userId);

        UserDto savedDto = new UserDto();

        if (user != null && passwordEncoder.matches(userDto.getUserPw(), user.getUserPw())) {
            savedDto = toUserDto(user);
            return savedDto;
        } else {
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
        if (user != null) {
            return toUserDto(user);
        } else {
            return null;
        }
    }

    @Override
    public String changePw(Map<String, String> userInfo) throws Exception {
        String userId = userInfo.get("userId");
        String encodedNewInputPw = passwordEncoder.encode(userInfo.get("newUserPw"));

        User user = userDAO.getById(userId);

        if (user == null) {
            return "fail";
        }

        if (passwordEncoder.matches(userInfo.get("userPw"), user.getUserPw())) {
            user.setUserPw(encodedNewInputPw);

            try {
                userDAO.changePw(user);

                return "OK";
            } catch (Exception e) {
                e.printStackTrace();
                return "Error";
            }
        } else {
            return "Fail";
        }
    }

    @Override
    public boolean matchIdAndEmail(String userId, String userEmail) {

        User userTemp = userDAO.getById(userId);

        if (userTemp.getUserEmail().equals(userEmail)) {
            return true;
        }

        return false;
    }

    @Override
    public void changePwById(Map<String, String> userInfo) {
        User userTemp = userDAO.getById(userInfo.get("userId"));

        String encodePw = passwordEncoder.encode(userInfo.get("userPw"));

        userTemp.setUserPw(encodePw);

        try {
            userDAO.changePw(userTemp);

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    private User toUser(UserDto userDto) {
        User user = new User();
        user.setUserId(userDto.getUserId());
        user.setUserPw(userDto.getUserPw());
        user.setUserName(userDto.getUserName());
        user.setUserNickname(userDto.getUserNickname());
        user.setUserEmail(userDto.getUserEmail());
        user.setUserGender(userDto.getUserGender());
        user.setUserRegisterTime(LocalDateTime.now());

        if (userDto.getUserHeight() != null) {
            user.setUserHeight(userDto.getUserHeight());
        }
        if (userDto.getUserShoulder() != null) {
            user.setUserShoulder(userDto.getUserShoulder());
        }
        if (userDto.getUserChest() != null) {
            user.setUserChest(userDto.getUserChest());
        }
        if (userDto.getUserSleeve() != null) {
            user.setUserSleeve(userDto.getUserSleeve());
        }
        if (userDto.getUserWaist() != null) {
            user.setUserWaist(userDto.getUserWaist());
        }
        if (userDto.getUserHip() != null) {
            user.setUserHip(userDto.getUserHip());
        }
        if (userDto.getUserThigh() != null) {
            user.setUserThigh(userDto.getUserThigh());
        }
        if (userDto.getUserHem() != null) {
            user.setUserHem(userDto.getUserHem());
        }
        if (userDto.getUserFoot() != null) {
            user.setUserFoot(userDto.getUserFoot());
        }

        return user;
    }

    private UserDto toUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setUserId(user.getUserId());
        userDto.setUserName(user.getUserName());
        userDto.setUserNickname(user.getUserNickname());
        userDto.setUserEmail(user.getUserEmail());
        userDto.setUserGender(user.getUserGender());
        userDto.setUserRegisterTime(user.getUserRegisterTime());

        if (user.getUserHeight() != null) {
            userDto.setUserHeight(user.getUserHeight());
        }
        if (user.getUserShoulder() != null) {
            userDto.setUserShoulder(user.getUserShoulder());
        }
        if (user.getUserChest() != null) {
            userDto.setUserChest(user.getUserChest());
        }
        if (user.getUserSleeve() != null) {
            userDto.setUserSleeve(user.getUserSleeve());
        }
        if (user.getUserWaist() != null) {
            userDto.setUserWaist(user.getUserWaist());
        }
        if (user.getUserHip() != null) {
            userDto.setUserHip(user.getUserHip());
        }
        if (user.getUserThigh() != null) {
            userDto.setUserThigh(user.getUserThigh());
        }
        if (user.getUserHem() != null) {
            userDto.setUserHem(user.getUserHem());
        }
        if (user.getUserFoot() != null) {
            userDto.setUserFoot(user.getUserFoot());
        }

        return userDto;
    }
}
