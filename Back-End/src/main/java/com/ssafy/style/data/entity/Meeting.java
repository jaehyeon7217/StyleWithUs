package com.ssafy.style.data.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "meeting")
public class Meeting {
    @Id
    @Column(length = 20)
    private String sessionId;
    @OneToOne
    @JoinColumn(name="consultantId")
    private Consultant consultantId;
    @ColumnDefault("0")
    private Integer numberOfPeople;
    @CreationTimestamp
    @Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime meetingRegisterTime;
}
