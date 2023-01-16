CREATE DATABASE if NOT exists stylewithus;

USE stylewithus;

DROP TABLE if EXISTS user;
DROP TABLE if EXISTS user_profile;
DROP TABLE if EXISTS consultant;
DROP TABLE if EXISTS review;

CREATE TABLE if NOT exists user (
	user_id VARCHAR(20),
	user_pw VARCHAR(30) NOT null,
	user_name VARCHAR(20) NOT null,
	user_nickname VARCHAR(20) UNIQUE NOT null,
	user_email VARCHAR(50) UNIQUE NOT null,
	user_gender INT,
	user_type INT,
	user_register_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(user_id)
	);
	
CREATE TABLE if NOT EXISTS user_profile(
	user_id VARCHAR(20) NOT NULL ,
	profile_height INT,
	profile_top INT,
	profile_botom INT,
	profile_foot INT,
	profile_pc INT,
	FOREIGN KEY(user_id) REFERENCES user(user_id),
	PRIMARY KEY(user_id)
	);		
	
	
CREATE TABLE if NOT EXISTS consultant (
	consultant_id VARCHAR(20),
	consultant_resume VARCHAR(1000),
	FOREIGN KEY(consultant_id) REFERENCES user(user_id),
	PRIMARY KEY(consultant_id)
	);
	
CREATE TABLE if NOT EXISTS review(
	review_no INT AUTO_INCREMENT,
	user_id VARCHAR(20),
	consultant_id VARCHAR(20),
	review_score INT,
	review_content VARCHAR(200),
	review_register_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY(user_id) REFERENCES user(user_id),
	FOREIGN KEY(consultant_id) REFERENCES consultant(consultant_id),
	PRIMARY KEY(review_no)
	);
	
SELECT * FROM user;

SELECT * FROM user_profile;

SELECT * FROM consultant;

SELECT * FROM review;




# INSERT INTO user (user_id, user_pw, user_name, user_nickname, user_email, user_gender, user_type)
# VALUES( 'id2가', 'pw', 'name', 'nickname2나', 'email2다', 1, 2);

# SELECT * FROM user;