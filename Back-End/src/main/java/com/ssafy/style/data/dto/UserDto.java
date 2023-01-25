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
@ApiModel(value = "UserDto : 유저정보", description = "유저의 상세 정보를 나타낸다.")
public class UserDto {
    @ApiModelProperty(value = "유저아이디")
    private String userId;
    @ApiModelProperty(value = "유저패스워드")
    private String userPw;
    @ApiModelProperty(value = "유저이름")
    private String userName;
    @ApiModelProperty(value = "유저닉네임")
    private String userNickname;
    @ApiModelProperty(value = "유저이메일")
    private String userEmail;
    @ApiModelProperty(value = "유저성별(0 : 여자, 1: 남자")
    private int userGender;
    @ApiModelProperty(value = "유저가입날짜")
    private LocalDateTime userRegisterTime;
    @ApiModelProperty(value = "유저키")
    private int userHeight;
    @ApiModelProperty(value = "유저상체유형(1:마름, 2:보통, 3:통통")
    private int userTop;
    @ApiModelProperty(value = "유저하체유형(1:마름, 2:보통, 3:통통")
    private int userBottom;
    @ApiModelProperty(value = "유저발사이즈")
    private int userFoot;
    @ApiModelProperty(value = "유저나이")
    private int userAge;
    @ApiModelProperty(value = "유저퍼스널 컬러")
    private int userPc;

}
