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
@Table(name = "review")
public class Review implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer reviewNo;
    @ManyToOne
    @JoinColumn(name="userId")
    private User userId;
    @ManyToOne
    @JoinColumn(name="consultantId")
    private Consultant consultantId;
    @Column(nullable = false)
    private Double reviewScore;
    @Column(nullable = false, length = 200)
    private String reviewContent;
    @CreationTimestamp
    @Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime reviewRegisterTime;

}
