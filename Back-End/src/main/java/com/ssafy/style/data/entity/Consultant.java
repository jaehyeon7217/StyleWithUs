package com.ssafy.style.data.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "consultant")
public class Consultant implements Serializable {
    @Id
    @Column(length = 20)
    private String consultantId;
    @Column(nullable = false, length = 70)
    private String consultantPw;
    @Column(nullable = false, length = 20)
    private String consultantName;
    @Column(nullable = false, unique = true, length = 20)
    private String consultantNickname;
    @Column(nullable = false, unique = true, length = 50)
    private String consultantEmail;
    @Column(nullable = false)
    private Integer consultantGender;
    @CreationTimestamp
    @Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime consultantRegisterTime;
    @Column(length = 1000)
    private String consultantResume;
    private Integer consultantApproval;
}
