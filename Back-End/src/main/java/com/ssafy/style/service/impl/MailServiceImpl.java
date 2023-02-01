package com.ssafy.style.service.impl;

import com.ssafy.style.service.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {
    //의존성 주입을 통해서 필요한 객체를 가져온다.
    private final JavaMailSender emailSender;
    private String authNum; //랜덤 인증 코드

    //랜덤 인증 코드 생성
    public void createCode() {
        Random random = new Random();
        StringBuffer key = new StringBuffer();

        for(int i=0;i<8;i++) {
            int index = random.nextInt(3);

            switch (index) {
                case 0 :
                    key.append((char) ((int)random.nextInt(26) + 97));
                    break;
                case 1:
                    key.append((char) ((int)random.nextInt(26) + 65));
                    break;
                case 2:
                    key.append(random.nextInt(9));
                    break;
            }
        }
        authNum = key.toString();
    }

    //메일 양식 작성
    public MimeMessage createEmailForm(String email) throws MessagingException, UnsupportedEncodingException {

        createCode(); //인증 코드 생성
        String setFrom = "correct1276@naver.com"; //email-config에 설정한 자신의 이메일 주소(보내는 사람)
        String title = "Style With us 회원가입 인증 번호"; //제목

        MimeMessage message = emailSender.createMimeMessage();
        message.addRecipients(MimeMessage.RecipientType.TO, email); //보낼 이메일 설정
        message.setSubject(title); //제목 설정
        String msgg = "";
        msgg += "<p style=\"font-size:10pt;font-family:sans-serif;padding:0 0 0 10pt\"><br></p>";
        msgg += "<p>";
        msgg += "</p><table align=\"center\" width=\"670\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-top: 2px solid #60b9ce; border-right: 1px solid #e7e7e7; border-left: 1px solid #e7e7e7; border-bottom: 1px solid #e7e7e7;\">";
        msgg += "<tbody><tr><td style=\"background-color: #ffffff; padding: 40px 30px 0 35px; text-align: center;\">";
        msgg += "<table width=\"605\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"text-align: left; font-family: '맑은 고딕','돋움';\">";
        msgg += "<tbody><tr><td style=\"color: #2daad1; font-size: 25px; text-align: left; width: 352px; word-spacing: -1px; vertical-align: top;\">";
        msgg += "인증 번호 확인 후<br>";
        msgg += "이메일 인증을 완료해 주세요.";
        msgg += "</td></tr>";
        msgg += "<tr><td style=\"font-size: 17px; vertical-align: bottom; height: 27px;\">안녕하세요? \"Style With us\"입니다.</td></tr>";
        msgg += "<tr><td colspan=\"2\" style=\"font-size: 13px; word-spacing: -1px; height: 30px;\">아래 인증번호를 입력하시고 계속 진행해 주세요.</td></tr></tbody></table>";
        msgg += "</td></tr>";
        msgg += "<tr><td style=\"padding: 39px 196px 70px;\">";
        msgg += "<table width=\"278\" style=\"background-color: #3cbfaf; font-family: '맑은 고딕','돋움';\">";
        msgg += "<tbody><tr><td height=\"49\" style=\"text-align: center; color: #fff\">인증번호 : <span>" + authNum + "</span></td></tr>";
        msgg += "</tbody></table>";
        msgg += "</td></tr>";
        msgg += "</tbody></table>";
        msgg += "<p></p>";
        msgg += "<img height=\"1\" width=\"1\" border=\"0\" style=\"display:none;\" src=\"http://ems.midasit.com:4121/7I-110098I-41E-8174224742I-4uPmuPzeI-4I-3\">";

        message.setText(msgg, "utf-8", "html");// 내용, charset 타입, subtype
        // 보내는 사람의 이메일 주소, 보내는 사람 이름
        message.setFrom(new InternetAddress("correct1276@naver.com","Style With us")); //보내는 이메일

        return message;
    }

    //실제 메일 전송
    public String sendEmail(String toEmail) throws MessagingException, UnsupportedEncodingException {

        //메일전송에 필요한 정보 설정
        MimeMessage emailForm = createEmailForm(toEmail);
        //실제 메일 전송
        emailSender.send(emailForm);

        return authNum; //인증 코드 반환
    }

}
