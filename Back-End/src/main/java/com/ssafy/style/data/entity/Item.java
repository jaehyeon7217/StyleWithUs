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
@Table(name = "item")
public class Item implements Serializable {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer itemNo;
    @ManyToOne
    @JoinColumn(name="userId")
    private User userId;
    @Column(nullable = false)
    private String itemImgLink;
    @Column(nullable = false, length = 20)
    private String itemName;
    @Column(nullable = false, length = 1024)
    private String itemUri;
    @Column(nullable = false, length = 20)
    private String itemPrice;
    @CreationTimestamp
    @Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime itemRegisterTime;

}
