package com.ssafy.style.data.dao.impl;

import com.ssafy.style.data.dao.UserDAO;
import com.ssafy.style.data.dto.UserDto;
import com.ssafy.style.data.entity.User;
import com.ssafy.style.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.transaction.Transactional;
import java.util.Map;
import java.util.Optional;

@Component
public class UserDAOImpl implements UserDAO {

    private final UserRepository userRepository;

    @Autowired
    public UserDAOImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User insertUser(User user) throws Exception {

            User savedUser = userRepository.save(user);
            return savedUser;
    }

    @Transactional
    @Override
    public User updateUser(User user) throws Exception {

        User temp = userRepository.getById(user.getUserId());

        user.setUserPw(temp.getUserPw());

        return userRepository.save(user);


    }


    @Override
    public boolean validId(String userId) {
//        User user = userRepository.getById(userId);

        boolean isValid = userRepository.existsByUserId(userId);
        System.out.println("@@@@@@@@@@@@@@ validId @@@@@@@@@@@ : " + isValid);

        // 이미 있다 : true => 회원가입 할 수 없다.
        return isValid;
    }

    @Override
    public boolean validEamil(String userEmail) {
        boolean isValid = userRepository.existsByUserEmail(userEmail);

        System.out.println("@@@@@@@@@@@@@@ validId @@@@@@@@@@@ : " + isValid);

        // 이미 있다 : true => 회원가입 할 수 없다.
        return isValid;
    }

    @Override
    public boolean validNickname(String userNickname) {
        boolean isValid = userRepository.existsByUserNickname(userNickname);

        System.out.println("@@@@@@@@@@@@@@ validId @@@@@@@@@@@ : " + isValid);

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
}
