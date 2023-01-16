package com.ssafy.style.data.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

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
    private String itemName;
    @Column(nullable = false)
    private String itemUri;
}
