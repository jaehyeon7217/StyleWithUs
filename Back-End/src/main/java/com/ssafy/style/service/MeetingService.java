package com.ssafy.style.service;

import com.ssafy.style.data.dto.MeetingDto;

import java.util.List;

public interface MeetingService {
    MeetingDto createSession(MeetingDto meetingDto, String ConsultantId) throws Exception;
    List<MeetingDto> readAllMeeting() throws Exception;
    MeetingDto readMeeting(String sessionId) throws Exception;
    MeetingDto updateMeeting(MeetingDto meetingDto) throws Exception;
    void deleteMeeting(String sessionId) throws Exception;
    void deleteAllSessionConsultantId(String consultantId) throws Exception;
}
