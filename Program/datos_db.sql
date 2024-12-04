-- Insertar usuarios
INSERT INTO user (id, username, email) VALUES (1, 'josep', 'josep@uvg.edu.gt');
INSERT INTO user (id, username, email) VALUES (2, 'mariaa', 'mariaa@uvg.edu.gt');
INSERT INTO user (id, username, email) VALUES (3, 'carlosm', 'carlosm@uvg.edu.gt');
INSERT INTO user (id, username, email) VALUES (4, 'anag', 'anag@uvg.edu.gt');
INSERT INTO user (id, username, email) VALUES (5, 'luisv', 'luisv@uvg.edu.gt');

-- Insertar empleados
INSERT INTO employee (id, canCheckoutReports, canEliminateUsers) VALUES (1, 1, 0);
INSERT INTO employee (id, canCheckoutReports, canEliminateUsers) VALUES (2, 1, 0);

-- Insertar estudiantes
INSERT INTO student (id, id_career, is_tutor) VALUES (3, 103, 0);
INSERT INTO student (id, id_career, is_tutor) VALUES (4, 104, 1);
INSERT INTO student (id, id_career, is_tutor) VALUES (5, 105, 0);

-- Insertar chats y mensajes
INSERT INTO chat (id, chat_name) VALUES (1, 'Grupo de estudio');
INSERT INTO chat (id, chat_name) VALUES (2, 'Tutores de matemática');

-- Cursos adicionales
INSERT INTO course (course_code, namecourse) VALUES 
(101, 'Matemáticas Básicas'), -- Asegúrate de que este curso exista si se va a referenciar
(102, 'Física I'),
(104, 'Programación I'), 
(105, 'Historia Universal'), 
(106, 'Diseño Gráfico');

-- Horas de disponibilidad adicionales (estudiantes: 3, 4, 5)
INSERT INTO hoursdisponibility (hournumber, day_week, studentID) VALUES 
('16:00:00', 2, 3), 
('09:00:00', 4, 4), 
('11:00:00', 1, 5),
('15:00:00', 3, 3), 
('10:00:00', 5, 4), 
('09:00:00', 2, 5);

-- Sesiones Planificadas adicionales (tutores: 3 y 4)
INSERT INTO sessionPlanned (id, id_tutor, course_code, dated, start_hour, end_hour, mode) VALUES 
(2, 3, 102, '2024-04-01', '14:00:00', '16:00:00', 'PRESENCIAL'), -- Asegúrate de que 102 exista en `course`
(3, 4, 104, '2024-04-02', '09:00:00', '11:00:00', 'VIRTUAL'), -- Asegúrate de que 104 exista en `course`
(4, 3, 105, '2024-04-03', '08:00:00', '10:00:00', 'AMBOS'); -- Asegúrate de que 105 exista en `course`

-- Reportes y Reportes de Ausencia adicionales
INSERT INTO report (id, comment, id_session) VALUES 
(2, 'Excelente participación.', 2),
(3, 'Debemos mejorar en la próxima sesión.', 3);

INSERT INTO ausentReport (id, comment, id_sender, id_ausentparty, id_session) VALUES 
(2, 'Estudiante enfermo, avisó con anticipación.', 3, 5, 2),
(3, 'Ausencia sin justificar.', 4, 3, 3);

-- Comentarios adicionales
INSERT INTO comment (id, rating, commentContent, id_sender, id_receiver) VALUES 
(2, 4, 'Buen tutor, pero la sesión fue algo rápida.', 5, 3),
(3, 5, 'Increíble sesión, muy interactiva.', 3, 4);

-- Tags adicionales
INSERT INTO tag (id, tagname) VALUES 
(1, 'Matemáticas'),
(2, 'Física'),
(3, 'Programación'), 
(4, 'Historia');

-- TagComment adicionales
INSERT INTO tagComment (id_tag, id_comment) VALUES 
(2, 2), 
(3, 3);

-- SpecialtyTutor adicionales
INSERT INTO specialtyTutor (id_tutor, course_code) VALUES 
(3, 102), 
(3, 105), 
(4, 106);

-- Chat Integrantes y Mensajes de Chat adicionales
INSERT INTO chat_integrants (id_chat, id_integrant) VALUES 
(2, 3), (2, 4), (2, 5);

-- Mensajes adicionales para los chats ya definidos
INSERT INTO messages (id_message, content, id_user) VALUES 
(1, '¡Bienvenidos al grupo de estudio!', 1),
(2, 'Por favor revisen el material antes de la sesión.', 3),
(3, 'Recuerden la entrega de mañana.', 4),
(4, '¿Alguien tiene dudas sobre el proyecto?', 5);

INSERT INTO chat_messages (id_chat, id_message) VALUES 
(1, 1), 
(2, 2);

-- Tutor Student Relations adicionales
INSERT INTO tutor_student (id_tutor, id_student) VALUES 
(3, 5), 
(4, 3);

-- Students Session Relations adicionales
INSERT INTO students_Session (id_session, id_student) VALUES 
(2, 5), (2, 4), 
(3, 3);
