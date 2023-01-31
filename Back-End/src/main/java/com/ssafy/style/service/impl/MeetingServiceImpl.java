package com.ssafy.style.service.impl;

import com.ssafy.style.data.dao.MeetingDAO;
import com.ssafy.style.data.dto.MeetingDto;
import com.ssafy.style.data.entity.Meeting;
import com.ssafy.style.service.MeetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MeetingServiceImpl implements MeetingService {

    private final MeetingDAO meetingDAO;
    @Autowired
    public MeetingServiceImpl(MeetingDAO meetingDAO) {this.meetingDAO = meetingDAO;}

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    @Override
    public MeetingDto insertMeeting(MeetingDto meetingDto, String ConsultantId) throws Exception {
        Meeting meeting = toMeeting(meetingDto);
        Meeting saveMeeting = meetingDAO.insertMeeting(meeting, ConsultantId);
        return toMeetingDto(saveMeeting);
    }

    @Override
    public List<MeetingDto> selectAllMeeting() throws Exception {

        ArrayList<MeetingDto> list = new ArrayList<MeetingDto>();
        List<Meeting> selectAllMeeting = meetingDAO.selectAllMeeting();

        for(Meeting m : selectAllMeeting) {
            list.add(new MeetingDto(
                    m.getSessionId(),
                    m.getConsultantId(),
                    m.getNumberOfPeople(),
                    m.getMeetingRegisterTime()));
        }

        return list;
    }

    @Override
    public MeetingDto selectMeeting(String sessionId) throws Exception {
        Meeting selectMeeting = meetingDAO.selectMeeting(sessionId);
        return toMeetingDto(selectMeeting);
    }

    @Override
    public MeetingDto updateMeeting(MeetingDto meetingDto) throws Exception {
        Meeting meeting = toMeeting(meetingDto);
        Meeting saveMeeting = meetingDAO.updateMeeting(meeting);
        return toMeetingDto(saveMeeting);
    }

    @Override
    public void deleteMeeting(String sessionId) throws Exception {
        meetingDAO.deleteMeeting(sessionId);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    private Meeting toMeeting(MeetingDto meetingDto) {
        Meeting meeting = new Meeting();
        meeting.setSessionId(meetingDto.getSessionId());
        meeting.setConsultantId(meetingDto.getConsultantId());
        meeting.setNumberOfPeople(meetingDto.getNumberOfPeople());
        meeting.setMeetingRegisterTime(meetingDto.getMeetingRegisterTime());
        return meeting;
    }

    private MeetingDto toMeetingDto(Meeting meeting) {
        MeetingDto meetingDto = new MeetingDto();
        meetingDto.setSessionId(meeting.getSessionId());
        meetingDto.setConsultantId(meeting.getConsultantId());
        meetingDto.setNumberOfPeople(meeting.getNumberOfPeople());
        meetingDto.setMeetingRegisterTime(meeting.getMeetingRegisterTime());
        return meetingDto;
    }
}
