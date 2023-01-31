package com.ssafy.style.data.dto;

import com.ssafy.style.data.entity.Consultant;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "MeetingDto : 미팅룸 정보", description = "미팅 룸의 상세 정보를 나타낸다.")
public class MeetingDto {
    @ApiModelProperty(value = "세션아이디")
    private String sessionId;
    @ApiModelProperty(value = "컨설턴트아이디")
    private Consultant consultantId;
    @ApiModelProperty(value = "미팅룸 인원")
    private int numberOfPeople;
    @ApiModelProperty(value = "미팅룸 생성날짜")
    private LocalDateTime meetingRegisterTime;
}
