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