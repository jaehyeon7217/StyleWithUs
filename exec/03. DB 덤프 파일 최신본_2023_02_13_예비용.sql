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

-- 테이블 데이터 stylewithus.consultant:~8 rows (대략적) 내보내기
/*!40000 ALTER TABLE `consultant` DISABLE KEYS */;
INSERT IGNORE INTO `consultant` (`consultant_id`, `consultant_approval`, `consultant_email`, `consultant_gender`, `consultant_name`, `consultant_nickname`, `consultant_pw`, `consultant_register_time`, `consultant_resume`) VALUES
	('abciiiiiiiicba', 1, 'abciiiiiiiicba@gmail.com', 1, '컨설턴트', 'conabciiiiiiiicba', '$2a$10$IN5JjrUE1Fg2EIsyZgXkxORnQvUNv3tzp4cDeNxDuG9vA5Qn79ivC', '2023-02-07 05:58:35', '경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력'),
	('bingbang', 1, 'byoung1997s4@gmail.com', 1, '이병수', 'bingbang', '$2a$10$5MFLGXDCLzZ6tXuT.srafOMHtgiYoo/X/tFqLBqo/mTDVVviYR.46', '2023-02-13 07:05:38', '경력 기술서 수정 수정 수정2'),
	('bingbang2', 1, 'tmfdhddl2006@naver.com', 1, '이병수', 'bingbang2', '$2a$10$iGfrWDULZ1myb4fO1XHJVeJQLgCqN7xR1Qge1f0u50D50h6t70FqG', '2023-02-10 05:18:01', '경력기술서\n경력기술서\n경력기술서\n경력기술서\n경력기술서\n경력기술서\n경력기술서\n경력기술서\n경력기술서\n경력기술서\n경력기술서\n경력기술서\n경력기술서\n경력기술서\n경력기술서\n경력기술서\n경력기술서\n경력기술서'),
	('consultant01', 1, 'jhp1276@naver.com', 1, '김컨설턴트', 'consultant01', '$2a$10$A1FAa6Qeh38VpybMHwPgceELkwkqdwYLdEqRo0T8JOHX3Pw9HnFNW', '2023-02-08 01:24:22', '경력 기술서'),
	('cyctjdghks', 1, 'cyctjdghks@naver.com', 1, '박성환', 'ConSeongHwan', '$2a$10$wBk6w/fWLn/nuRPctdpGK.1WLHhTl.qJ2nszqU3w/MF6SZeZzzbrW', '2023-02-08 00:50:18', '경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력경력'),
	('eaea7314', 1, 'eaea7314@naver.com', 1, '이동엽', 'cDong', '$2a$10$o4QGzLBVBGE7/gHm4chSDOZ3bLR7Jan.R1.o4Pcmx4nn.xzqh/G5G', '2023-02-10 01:40:50', 'gd'),
	('seojeong4560', 1, 'seojeong4560@daum.net', 0, '양서정', 'yang', '$2a$10$Pt3Ll9Xt8jvq5zJrh0NZ8ulQU1QvFzb/THbi7yBvJVlJT.TnvtA66', '2023-02-07 05:35:58', 'ㅎㅇㅎㅇ'),
	('tjwjd4560', 1, 'seojeong4560@naver.com', 1, '양서정', 'yangggg', '$2a$10$0gng5OwRnZh6b9sHyZ7Mm.jzgmw4Dw3MOVMPnn/8hH1vslOl9LQp.', '2023-02-09 13:09:15', '서울대학교 패션 디자인 학과 졸업\n인스타 팔로워 500만');
