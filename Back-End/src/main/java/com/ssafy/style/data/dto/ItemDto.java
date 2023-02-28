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
@ApiModel(value = "ItemDto : 장바구니 정보", description = "장바구니의 상세 정보를 나타낸다.")
public class ItemDto {
    @ApiModelProperty(value = "아이템 번호")
    private Integer itemNo;
    @ApiModelProperty(value = "유저아이디")
    private String userId;
    @ApiModelProperty(value = "아이템 이미지 링크")
    private String itemImgLink;
    @ApiModelProperty(value = "아이템 이름")
    private String itemName;
    @ApiModelProperty(value = "아이템 uri")
    private String itemUri;
    @ApiModelProperty(value = "아이템 가격")
    private String itemPrice;
    @ApiModelProperty(value = "아이템 등록 시간")
    private LocalDateTime itemRegisterTime;
}
