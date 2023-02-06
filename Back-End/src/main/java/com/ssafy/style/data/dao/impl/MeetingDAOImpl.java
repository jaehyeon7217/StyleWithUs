package com.ssafy.style.data.dao.impl;

import com.ssafy.style.data.dao.MeetingDAO;
import com.ssafy.style.data.entity.Meeting;
import com.ssafy.style.data.repository.ConsultantRepository;
import com.ssafy.style.data.repository.MeetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class MeetingDAOImpl implements MeetingDAO {

    private final MeetingRepository meetingRepository;

    private final ConsultantRepository consultantRepository;

    @Autowired
    public MeetingDAOImpl(MeetingRepository meetingRepository, ConsultantRepository consultantRepository) {
        this.meetingRepository = meetingRepository;
        this.consultantRepository = consultantRepository;
    }

    @Override
    public Meeting insertMeeting(Meeting meeting, String ConsultantId) throws Exception {


        meeting.setConsultantId(consultantRepository.findById(ConsultantId).get());
        Meeting saveMeeting = meetingRepository.save(meeting);
        return saveMeeting;
    }

    @Override
    public List<Meeting> selectAllMeeting() throws Exception {
        List<Meeting> showAllMeeting = meetingRepository.findAll();
        return showAllMeeting;
    }

    @Override
    public Meeting selectMeeting(String sessionId) throws Exception {
        Meeting showMeeting = meetingRepository.findById(sessionId).get();
        return showMeeting;
    }

    @Transactional
    @Override
    public Meeting updateMeeting(Meeting meeting) throws Exception {
//        Meeting temp = meetingRepository.getById(meeting.getSessionId());
//        meeting.setNumberOfPeople(temp.getNumberOfPeople());
        return meetingRepository.save(meeting);
    }

    @Override
    public void deleteMeeting(String sessionId) throws Exception {
        Optional<Meeting> selectedMeeting = meetingRepository.findById(sessionId);

        if(selectedMeeting.isPresent()) {
            Meeting deleteMeeting = selectedMeeting.get();

            meetingRepository.delete(deleteMeeting);
        } else {
            throw new Exception();
        }

    }

    @Override
    public void deleteAllMeetingConsultantId(String consultantId) throws Exception {
        List<Meeting> list = meetingRepository.findByConsultantId(consultantRepository.getById(consultantId));

        for(Meeting m : list) {
            meetingRepository.delete(m);
        }
    }
}
