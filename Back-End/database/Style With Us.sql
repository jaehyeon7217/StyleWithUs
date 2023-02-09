-- --------------------------------------------------------
-- 호스트:                          i8d105.p.ssafy.io
-- 서버 버전:                        10.10.2-MariaDB-1:10.10.2+maria~ubu2204 - mariadb.org binary distribution
-- 서버 OS:                        debian-linux-gnu
-- HeidiSQL 버전:                  11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- stylewithus 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `stylewithus` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `stylewithus`;

-- 테이블 stylewithus.consultant 구조 내보내기
CREATE TABLE IF NOT EXISTS `consultant` (
  `consultant_id` varchar(20) NOT NULL,
  `consultant_approval` int(11) DEFAULT NULL,
  `consultant_email` varchar(50) NOT NULL,
  `consultant_gender` int(11) NOT NULL,
  `consultant_name` varchar(20) NOT NULL,
  `consultant_nickname` varchar(20) NOT NULL,
  `consultant_pw` varchar(70) NOT NULL,
  `consultant_register_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `consultant_resume` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`consultant_id`),
  UNIQUE KEY `UK_hod0g5r66wdgbpt3s0hixrstj` (`consultant_email`),
  UNIQUE KEY `UK_6uni0jjmwb8irb96yht3ojd5q` (`consultant_nickname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 stylewithus.item 구조 내보내기
CREATE TABLE IF NOT EXISTS `item` (
  `item_no` int(11) NOT NULL AUTO_INCREMENT,
  `item_img_link` varchar(255) NOT NULL,
  `item_name` varchar(200) NOT NULL,
  `item_price` varchar(20) NOT NULL,
  `item_register_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `item_uri` varchar(1024) NOT NULL,
  `user_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`item_no`),
  KEY `FKh4epdoqikj4sfedlxcc9dwwnl` (`user_id`),
  CONSTRAINT `FKh4epdoqikj4sfedlxcc9dwwnl` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 stylewithus.meeting 구조 내보내기
CREATE TABLE IF NOT EXISTS `meeting` (
  `session_id` varchar(20) NOT NULL,
  `meeting_register_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `number_of_people` int(11) DEFAULT 0,
  `consultant_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`session_id`),
  KEY `FKi0wwff1eicyn6q629tf4bwte5` (`consultant_id`),
  CONSTRAINT `FKi0wwff1eicyn6q629tf4bwte5` FOREIGN KEY (`consultant_id`) REFERENCES `consultant` (`consultant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 stylewithus.review 구조 내보내기
CREATE TABLE IF NOT EXISTS `review` (
  `review_no` int(11) NOT NULL AUTO_INCREMENT,
  `review_content` varchar(200) NOT NULL,
  `review_register_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `review_score` double NOT NULL,
  `consultant_id` varchar(20) DEFAULT NULL,
  `user_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`review_no`),
  KEY `FKdptf33snf2adt859n8r3x48r0` (`consultant_id`),
  KEY `FKiyf57dy48lyiftdrf7y87rnxi` (`user_id`),
  CONSTRAINT `FKdptf33snf2adt859n8r3x48r0` FOREIGN KEY (`consultant_id`) REFERENCES `consultant` (`consultant_id`),
  CONSTRAINT `FKiyf57dy48lyiftdrf7y87rnxi` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 stylewithus.user 구조 내보내기
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` varchar(20) NOT NULL,
  `user_chest` int(11) DEFAULT NULL,
  `user_email` varchar(50) NOT NULL,
  `user_foot` int(11) DEFAULT NULL,
  `user_gender` int(11) NOT NULL,
  `user_height` int(11) DEFAULT NULL,
  `user_hem` int(11) DEFAULT NULL,
  `user_hip` int(11) DEFAULT NULL,
  `user_name` varchar(20) NOT NULL,
  `user_nickname` varchar(20) NOT NULL,
  `user_pw` varchar(70) NOT NULL,
  `user_register_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_shoulder` int(11) DEFAULT NULL,
  `user_sleeve` int(11) DEFAULT NULL,
  `user_thigh` int(11) DEFAULT NULL,
  `user_waist` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UK_j09k2v8lxofv2vecxu2hde9so` (`user_email`),
  UNIQUE KEY `UK_cr59axqya8utby3j37qi341rm` (`user_nickname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
