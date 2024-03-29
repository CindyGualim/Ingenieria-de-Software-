CREATE TABLE IF NOT EXISTS user (
    id INT PRIMARY KEY NOT NULL,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
)

CREATE TABLE IF NOT EXISTS employee(
    id INT NOT NULL,
    canCheckoutReports INT NOT NULL,
    canEliminateUsers INT NOT NULL
)

CREATE TABLE IF NOT EXISTS student(
    id INT NOT NULL,
    id_career INT NOT NULL,
    is_tutor INT NOT NULL 
)

CREATE TABLE IF NOT EXISTS chat(
    id INT PRIMARY KEY NOT NULL,
    chat_name VARCHAR(100)
)

CREATE TABLE IF NOT EXISTS messages(
    id_message INT PRIMARY KEY NOT NULL,
    content TEXT,
    time_sent TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_user INT PRIMARY KEY NOT NULL
)

CREATE TABLE IF NOT EXISTS tag(
    id INT PRIMARY KEY NOT NULL,
    tagname VARCHAR(50) NOT NULL
)

CREATE TABLE IF NOT EXISTS course(
    course_code INT PRIMARY KEY NOT NULL, -- ID of the course
    namecourse VARCHAR(100) NOT NULL
)

CREATE TABLE IF NOT EXISTS hoursdisponibility(
    hournumber TIME NOT NULL, -- insert time in hh:mm:ss format
    studentID INT NOT NULL
)

CREATE TABLE IF NOT EXISTS report(
    id INT PRIMARY KEY NOT NULL,
    comment TEXT NOT NULL,
    id_session INT NOT NULL
)

CREATE TABLE IF NOT EXISTS ausentReport(
    id INT PRIMARY KEY NOT NULL,
    comment TEXT NOT NULL,
    id_sender INT NOT NULL,
    id_ausentparty INT NOT NULL,
    id_session INT NOT NULL
)

CREATE TABLE IF NOT EXISTS sessionPlanned(
    id INT PRIMARY KEY NOT NULL,
    id_tutor INT NOT NULL,
    tutorNotes TEXT,
    course_code INT,
    dated date NOT NULL,
    start_hour TIME NOT NULL,
    end_hour TIME NOT NULL, --check to end hour to not be less than start hour
    mode VARCHAR(50) NOT NULL, -- can be either VIRTUAL, PRESENCIAL, MIXED
    CONSTRAINT CHK_hour CHECK (end_hour > start_hour)
)

CREATE TABLE IF NOT EXISTS comment(
    id INT PRIMARY KEY NOT NULL,
    rating INT NOT NULL,
    commentContent TEXT,
    id_sender INT NOT NULL,
    id_receiver INT NOT NULL,
    CONSTRAINT CHK_rating CHECK (rating <= 5 AND rating >=0)
)
-- Relation tables

CREATE TABLE IF NOT EXISTS specialtyTutor(
    id_tutor INT NOT NULL,
    course_code INT NOT NULL
)

CREATE TABLE IF NOT EXISTS chat_messages(
    id_chat INT NOT NULL,
    id_message INT NOT NULL
)

CREATE TABLE IF NOT EXISTS chat_integrants(
    id_chat INT NOT NULL,
    id_integrant INT NOT NULL -- this can be any student being either tutor or not
)

CREATE TABLE IF NOT EXISTS tutor_student(
    id_tutor INT NOT NULL,
    id_student INT NOT NULL 
)

CREATE TABLE IF NOT EXISTS studentInSession(
    id_session INT NOT NULL,
    id_student INT NOT NULL
)

CREATE TABLE IF NOT EXISTS tagComment(
    id_tag INT NOT NULL,
    id_comment INT NOT NULL
)

-- CONSTRAINTS