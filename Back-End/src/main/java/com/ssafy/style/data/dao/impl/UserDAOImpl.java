package com.ssafy.style.data.dao.impl;

import com.ssafy.style.data.dao.UserDAO;
import com.ssafy.style.data.entity.User;
import com.ssafy.style.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
public class UserDAOImpl implements UserDAO {

    private final UserRepository userRepository;

    @Autowired
    public UserDAOImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User insertUser(User user) {
            User savedUser = userRepository.save(user);
            return savedUser;
    }

    @Transactional
    @Override
    public User updateUser(User user) {
        User temp = userRepository.getById(user.getUserId());
        user.setUserPw(temp.getUserPw());
        user.setUserRegisterTime(temp.getUserRegisterTime());
        return userRepository.save(user);
    }


    @Override
    public boolean validId(String userId) {
        boolean isValid = userRepository.existsByUserId(userId);

        // 이미 있다 : true => 회원가입 할 수 없다.
        return isValid;
    }

    @Override
    public boolean validEmail(String userEmail) {
        boolean isValid = userRepository.existsByUserEmail(userEmail);

        // 이미 있다 : true => 회원가입 할 수 없다.
        return isValid;
    }

    @Override
    public boolean validNickname(String userNickname) {
        boolean isValid = userRepository.existsByUserNickname(userNickname);

        // 이미 있다 : true => 회원가입 할 수 없다.
        return isValid;
    }

    @Override
    public User getById(String userId) {
        boolean isValid = userRepository.existsByUserId(userId);

        if(isValid) {
            User selectedUser = userRepository.getById(userId);
            return selectedUser;
        }else{
            return null;
        }
    }

    @Override
    public void changePw(User user) throws Exception {
        userRepository.save(user);
    }

    @Override
    public User getUserGender(String userNickname) throws Exception {
        return userRepository.findByUserNickname(userNickname);
    }
}
