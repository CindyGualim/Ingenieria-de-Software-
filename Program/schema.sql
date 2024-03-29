CREATE TABLE IF NOT EXISTS user (
    id INT PRIMARY KEY NOT NULL,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS employee(
    id INT NOT NULL,
    canCheckoutReports INT NOT NULL,
    canEliminateUsers INT NOT NULL
);

CREATE TABLE IF NOT EXISTS student(
    id INT NOT NULL,
    id_career INT NOT NULL,
    is_tutor INT NOT NULL 
);

CREATE TABLE IF NOT EXISTS chat(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    chat_name VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS messages(
    id_message INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    content TEXT,
    id_user INT NOT NULL,
    time_sent TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tag(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    tagname VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS course(
    course_code INT AUTO_INCREMENT PRIMARY KEY NOT NULL, -- ID of the course
    namecourse VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS hoursdisponibility(
    hournumber TIME NOT NULL, -- insert time in hh:mm:ss format
    day_week INT NOT NULL, -- this has to be number 1-monday, 2-tuesday, 3-wednesday, 4-thursday, 5-friday, 6-saturday, 7-sunday
    studentID INT NOT NULL,
    CONSTRAINT hour_limit CHECK (hournumber >= '00:00:00' AND hournumber <= '23:59:59'),
    CONSTRAINT day_week_limit CHECK (day_week >= 0 AND day_week <= 7)
);

CREATE TABLE IF NOT EXISTS report(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    comment TEXT NOT NULL,
    id_session INT NOT NULL
);

CREATE TABLE IF NOT EXISTS ausentReport(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    comment TEXT NOT NULL,
    id_sender INT NOT NULL,
    id_ausentparty INT NOT NULL,
    id_session INT NOT NULL
);

CREATE TABLE IF NOT EXISTS sessionPlanned(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    id_tutor INT NOT NULL,
    tutorNotes TEXT,
    course_code INT,
    dated date NOT NULL, -- format 'YY-MM-DD'
    start_hour TIME NOT NULL,
    end_hour TIME NOT NULL, -- check to end hour to not be less than start hour
    mode VARCHAR(50) NOT NULL, -- can be either VIRTUAL, PRESENCIAL, AMBOS
    CONSTRAINT CHK_hour CHECK (end_hour > start_hour)
);

CREATE TABLE IF NOT EXISTS comment(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    rating INT NOT NULL,
    commentContent TEXT,
    id_sender INT NOT NULL,
    id_receiver INT NOT NULL,
    CONSTRAINT CHK_rating CHECK (rating <= 5 AND rating >=0)
);


-- Relation tables

CREATE TABLE IF NOT EXISTS specialtyTutor(
    id_tutor INT NOT NULL,
    course_code INT NOT NULL
);

CREATE TABLE IF NOT EXISTS chat_messages(
    id_chat INT NOT NULL,
    id_message INT NOT NULL
);

CREATE TABLE IF NOT EXISTS chat_integrants(
    id_chat INT NOT NULL,
    id_integrant INT NOT NULL -- this can be any student being either tutor or not
);

CREATE TABLE IF NOT EXISTS tutor_student(
    id_tutor INT NOT NULL,
    id_student INT NOT NULL 
);

CREATE TABLE IF NOT EXISTS students_Session(
    id_session INT NOT NULL,
    id_student INT NOT NULL
);

CREATE TABLE IF NOT EXISTS tagComment(
    id_tag INT NOT NULL,
    id_comment INT NOT NULL
);

-- CONSTRAINTS
ALTER TABLE employee ADD CONSTRAINT fk_employee_user_id FOREIGN KEY (id) REFERENCES user(id);

ALTER TABLE student ADD CONSTRAINT fk_student_user_id FOREIGN KEY (id) REFERENCES user(id);

ALTER TABLE messages ADD CONSTRAINT fk_sender_user_id FOREIGN KEY (id_user) REFERENCES user(id);

ALTER TABLE hoursdisponibility ADD CONSTRAINT fk_disponibility_user_id FOREIGN KEY (studentID) REFERENCES user(id);

ALTER TABLE report ADD CONSTRAINT fk_sessionID_report FOREIGN KEY (id_session) REFERENCES sessionPlanned(id);

ALTER TABLE ausentReport ADD CONSTRAINT fk_sessionID_ausentreport FOREIGN KEY (id_session) REFERENCES sessionPlanned(id);
ALTER TABLE ausentReport ADD CONSTRAINT fk_sender_ausentreport FOREIGN KEY (id_sender) REFERENCES user(id);
ALTER TABLE ausentReport ADD CONSTRAINT fk_ausentparty_ausentreport FOREIGN KEY (id_ausentparty) REFERENCES user(id);

ALTER TABLE sessionPlanned ADD CONSTRAINT fk_session_tutor FOREIGN KEY (id_tutor) REFERENCES user(id);
ALTER TABLE sessionPlanned ADD CONSTRAINT fk_session_coursetheme FOREIGN KEY (course_code) REFERENCES course(course_code);

ALTER TABLE comment ADD CONSTRAINT fk_comment_senderID FOREIGN KEY (id_sender) REFERENCES user(id);

--m Relation tables constraints

ALTER TABLE specialtyTutor ADD CONSTRAINT fk_specialty_userID FOREIGN KEY (id_tutor) REFERENCES user(id);
ALTER TABLE specialtyTutor ADD CONSTRAINT fk_specialty_course FOREIGN KEY (course_code) REFERENCES course(course_code);

ALTER TABLE chat_messages ADD CONSTRAINT fk_chatid FOREIGN KEY (id_chat) REFERENCES chat(id);
ALTER TABLE chat_messages ADD CONSTRAINT fk_message_id FOREIGN KEY (id_message) REFERENCES messages(id_message);

ALTER TABLE chat_integrants ADD CONSTRAINT fk_chat_id_integrant FOREIGN KEY (id_chat) REFERENCES chat(id);
ALTER TABLE chat_integrants ADD CONSTRAINT fk_user_id_integrant FOREIGN KEY (id_integrant) REFERENCES user(id);

ALTER TABLE tutor_student ADD CONSTRAINT fk_tutor_id FOREIGN KEY (id_tutor) REFERENCES user(id);
ALTER TABLE tutor_student ADD CONSTRAINT fk_student_id FOREIGN KEY (id_student) REFERENCES user(id);

ALTER TABLE students_Session ADD CONSTRAINT fk_session_id FOREIGN KEY (id_session) REFERENCES sessionPlanned(id);
ALTER TABLE tutor_student ADD CONSTRAINT fk_student_id_session FOREIGN KEY (id_student) REFERENCES user(id);

ALTER TABLE tagComment ADD CONSTRAINT fk_tag_id FOREIGN KEY (id_tag) REFERENCES tag(id);
ALTER TABLE tagComment ADD CONSTRAINT fk_comment_id FOREIGN KEY (id_comment) REFERENCES comment(id);