/*!40000 ALTER TABLE `consultant` ENABLE KEYS */;

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
) ENGINE=InnoDB AUTO_INCREMENT=474 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 stylewithus.item:~72 rows (대략적) 내보내기
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT IGNORE INTO `item` (`item_no`, `item_img_link`, `item_name`, `item_price`, `item_register_time`, `item_uri`, `user_id`) VALUES
	(100, 'https://image.msscdn.net/images/goods_img/20220125/2326935/2326935_11_125.jpg', '(23SS) 2 TONE ARCH HOODIE GRAY', '63,200원', '2023-02-10 07:52:55', 'https://www.musinsa.com/app/goods/2326935', 'dongyeop'),
	(101, 'https://image.msscdn.net/images/goods_img/20220807/2702396/2702396_16734042163511_125.jpg', '코튼 워셔블 하찌 하프집업 니트_5 COLOR', '56,900원', '2023-02-10 07:52:56', 'https://www.musinsa.com/app/goods/2702396', 'dongyeop'),
	(102, 'https://image.msscdn.net/images/goods_img/20210826/2092849/2092849_16758410350611_125.jpg', '[기모선택] 이지 와이드 데님 팬츠 블랙', '42,000원', '2023-02-10 07:53:00', 'https://www.musinsa.com/app/goods/2092849', 'dongyeop'),
	(114, 'https://product-image.wconcept.co.kr/productimg/image/img1/63/302199663_OP96811.jpg', 'CASHMERE BLEND CABLE CARDIGAN - PINK', '124,200', '2023-02-10 08:50:50', 'https://www.wconcept.co.kr/Product/302199663', 'dongyeop'),
	(115, 'https://product-image.wconcept.co.kr/productimg/image/img1/45/302270845_HE91798.jpg', 'POD DENIM JACKET BLUE', '134,100', '2023-02-10 08:53:54', 'https://www.wconcept.co.kr/Product/302270845', 'dongyeop'),
	(116, 'https://product-image.wconcept.co.kr/productimg/image/img1/07/302273907_JG18859.jpg', '네파/본사직영 7J20662 여성 에코 브리즈 방풍 자켓', '159,000', '2023-02-10 08:54:49', 'https://www.wconcept.co.kr/Product/302273907', 'dongyeop'),
	(117, 'https://product-image.wconcept.co.kr/productimg/image/img1/81/302271081_YD22848.jpg', 'POD POLA T-SHIRTS SUNSHINE', '28,800', '2023-02-10 08:55:54', 'https://www.wconcept.co.kr/Product/302271081', 'dongyeop'),
	(118, 'https://product-image.wconcept.co.kr/productimg/image/img1/73/302263173_LJ78837.jpg', 'COSMETIC CLUTCH_46 Lemon', '99,000', '2023-02-10 08:58:11', 'https://www.wconcept.co.kr/Product/302263173', 'dongyeop'),
	(119, 'https://product-image.wconcept.co.kr/productimg/image/img1/21/302136821_HG92450.jpg', 'DRO BOOTSCUT WASHING DENIM PANTS BLUE', '95,200', '2023-02-10 09:00:25', 'https://www.wconcept.co.kr/Product/302136821', 'dongyeop'),
	(120, 'https://product-image.wconcept.co.kr/productimg/image/img1/53/302134253.jpg', 'CORDUROY SHORT PANTS - BLACK', '70,200', '2023-02-10 09:00:35', 'https://www.wconcept.co.kr/Product/302134253', 'dongyeop'),
	(121, 'https://product-image.wconcept.co.kr/productimg/image/img1/48/302272648_CG12264.jpg', '[패키지]코튼 린넨 롱 와이드 데님 밴딩 팬츠 2color', '49,900', '2023-02-10 09:00:43', 'https://www.wconcept.co.kr/Product/302272648', 'dongyeop'),
	(145, 'https://image.msscdn.net/images/goods_img/20190911/1152854/1152854_3_125.jpg', '[기모] Geppetto 자수 후드 크림', '46,800원', '2023-02-12 03:31:51', 'https://www.musinsa.com/app/goods/1152854', 'bingbang'),
	(157, 'https://image.msscdn.net/images/goods_img/20211220/2272830/2272830_16748108534077_125.png', '(시티보이) 오버핏 옥스포드 셔츠_SPYWD23C01', '35,910원', '2023-02-12 22:57:12', 'https://www.musinsa.com/app/goods/2272830', 'bingbang'),
	(162, 'https://image.msscdn.net/images/goods_img/20190430/1031260/1031260_5_125.jpg', '22S/S 오버핏 피케티셔츠 (블랙)', '35,100원', '2023-02-13 00:09:24', 'https://www.musinsa.com/app/goods/1031260', 'bingbang'),
	(163, 'https://product-image.wconcept.co.kr/productimg/image/img1/39/302263339_KX84682.jpg', '톨로스 클래식 이어링 3, 스몰 모델 14K 옐로우 골드', '1,390,000', '2023-02-13 00:14:59', 'https://www.wconcept.co.kr/Product/302263339', 'abciiiiiiiicba'),
	(164, 'https://product-image.wconcept.co.kr/productimg/image/img1/42/302263342_OO62602.jpg', '톨로스 클래식 이어링 3, 스몰 모델 (14K 로즈 골드)', '1,390,000', '2023-02-13 00:15:03', 'https://www.wconcept.co.kr/Product/302263342', 'abciiiiiiiicba'),
	(256, 'https://image.msscdn.net/images/goods_img/20161123/452483/452483_2_125.jpg', '솔리드 무톤 자켓', '158,000원', '2023-02-13 02:13:14', 'https://www.musinsa.com/app/goods/452483', 'cyctjdghks1'),
	(260, 'https://image.msscdn.net/images/goods_img/20200806/1539383/1539383_2_125.jpg', '솔리드 스웨이드 무톤 자켓 (블랙)', '158,000원', '2023-02-13 02:13:45', 'https://www.musinsa.com/app/goods/1539383', 'cyctjdghks1'),
	(263, 'https://image.msscdn.net/images/goods_img/20200821/1558847/1558847_13_125.jpg', '[리뉴얼] 하프 터틀넥 니트 세트', '39,900원', '2023-02-13 02:14:56', 'https://www.musinsa.com/app/goods/1558847', 'cyctjdghks1'),
	(264, 'https://image.msscdn.net/images/goods_img/20171025/659554/659554_6_125.jpg', '[세트] 하프 폴라 니트 티셔츠', '35,100원', '2023-02-13 02:14:57', 'https://www.musinsa.com/app/goods/659554', 'cyctjdghks1'),
	(265, 'https://image.msscdn.net/images/goods_img/20171025/659554/659554_6_125.jpg', '[세트] 하프 폴라 니트 티셔츠', '35,100원', '2023-02-13 02:15:40', 'https://www.musinsa.com/app/goods/659554', 'cyctjdghks1'),
	(266, 'https://image.msscdn.net/images/goods_img/20181010/876284/876284_18_125.jpg', '[블랙]SET B-스테디 하프 폴라넥', '29,900원', '2023-02-13 02:15:41', 'https://www.musinsa.com/app/goods/876284', 'cyctjdghks1'),
	(267, 'https://image.msscdn.net/images/goods_img/20181010/876284/876284_18_125.jpg', '[블랙]SET B-스테디 하프 폴라넥', '29,900원', '2023-02-13 02:38:48', 'https://www.musinsa.com/app/goods/876284', 'cyctjdghks1'),
	(268, 'https://image.msscdn.net/images/goods_img/20171025/659554/659554_6_125.jpg', '[세트] 하프 폴라 니트 티셔츠', '35,100원', '2023-02-13 02:38:50', 'https://www.musinsa.com/app/goods/659554', 'cyctjdghks1'),
	(419, 'https://image.msscdn.net/images/goods_img/20170823/607298/607298_1_125.jpg', '375 웰던 더비 구두 루시블랙', '53,600원', '2023-02-13 04:27:23', 'https://www.musinsa.com/app/goods/607298', 'dongdong'),
	(421, 'https://image.msscdn.net/images/goods_img/20190910/1149328/1149328_16760172322551_125.jpg', '테이퍼드 히든 밴딩 크롭 슬랙스 [블랙]', '33,890원', '2023-02-13 04:28:58', 'https://www.musinsa.com/app/goods/1149328', 'dongdong'),
	(422, 'https://image.msscdn.net/images/goods_img/20210826/2092852/2092852_16758409508899_125.jpg', '[기모선택] 이지 와이드 데님 팬츠 그레이', '42,000원', '2023-02-13 04:34:17', 'https://www.musinsa.com/app/goods/2092852', 'seojeong4560'),
	(423, 'https://image.msscdn.net/images/goods_img/20210826/2092849/2092849_16758410350611_125.jpg', '[기모선택] 이지 와이드 데님 팬츠 블랙', '42,000원', '2023-02-13 04:34:18', 'https://www.musinsa.com/app/goods/2092849', 'seojeong4560'),
	(424, 'https://image.msscdn.net/images/goods_img/20211117/2238440/2238440_1_125.jpg', '[22F/W 리뉴얼] 오버사이즈 멜톤 더플 롱 코트 네이비...', '46,500원', '2023-02-13 04:34:23', 'https://www.musinsa.com/app/goods/2238440', 'seojeong4560'),
	(425, 'https://image.msscdn.net/images/goods_img/20190710/1092992/1092992_1_125.jpg', 'OORIGINAL BLACK - 조리 블랙', '69,000원', '2023-02-13 04:34:25', 'https://www.musinsa.com/app/goods/1092992', 'seojeong4560'),
	(426, 'https://product-image.wconcept.co.kr/productimg/image/img1/86/302271586_LG13733.jpg', '블루 스트라이프 면 긴팔셔츠 (SIBL3E010B2)', '258,000', '2023-02-13 04:40:22', 'https://www.wconcept.co.kr/Product/302271586', 'abciiiiiiiicba'),
	(427, 'https://product-image.wconcept.co.kr/productimg/image/img1/63/302275663_GH12673.jpg', '[남성] 패턴드 포플린 숏 슬리브 셔츠 5113120012051', '65,550', '2023-02-13 04:40:24', 'https://www.wconcept.co.kr/Product/302275663', 'abciiiiiiiicba'),
	(428, 'https://product-image.wconcept.co.kr/productimg/image/img1/63/302275663_GH12673.jpg', '[남성] 패턴드 포플린 숏 슬리브 셔츠 5113120012051', '65,550', '2023-02-13 04:40:25', 'https://www.wconcept.co.kr/Product/302275663', 'abciiiiiiiicba'),
	(429, 'https://product-image.wconcept.co.kr/productimg/image/img1/63/302275663_GH12673.jpg', '[남성] 패턴드 포플린 숏 슬리브 셔츠 5113120012051', '65,550', '2023-02-13 04:40:25', 'https://www.wconcept.co.kr/Product/302275663', 'abciiiiiiiicba'),
	(430, 'https://product-image.wconcept.co.kr/productimg/image/img1/36/302275536_MJ20646.jpg', '[여성] 코튼 린넨 이지 셔츠 5123120010001', '84,550', '2023-02-13 04:40:26', 'https://www.wconcept.co.kr/Product/302275536', 'abciiiiiiiicba'),
	(431, 'https://product-image.wconcept.co.kr/productimg/image/img1/36/302275536_MJ20646.jpg', '[여성] 코튼 린넨 이지 셔츠 5123120010001', '84,550', '2023-02-13 04:40:26', 'https://www.wconcept.co.kr/Product/302275536', 'abciiiiiiiicba'),
	(432, 'https://product-image.wconcept.co.kr/productimg/image/img1/75/302273575_DI36153.jpg', 'symbol oxford shirt_white', '107,100', '2023-02-13 04:40:27', 'https://www.wconcept.co.kr/Product/302273575', 'abciiiiiiiicba'),
	(433, 'https://product-image.wconcept.co.kr/productimg/image/img1/65/302273565_RI25338.jpg', 'symbol oxford shirt_stripe blue', '107,100', '2023-02-13 04:40:28', 'https://www.wconcept.co.kr/Product/302273565', 'abciiiiiiiicba'),
	(434, 'https://product-image.wconcept.co.kr/productimg/image/img1/63/302275663_GH12673.jpg', '[남성] 패턴드 포플린 숏 슬리브 셔츠 5113120012051', '65,550', '2023-02-13 04:40:34', 'https://www.wconcept.co.kr/Product/302275663', 'abciiiiiiiicba'),
	(435, 'https://product-image.wconcept.co.kr/productimg/image/img1/36/302275536_MJ20646.jpg', '[여성] 코튼 린넨 이지 셔츠 5123120010001', '84,550', '2023-02-13 04:40:38', 'https://www.wconcept.co.kr/Product/302275536', 'abciiiiiiiicba'),
	(436, 'https://product-image.wconcept.co.kr/productimg/image/img1/75/302273575_DI36153.jpg', 'symbol oxford shirt_white', '107,100', '2023-02-13 04:52:08', 'https://www.wconcept.co.kr/Product/302273575', 'abciiiiiiiicba'),
	(437, 'https://product-image.wconcept.co.kr/productimg/image/img1/75/302273875_JS12016.jpg', 'striped knit jacket_spring blue', '116,100', '2023-02-13 04:52:13', 'https://www.wconcept.co.kr/Product/302273875', 'abciiiiiiiicba'),
	(438, 'https://product-image.wconcept.co.kr/productimg/image/img1/20/302273820_MN58918.jpg', 'striped knit jacket_navy', '116,100', '2023-02-13 04:52:14', 'https://www.wconcept.co.kr/Product/302273820', 'abciiiiiiiicba'),
	(439, 'https://product-image.wconcept.co.kr/productimg/image/img1/39/302273639_PJ18541.jpg', 'symbol half zip-up crop cable knit_cream', '98,100', '2023-02-13 04:52:15', 'https://www.wconcept.co.kr/Product/302273639', 'abciiiiiiiicba'),
	(440, 'https://product-image.wconcept.co.kr/productimg/image/img1/46/302273646_WC65764.jpg', 'symbol half zip-up crop cable knit_spring blue', '98,100', '2023-02-13 04:52:16', 'https://www.wconcept.co.kr/Product/302273646', 'abciiiiiiiicba'),
	(441, 'https://product-image.wconcept.co.kr/productimg/image/img1/82/302273882_BB54843.jpg', 'striped knit jacket_red', '116,100', '2023-02-13 04:52:18', 'https://www.wconcept.co.kr/Product/302273882', 'abciiiiiiiicba'),
	(442, 'https://product-image.wconcept.co.kr/productimg/image/img1/55/302272755_GG38240.jpg', '스퀘어 제트 플립플랍 옐로우(YELLOW)', '52,000', '2023-02-13 04:52:22', 'https://www.wconcept.co.kr/Product/302272755', 'abciiiiiiiicba'),
	(443, 'https://product-image.wconcept.co.kr/productimg/image/img1/48/302272748_GK13246.jpg', '스퀘어 제트 플립플랍 라벤더(LAVENDER)', '52,000', '2023-02-13 04:52:24', 'https://www.wconcept.co.kr/Product/302272748', 'abciiiiiiiicba'),
	(444, 'https://product-image.wconcept.co.kr/productimg/image/img1/56/302272756_IG18370.jpg', '스퀘어 제트 플립플랍 민트(MINT)', '52,000', '2023-02-13 04:52:26', 'https://www.wconcept.co.kr/Product/302272756', 'abciiiiiiiicba'),
	(445, 'https://product-image.wconcept.co.kr/productimg/image/img1/59/302272759_IL91824.jpg', '스퀘어 제트 플립플랍 라이트 그레이(LIGHT GRAY)', '52,000', '2023-02-13 04:52:28', 'https://www.wconcept.co.kr/Product/302272759', 'abciiiiiiiicba'),
	(446, 'https://product-image.wconcept.co.kr/productimg/image/img1/68/302272768_GG19688.jpg', '스퀘어 엑스 플립플랍 민트(MINT)', '52,000', '2023-02-13 04:52:30', 'https://www.wconcept.co.kr/Product/302272768', 'abciiiiiiiicba'),
	(447, 'https://product-image.wconcept.co.kr/productimg/image/img1/36/302275936_CW66705.jpg', 'NiRO DAiSY BRACELET #83', '15,000', '2023-02-13 04:52:37', 'https://www.wconcept.co.kr/Product/302275936', 'abciiiiiiiicba'),
	(448, 'https://product-image.wconcept.co.kr/productimg/image/img1/74/302275774_IG20949.jpg', '쇼트 비즈 네크리스 실버 컬러/행성 1163663001', '12,900', '2023-02-13 04:52:38', 'https://www.wconcept.co.kr/Product/302275774', 'abciiiiiiiicba'),
	(449, 'https://product-image.wconcept.co.kr/productimg/image/img1/71/302275771_HN59351.jpg', '버터플라이 디테일 링 골드 컬러/나비 1163450001', '7,900', '2023-02-13 04:52:40', 'https://www.wconcept.co.kr/Product/302275771', 'abciiiiiiiicba'),
	(450, 'https://product-image.wconcept.co.kr/productimg/image/img1/65/302275765_GO64683.jpg', '링 5피스 세트 골드 컬러 1168405001', '7,900', '2023-02-13 04:52:42', 'https://www.wconcept.co.kr/Product/302275765', 'abciiiiiiiicba'),
	(451, 'https://product-image.wconcept.co.kr/productimg/image/img1/18/302270318_UJ81393.jpg', 'Melting heart mini necklace (925 silver)', '55,800', '2023-02-13 04:52:48', 'https://www.wconcept.co.kr/Product/302270318', 'abciiiiiiiicba'),
	(452, 'https://product-image.wconcept.co.kr/productimg/image/img1/67/302265167_QT44895.jpg', '14k gold 빅 이니셜 펜던트(A~Z)', '70,000', '2023-02-13 04:52:53', 'https://www.wconcept.co.kr/Product/302265167', 'abciiiiiiiicba'),
	(453, 'https://product-image.wconcept.co.kr/productimg/image/img1/17/302270517_CE84363.jpg', '14k gold 앙스 미니 클립 체인 목걸이', '170,000', '2023-02-13 04:52:58', 'https://www.wconcept.co.kr/Product/302270517', 'abciiiiiiiicba'),
	(454, 'https://product-image.wconcept.co.kr/productimg/image/img1/39/302263339_KX84682.jpg', '톨로스 클래식 이어링 3, 스몰 모델 14K 옐로우 골드', '1,390,000', '2023-02-13 04:53:00', 'https://www.wconcept.co.kr/Product/302263339', 'abciiiiiiiicba'),
	(455, 'https://product-image.wconcept.co.kr/productimg/image/img1/42/302263342_OO62602.jpg', '톨로스 클래식 이어링 3, 스몰 모델 (14K 로즈 골드)', '1,390,000', '2023-02-13 04:53:02', 'https://www.wconcept.co.kr/Product/302263342', 'abciiiiiiiicba'),
	(456, 'https://image.msscdn.net/images/goods_img/20210928/2149254/2149254_1_125.jpg', '베이식 긴팔 티셔츠 2팩', '37,800원', '2023-02-13 05:38:36', 'https://www.musinsa.com/app/goods/2149254', 'cyctjdghks1'),
	(457, 'https://image.msscdn.net/images/goods_img/20190910/1149328/1149328_16760172322551_125.jpg', '테이퍼드 히든 밴딩 크롭 슬랙스 [블랙]', '33,890원', '2023-02-13 05:38:39', 'https://www.musinsa.com/app/goods/1149328', 'cyctjdghks1'),
	(461, 'https://image.msscdn.net/images/goods_img/20220125/2326935/2326935_11_125.jpg', '(23SS) 2 TONE ARCH HOODIE GRAY', '63,200원', '2023-02-13 05:52:58', 'https://www.musinsa.com/app/goods/2326935', '12345'),
	(462, 'https://image.msscdn.net/images/goods_img/20200922/1615829/1615829_1_125.jpg', '로그 오버핏 기모 후드 그레이 YHHD2302', '34,900원', '2023-02-13 05:53:01', 'https://www.musinsa.com/app/goods/1615829', '12345'),
	(463, 'https://image.msscdn.net/images/goods_img/20181012/879625/879625_3_125.jpg', '캐시미어 블렌드 오버사이즈 더블 코트 [블랙]', '132,890원', '2023-02-13 05:53:09', 'https://www.musinsa.com/app/goods/879625', '12345'),
	(465, 'https://image.msscdn.net/images/goods_img/20200402/1382658/1382658_7_125.jpg', '레이어드 크루 넥 반팔 티셔츠_긴 기장 [화이트]', '16,900원', '2023-02-13 06:29:33', 'https://www.musinsa.com/app/goods/1382658', 'jhp1276'),
	(466, 'https://image.msscdn.net/images/goods_img/20170823/607298/607298_1_125.jpg', '375 웰던 더비 구두 루시블랙', '53,600원', '2023-02-13 06:29:48', 'https://www.musinsa.com/app/goods/607298', 'jhp1276'),
	(467, 'https://image.msscdn.net/images/goods_img/20200821/1558847/1558847_13_125.jpg', '[리뉴얼] 하프 터틀넥 니트 세트', '39,900원', '2023-02-13 06:29:53', 'https://www.musinsa.com/app/goods/1558847', 'jhp1276'),
	(469, 'https://image.msscdn.net/images/goods_img/20211230/2286964/2286964_16734887369646_125.jpg', '오버핏 크롭 카라 가디건 [블랙]', '77,300원', '2023-02-13 06:30:17', 'https://www.musinsa.com/app/goods/2286964', 'jhp1276'),
	(470, 'https://image.msscdn.net/images/goods_img/20221013/2861160/2861160_2_125.png', '데일리 코듀로이 밴딩 팬츠 - 4 COLOR', '48,100원', '2023-02-13 06:30:56', 'https://www.musinsa.com/app/goods/2861160', 'jhp1276'),
	(471, 'https://image.msscdn.net/images/goods_img/20220125/2326935/2326935_11_125.jpg', '(23SS) 2 TONE ARCH HOODIE GRAY', '63,200원', '2023-02-13 07:18:03', 'https://www.musinsa.com/app/goods/2326935', 'dongdong'),
	(472, 'https://image.msscdn.net/images/goods_img/20210111/1742661/1742661_5_125.jpg', '(23SS) 2 TONE ARCH HOODIE BLACK', '63,200원', '2023-02-13 07:18:07', 'https://www.musinsa.com/app/goods/1742661', 'dongdong');
