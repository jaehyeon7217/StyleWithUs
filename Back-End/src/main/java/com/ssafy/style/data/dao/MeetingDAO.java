package com.ssafy.style.data.dao;

import com.ssafy.style.data.entity.Meeting;

import java.util.List;

public interface MeetingDAO {
    Meeting createMeeting(Meeting meeting, String ConsultantId) throws Exception;
    List<Meeting> readAllMeeting() throws Exception;
    Meeting readMeeting(String sessionId) throws Exception;
    Meeting updateMeeting(Meeting meeting) throws Exception;
    void deleteMeeting(String sessionId) throws Exception;
    void deleteAllMeetingConsultantId(String consultantId) throws Exception;

}
