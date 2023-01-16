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
    private String consultantId;
    @Column(nullable = false)
    private String consultantPw;
    @Column(nullable = false)
    private String consultantName;
    @Column(nullable = false, unique = true)
    private String consultantNickname;
    @Column(nullable = false, unique = true)
    private String consultantEmail;
    @Column(nullable = false)
    private Integer consultantGender;
    @Column(nullable = false)
    private Integer consultantType;
    @CreationTimestamp
    @Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime consultantRegisterTime;
    private String consultantResume;
    private Integer consultantApproval;
}
