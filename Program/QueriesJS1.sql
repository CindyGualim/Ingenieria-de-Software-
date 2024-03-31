-- Todos los usuarios que son estudiantes
SELECT u.id, u.username, u.email 
FROM user u 
JOIN student s ON u.id = s.id;

-- Todos los mensajes de un chat especifico
SELECT m.content, m.time_sent 
FROM messages m 
JOIN chat_messages cm ON m.id_message = cm.id_message 
WHERE cm.id_chat = 2; -- Asume que quieres los mensajes del chat con id 1

-- Sesiones planificadas y su informacion de curso correspondiente
SELECT sp.id, c.namecourse, sp.dated, sp.start_hour, sp.end_hour, sp.mode 
FROM sessionPlanned sp 
JOIN course c ON sp.course_code = c.course_code;

-- Reportes de ausencia junto con la información del remitente y del ausente
SELECT ar.comment, ar.id_session, u1.username AS 'Sender', u2.username AS 'Absent Party' 
FROM ausentReport ar 
JOIN user u1 ON ar.id_sender = u1.id 
JOIN user u2 ON ar.id_ausentparty = u2.id;

-- Estudiantes y su disponibilidad
SELECT u.username, hd.hournumber, hd.day_week 
FROM hoursdisponibility hd 
JOIN user u ON hd.studentID = u.id;
