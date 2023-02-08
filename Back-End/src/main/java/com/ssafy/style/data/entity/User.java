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
    @Column(length = 20)
    private String userId;
    @Column(nullable = false, length = 70)
    private String userPw;
    @Column(nullable = false, length = 20)
    private String userName;
    @Column(nullable = false, unique = true, length = 20)
    private String userNickname;
    @Column(nullable = false, unique = true, length = 50)
    private String userEmail;
    @Column(nullable = false)
    private Integer userGender;
    @CreationTimestamp
    @Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime userRegisterTime;
    private Integer userHeight;
    private Integer userShoulder;
    private Integer userChest;
    private Integer userSleeve;
    private Integer userWaist;
    private Integer userHip;
    private Integer userThigh;
    private Integer userHem;
    private Integer userFoot;

}