/*!40000 ALTER TABLE `item` ENABLE KEYS */;

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

-- 테이블 데이터 stylewithus.meeting:~1 rows (대략적) 내보내기
/*!40000 ALTER TABLE `meeting` DISABLE KEYS */;
INSERT IGNORE INTO `meeting` (`session_id`, `meeting_register_time`, `number_of_people`, `consultant_id`) VALUES
	('ses_Ku7qosK6AS', '2023-02-13 07:34:21', 1, 'abciiiiiiiicba');
/*!40000 ALTER TABLE `meeting` ENABLE KEYS */;

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
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 stylewithus.review:~37 rows (대략적) 내보내기
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT IGNORE INTO `review` (`review_no`, `review_content`, `review_register_time`, `review_score`, `consultant_id`, `user_id`) VALUES
	(23, 'aaaa', '2023-02-08 02:07:00', 0.5, 'bingbang', 'bingbang'),
	(28, 'ㅎㅇㅎㅇ', '2023-02-09 01:42:48', 0.1, 'bingbang', 'seojeong4560'),
	(30, 'fdf', '2023-02-09 04:57:19', 0.1, 'cyctjdghks', 'seojeong45'),
	(34, 'fffff', '2023-02-09 11:12:31', 0.4, 'seojeong4560', 'seojeong4560'),
	(45, '', '2023-02-10 00:32:09', 5, 'cyctjdghks', 'dongdong'),
	(47, '3점3점3점3점3점3점3점3점3점3점3점3점3점3점3점3점3점3점3점3점', '2023-02-10 00:37:05', 5, 'seojeong4560', 'bingbang'),
	(48, 'xc', '2023-02-10 00:37:58', 5, 'cyctjdghks', 'dongdong'),
	(49, 'dd', '2023-02-10 00:39:29', 5, 'cyctjdghks', 'dongdong'),
	(50, 'zz', '2023-02-10 00:39:41', 5, 'cyctjdghks', 'dongdong'),
	(51, 'dd', '2023-02-10 00:39:49', 5, 'cyctjdghks', 'dongdong'),
	(52, 'ee', '2023-02-10 00:48:25', 5, 'cyctjdghks', 'dongdong'),
	(53, '완벽한 컨설턴트', '2023-02-10 01:02:42', 2, 'seojeong4560', 'seojeong4560'),
	(59, '11', '2023-02-10 01:23:12', 5, 'bingbang', 'abciiiiiiiicba'),
	(64, '2점', '2023-02-10 01:31:31', 2, 'abciiiiiiiicba', 'bingbang'),
	(65, '1점', '2023-02-10 01:31:39', 1, 'abciiiiiiiicba', 'bingbang'),
	(66, '4점4점4점!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', '2023-02-10 01:31:57', 4, 'abciiiiiiiicba', 'bingbang'),
	(68, '리뷰가 다시 왜 안됨?', '2023-02-10 01:39:22', 4, 'abciiiiiiiicba', 'bingbang'),
	(82, '화면이 안나와요', '2023-02-10 02:27:54', 5, 'eaea7314', 'bingbang'),
	(83, '4점따리 4점', '2023-02-10 02:28:24', 4, 'abciiiiiiiicba', 'bingbang'),
	(84, 'ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅂㅈㄴㅇㅊㅍㄹㄴㅇㄹ', '2023-02-10 02:29:20', 4, 'abciiiiiiiicba', 'bingbang'),
	(86, '연결이 안돼요', '2023-02-10 03:13:05', 1, 'abciiiiiiiicba', 'jhp1276'),
	(88, 'ㅂㅂㅂㅂㅂ', '2023-02-10 04:24:49', 3, 'abciiiiiiiicba', 'bingbang'),
	(89, 'goooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooood', '2023-02-10 04:36:07', 5, 'seojeong4560', 'seojeong4560'),
	(90, 'ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ', '2023-02-10 04:48:04', 1, 'seojeong4560', 'seojeong4560'),
	(91, 'dd', '2023-02-10 05:08:29', 3, 'eaea7314', 'cyctjdghks1'),
	(92, 'sp', '2023-02-10 07:30:22', 5, 'eaea7314', 'cyctjdghks1'),
	(93, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '2023-02-12 20:01:51', 5, 'abciiiiiiiicba', 'abciiiiiiiicba'),
	(94, 'dd', '2023-02-13 00:01:18', 3, 'abciiiiiiiicba', 'dongdong'),
	(95, '', '2023-02-13 00:09:08', 3, 'eaea7314', 'bingbang'),
	(96, 'ㅜㅜ', '2023-02-13 00:10:17', 1, 'consultant01', 'seojeong4560'),
	(97, 'ㅎㅇ', '2023-02-13 00:10:55', 3, 'eaea7314', 'seojeong4560'),
	(98, '', '2023-02-13 00:11:07', 3, 'eaea7314', 'seojeong4560'),
	(99, 'saddas', '2023-02-13 00:24:51', 5, 'consultant01', 'jhp1276'),
	(100, 'dasd', '2023-02-13 00:31:24', 3, 'eaea7314', 'dongdong'),
	(101, 'xasxas', '2023-02-13 01:12:16', 3, 'eaea7314', 'dongdong'),
	(102, 'ㅋ', '2023-02-13 06:30:24', 4, 'abciiiiiiiicba', 'jhp1276'),
	(103, '어후ㅠ', '2023-02-13 07:22:44', 1, 'abciiiiiiiicba', 'dongdong');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;

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

