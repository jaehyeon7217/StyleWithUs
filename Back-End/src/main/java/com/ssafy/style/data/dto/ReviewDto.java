package com.ssafy.style.data.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "ReviewDto : 리뷰정보", description = "컨설턴트 리뷰의 상세 정보를 나타낸다.")
public class ReviewDto {
    @ApiModelProperty(value = "리뷰 번호")
    private Integer reviewNo;
    @ApiModelProperty(value = "유저아이디")
    private String userId;
    @ApiModelProperty(value = "컨설턴트아이디")
    private String consultantId;
    @ApiModelProperty(value = "리뷰 점수")
    private Double reviewScore;
    @ApiModelProperty(value = "리뷰 내용")
    private String reviewContent;
    @ApiModelProperty(value = "작성 날짜")
    private LocalDateTime reviewRegisterTime;
}
