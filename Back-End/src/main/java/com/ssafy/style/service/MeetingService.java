package com.ssafy.style.service;

import com.ssafy.style.data.dto.MeetingDto;
import com.ssafy.style.data.entity.Meeting;

import java.util.ArrayList;
import java.util.List;

public interface MeetingService {
    MeetingDto insertMeeting(MeetingDto meetingDto, String ConsultantId) throws Exception;
    List<MeetingDto> selectAllMeeting() throws Exception;
    MeetingDto selectMeeting(String sessionId) throws Exception;
    MeetingDto updateMeeting(MeetingDto meetingDto) throws Exception;
    void deleteMeeting(String sessionId) throws Exception;
    void deleteAllMeetingConsultantId(String consultantId) throws Exception;
}
