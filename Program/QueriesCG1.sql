 -- BUSCAR EMAIL 
 -- josep@uvg.edu.gt
 SELECT * FROM user WHERE email = '${email}'
 -- CREAR NUEVO USUARIO
 INSERT INTO user (id, username, email) VALUES (9 ,"Sara", "sag22485@uvg.edu.gt")
 -- ELIMINAR USUARIO
 Delete from user where ID = 9
 -- BORRAR CHATS CON USUARIO 
 DELETE FROM chat_integrants WHERE id_chat = 2
 -- VER SESIONES EN CURSO 
 SELECT * FROM sessionPlanned
      WHERE dated = CURDATE()
     AND start_hour <= CURTIME()
     AND end_hour >= CURTIME()
-- BORRAR SESION
DELETE FROM sessionPlanned WHERE dated = '${date}'     

