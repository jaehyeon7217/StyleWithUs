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
@ApiModel(value = "ConsultantDto : 컨설턴트정보", description = "컨설턴트의 상세 정보를 나타낸다.")
public class ConsultantDto {
    @ApiModelProperty(value = "컨설턴트 아이디")
    private String consultantId;
    @ApiModelProperty(value = "유저패스워드")
    private String consultantPw;
    @ApiModelProperty(value = "유저이름")
    private String consultantName;
    @ApiModelProperty(value = "유저닉네임")
    private String consultantNickname;
    @ApiModelProperty(value = "유저이메일")
    private String consultantEmail;
    @ApiModelProperty(value = "유저성별")
    private int consultantGender;
    @ApiModelProperty(value = "유저타입")
    private int consultantType;
    @ApiModelProperty(value = "유저가입날짜")
    private LocalDateTime consultantRegisterTime;
    @ApiModelProperty(value = "컨설턴트 이력서")
    private String consultantResume;
    @ApiModelProperty(value = "컨설턴트 승인여부")
    private int consultantApproval;
}
