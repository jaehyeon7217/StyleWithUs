package com.ssafy.style.data.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User {
    @Id
    private String userId;
    @Column(nullable = false)
    private String userPw;
    @Column(nullable = false)
    private String userName;
    @Column(nullable = false, unique = true)
    private String userNickname;
    @Column(nullable = false, unique = true)
    private String userEmail;
    @Column(nullable = false)
    private Integer userGender;
    @Column(nullable = false)
    private Integer userType;
    @CreationTimestamp
    @Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime userRegisterTime;
    private Integer userHeight;
    private Integer userTop;
    private Integer userBottom;
    private Integer userFoot;
    private Integer userAge;
    private Integer userPc;

}