-- 테이블 데이터 stylewithus.user:~12 rows (대략적) 내보내기
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT IGNORE INTO `user` (`user_id`, `user_chest`, `user_email`, `user_foot`, `user_gender`, `user_height`, `user_hem`, `user_hip`, `user_name`, `user_nickname`, `user_pw`, `user_register_time`, `user_shoulder`, `user_sleeve`, `user_thigh`, `user_waist`) VALUES
	('12345', 56, 'cahelej131@otanhome.com', 120, 1, 70, 25, 63, '박짜이훙', 'parkpark', '$2a$10$Ub3p9feRSTBcWEWioCUKLeBJT3vLP5N3X4CbfUn5jAftfuy86cYba', '2023-02-13 05:50:58', 52, 61, 31, 39),
	('abciiiiiiiicba', NULL, 'abciiiiiiiicba@gmail.com', NULL, 0, NULL, NULL, NULL, '유저', 'userabciiiiiiiicba', '$2a$10$yViZ2J8RSC0ctFsD1z/7IeGw94Fw2HzvBhR.AGD44PUDLwlrPmPFq', '2023-02-07 05:59:42', NULL, NULL, NULL, NULL),
	('bingbang', 61, 'byoung1997s4@gmail.com', 270, 1, 165, 24, 59, '이병수', 'bingbang', '$2a$10$KHeB7vpTdCwRVDHD5d/F/eMl3MmT5ztR/GhBrdV0sbPrNTpqCmHRW', '2023-02-07 05:27:24', 55, 58, 34, 36),
	('bingbang2', NULL, 'tmfdhddl2006@naver.com', NULL, 1, NULL, NULL, NULL, '이병수', 'bingbang2', '$2a$10$AJVZMRv9uwQ7tO0Ga8A2ueMlsGAv3oS6Un6PwoTBHsC7oaLvikriC', '2023-02-13 03:51:30', NULL, NULL, NULL, NULL),
	('cyctjdghks1', 61, 'cyctjdghks@naver.com', 260, 1, 168, 24, 61, '박성환', 'UserSeongHwan', '$2a$10$istQSLVq11GuN981fcy6Mu/FERkFSo78kzohX6c9zOHihDG2HKaSK', '2023-02-07 08:26:56', 56, 60, 35, 36),
	('dongdong', 59, 'eaea7314@naver.com', 265, 1, 173, 23, 59, '이동엽', 'dongdong', '$2a$10$flDQTTYjfSn0tCM6tnITmeGB6ycIE4vsFKE0kguASOY5EwuwLBg5.', '2023-02-07 06:10:36', 56, 60, 34, 34),
	('dongyeop', 63, 'eaea7314@gmail.com', 270, 0, 181, 25, 61, 'ㅜㅡ퓸ㄴㄹ이ㅠㅣㅏ', 'dongyeop', '$2a$10$kR/bDIhTCFgIO1rbC.il8uYFUTU46mVP6NJA4lGcglA62ZEknlNG2', '2023-02-10 00:49:17', 56, 61, 35, 39),
	('jhp1276', 61, 'jhp1276@naver.com', 260, 1, 173, 24, 61, '박재현', 'FireFist', '$2a$10$StHuJv/wLEKt2SrDcZuPi.8Xc7sA6TwYNli5UXyT.eEBZcqvpnzza', '2023-02-08 05:44:57', 56, 60, 35, 36),
	('jook1356', NULL, 'jook1356@gmail.com', NULL, 1, NULL, NULL, NULL, '김땡땡', 'meyo', '$2a$10$1FgshM9hl2EP5LRwB36X2OeuvGwgkYJA2Ttrw0K9llFGWcXeEhoky', '2023-02-09 03:58:22', NULL, NULL, NULL, NULL),
	('seojeong45', 61, 'seojeong4@naver.com', 280, 1, 180, 24, 61, '양서정', 'yyyyyyyyyyyyyy', '$2a$10$Ln5ugOzfoK3S6ZhWH3SnjetCLU7qyZJeY0sMvpbbucjzNrZhiiJzS', '2023-02-09 00:56:24', 56, 60, 35, 36),
	('seojeong4560', 65, 'seojeong4560@daum.net', 290, 0, 180, 26, 57, '양서정', 'yangyang', '$2a$10$oMfKk2Wbo2E1nBKQQLZobODZxQJcUoftKepWOqzSnpniZ3rg6Fcgu', '2023-02-08 07:39:02', 63, 60, 34, 39),
	('user01', 0, 'sample@sample.com', 0, 0, 0, 0, 0, '김유저', 'userNickname', '$2a$10$h7.TLf9W9dppKWT9YAAcdu2ikpGKnnNeCemOA/zenK.CAfe2p9itC', '2023-02-12 13:02:55', 0, 0, 0, 0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
