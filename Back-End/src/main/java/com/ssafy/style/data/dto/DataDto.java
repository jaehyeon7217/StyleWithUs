package com.ssafy.style.data.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "DataDto : 크롤링정보", description = "크롤링 데이터의 상세 정보를 나타낸다.")
public class DataDto {
    @ApiModelProperty(value = "데이터 번호")
    private int no;
    @ApiModelProperty(value = "세일")
    private String sale;
    @ApiModelProperty(value = "이미지 링크")
    private String imgLink;
    @ApiModelProperty(value = "제조사")
    private String maker;
    @ApiModelProperty(value = "href 링크")
    private String link;
    @ApiModelProperty(value = "상품명")
    private String title;
    @ApiModelProperty(value = "세일 전 가격")
    private String beforePrice;
    @ApiModelProperty(value = "세일 후 가격")
    private String afterPrice;
}
