package com.ssafy.style.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;

import com.ssafy.style.data.dto.MeetingDto;
import com.ssafy.style.data.entity.Consultant;
import com.ssafy.style.service.MeetingService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;

@RestController
@RequestMapping(value = "/openvidu")
@Api("OpenVidu Controller API V1")
public class OpenViduController {

    public static final Logger logger = LoggerFactory.getLogger(OpenViduController.class);
    private final MeetingService meetingService;
    @Autowired
    public OpenViduController(MeetingService meetingService) {
        this.meetingService = meetingService;
    }

    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    /**
     * @param params The Session properties
     * @return The Session ID
     */

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    @PostMapping("/api/sessions")
    @ApiOperation(value = "방 생성을 위한 세션ID 생성")
    public ResponseEntity<?> initializeSession(@RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {

        Map<String, Object> check = new HashMap<>();

        logger.info("initializeSession - 호출");

        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = openvidu.createSession(properties);

        MeetingDto meetingDto = new MeetingDto();
        meetingDto.setSessionId(session.getSessionId());

        try {
            meetingService.insertMeeting(meetingDto, params.get("ConsultantId").toString());

            logger.info("세션 생성 : " + session.getSessionId());
            check.put("msg", "success");
            check.put("sessionId", session.getSessionId());

          return ResponseEntity.status(HttpStatus.OK).body(check);
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }


    }

    /**
     * @param sessionId The Session in which to create the Connection
     * @param params    The Connection properties
     * @return The Token associated to the Connection
     */
    @PostMapping("/api/sessions/{sessionId}/connections")
    @ApiOperation(value = "세션ID로 생성된 방 입장")
    public ResponseEntity<?> createConnection(@PathVariable("sessionId") @ApiParam(value = "세션 아이디", required = true) String sessionId,
                                                   @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {

        Map<String, Object> check = new HashMap<>();

        logger.info("createConnection - 호출");

        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            // 세션이 없다
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } else {
            ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
            Connection connection = session.createConnection(properties);

            try {
                MeetingDto meetingDto = meetingService.selectMeeting(session.getSessionId());
                if(meetingDto.getNumberOfPeople() >= 2) {
                    // 세션 방에 인원이 2명 이상이면 입장 안됨.

                    check.put("msg", "The session room is full.");
                    return ResponseEntity.status(HttpStatus.OK).body(check);

                } else {
                    meetingDto.setNumberOfPeople(meetingDto.getNumberOfPeople() + 1);
                    meetingService.updateMeeting(meetingDto);

                    check.put("msg", "success");
                    check.put("sessionId", session.getSessionId());
                    check.put("token", connection.getToken());

                  return ResponseEntity.status(HttpStatus.OK).body(check);
                }
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }

        }
    }

    @PostMapping("/api/sessions/{sessionId}/disconnections")
    @ApiOperation(value = "세션ID로 생성된 방 퇴장")
    public ResponseEntity<?> createDisConnection(@PathVariable("sessionId") @ApiParam(value = "세션 아이디", required = true) String sessionId) {

        Map<String, Object> check = new HashMap<>();

        logger.info("createDisConnection - 호출");

        Session session = openvidu.getActiveSession(sessionId);

        if (session == null) {
            // 세션이 없다
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } else {

            try {
                MeetingDto meetingDto = meetingService.selectMeeting(session.getSessionId());
                meetingDto.setNumberOfPeople(meetingDto.getNumberOfPeople() - 1);

                meetingService.updateMeeting(meetingDto);

                check.put("msg", "success");

                return ResponseEntity.status(HttpStatus.OK).body(check);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }

        }
    }

    @GetMapping("/api/sessions")
    @ApiOperation(value = "생성된 방 모두 조회")
    public ResponseEntity<?> AllSession() {

        Map<String, Object> check = new HashMap<>();

        logger.info("AllSession - 호출");

        try {
            List<MeetingDto> list = meetingService.selectAllMeeting();

            if(list != null) {

                logger.info("AllSession list : {} ", list);

                check.put("msg", "success");
                check.put("data", list);

                return ResponseEntity.status(HttpStatus.OK).body(check);
            } else {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    @DeleteMapping("/api/sessions/{sessionId}")
    @ApiOperation(value = "세션ID로 생성된 방 삭제")
    public ResponseEntity<?> DeleteSession(@PathVariable("sessionId") @ApiParam(value = "세션 아이디", required = true) String sessionId) {

        Map<String, Object> check = new HashMap<>();

        logger.info("DeleteSession - 호출");

        try {
            meetingService.deleteMeeting(sessionId);

            check.put("msg", "success");

            return ResponseEntity.status(HttpStatus.OK).body(check);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }

    }

}
