package com.ssafy.style.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import com.ssafy.style.data.dto.MeetingDto;
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
    public ResponseEntity<?> createSession(@RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {

        Map<String, Object> check = new HashMap<>();

        logger.info("*** createSession 메소드 호출");

        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = openvidu.createSession(properties);

        MeetingDto meetingDto = new MeetingDto();
        meetingDto.setSessionId(session.getSessionId());

        try {
            meetingService.deleteAllSessionConsultantId(params.get("ConsultantId").toString());
            logger.info("*** deleteAllSessionConsultantId 호출");

            meetingService.createSession(meetingDto, params.get("ConsultantId").toString());
            logger.info("*** createSession 호출");

            check.put("msg", "success");
            check.put("sessionId", session.getSessionId());

            logger.info("*** createSession 메소드 종료");
            logger.info("*** 세션 생성 : " + session.getSessionId());
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

        logger.info("*** createConnection 메소드 호출");

        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            // 세션이 없다
            check.put("msg","fail");
            logger.info("*** createConnection 메소드 오류");
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(check);
        } else {
            ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
            Connection connection = session.createConnection(properties);

            try {
                MeetingDto meetingDto = meetingService.readMeeting(session.getSessionId());
                logger.info("*** getMeeting 호출");

                if(meetingDto.getNumberOfPeople() >= 2) {
                    // 세션 방에 인원이 2명 이상이면 입장 안됨.

                    check.put("msg", "The session room is full.");
                    logger.info("*** createConnection 오류 - 방 인원이 가득 참");
                    return ResponseEntity.status(HttpStatus.OK).body(check);
                } else {
                    meetingDto.setNumberOfPeople(meetingDto.getNumberOfPeople() + 1);
                    meetingService.updateMeeting(meetingDto);

                    check.put("msg", "success");
                    check.put("sessionId", session.getSessionId());
                    check.put("token", connection.getToken());

                    logger.info("*** createConnection 종료");
                    logger.info("*** sessionId : {}", session.getSessionId());
                    logger.info("*** token : {}", connection.getToken());
                    return ResponseEntity.status(HttpStatus.OK).body(check);
                }
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }

        }
    }

    @PostMapping("/api/sessions/{sessionId}/disconnections")
    @ApiOperation(value = "세션ID로 생성된 방 퇴장")
    public ResponseEntity<?> deleteConnection(@PathVariable("sessionId") @ApiParam(value = "세션 아이디", required = true) String sessionId) {

        Map<String, Object> check = new HashMap<>();

        logger.info("*** deleteConnection 메소드 호출");

        Session session = openvidu.getActiveSession(sessionId);

        if (session == null) {
            // 세션이 없다
            check.put("msg","fail");
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(check);
        } else {

            try {
                MeetingDto meetingDto = meetingService.readMeeting(session.getSessionId());
                meetingDto.setNumberOfPeople(meetingDto.getNumberOfPeople() - 1);

                if(meetingDto.getNumberOfPeople() <= 0) {
                    meetingService.deleteMeeting(meetingDto.getSessionId());
                } else {
                    meetingService.updateMeeting(meetingDto);
                }

                check.put("msg", "success");

                logger.info("*** deleteConnection 메소드 종료");
                return ResponseEntity.status(HttpStatus.OK).body(check);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }

        }
    }

    @GetMapping("/api/sessions")
    @ApiOperation(value = "생성된 방 모두 조회")
    public ResponseEntity<?> readAllSession() {

        Map<String, Object> check = new HashMap<>();

        logger.info("*** readAllSession - 호출");

        try {
            List<MeetingDto> list = meetingService.readAllMeeting();

            if(list != null) {

                logger.info("*** readAllSession list : {} ", list);

                check.put("msg", "success");
                check.put("data", list);

                return ResponseEntity.status(HttpStatus.OK).body(check);
            } else {
                check.put("msg", "fail");
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    @DeleteMapping("/api/sessions/{sessionId}")
    @ApiOperation(value = "세션ID로 생성된 방 삭제")
    public ResponseEntity<?> deleteSession(@PathVariable("sessionId") @ApiParam(value = "세션 아이디", required = true) String sessionId) {

        Map<String, Object> check = new HashMap<>();

        logger.info("*** deleteSession - 호출");

        try {
            meetingService.deleteMeeting(sessionId);

            check.put("msg", "success");

            return ResponseEntity.status(HttpStatus.OK).body(check);
        } catch (Exception e) {
            check.put("msg", "fail");
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(check);
        }

    }

}
