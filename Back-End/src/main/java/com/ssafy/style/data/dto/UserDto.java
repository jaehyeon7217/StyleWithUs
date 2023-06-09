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
    private Integer userHeight;
    @ApiModelProperty(value = "유저 어깨너비")
    private Integer userShoulder;
    @ApiModelProperty(value = "유저 가슴단면")
    private Integer userChest;
    @ApiModelProperty(value = "유저 소매길이")
    private Integer userSleeve;
    @ApiModelProperty(value = "유저 허리단면")
    private Integer userWaist;
    @ApiModelProperty(value = "유저 엉덩이단면")
    private Integer userHip;
    @ApiModelProperty(value = "유저 허벅지단면")
    private Integer userThigh;
    @ApiModelProperty(value = "유저 밑단단면")
    private Integer userHem;
    @ApiModelProperty(value = "유저발사이즈")
    private Integer userFoot;

}
