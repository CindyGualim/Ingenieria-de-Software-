// consultaUsuarios.js
import { createConnection } from 'mysql2/promise';
import { readFileSync } from 'fs'; // Necesario para leer archivos, como el certificado SSL
async function consultaUsuarios() {
    let conexion;
    try {
        // Configura tu conexión aquí con los datos proporcionados
        conexion = await createConnection({
            host: 'db-mysql-nyc3-74035-do-user-16199995-0.c.db.ondigitalocean.com',
            user: 'doadmin',
            password: '',
            database: 'defaultdb',
            port: 25060,
            ssl: {
                // DigitalOcean requiere SSL para conexiones a la base de datos
                // Reemplaza 'path/to/your/certificate.crt' con la ubicación de tu certificado CA de DigitalOcean
                ca: readFileSync('C:\\Users\\cindy_7sr6dyy\\Downloads\\ca-certificate.crt')

            }
        });
        // Realiza consulta SQL///
        ////const [result] = await conexion.execute(`INSERT INTO user (id, username, email, contraseña) VALUES (9 ,"Sara", "sag22485@uvg.edu.gt", "shnop878")` , //);
        
        //BUSCAR EMAIL
        //const email = 'josep@uvg.edu.gt';
        //const [usuarios] = await conexion.execute(`SELECT * FROM user WHERE email = '${email}'`);
        
        //CREAR NUEVO USUARIO
        //const [result] = await conexion.execute(`INSERT INTO user (id, username, email) VALUES (9 ,"Sara", "sag22485@uvg.edu.gt")`);
       
        //ELIMINAR USUARIO
        // const [result] = await conexion.execute(`Delete from user where ID = 9`); //elimina usuario segun id
       
       //BORRAR CHATS CON USUARIO 
       //const [usuarios] = await conexion.execute(`DELETE FROM chat_integrants WHERE id_chat = 2`);

       //VER SESIONES EN CURSO 
      // const [sesion] = await conexion.execute(`SELECT * FROM sessionPlanned
      // WHERE dated = CURDATE()
      // AND start_hour <= CURTIME()
       //AND end_hour >= CURTIME()`);

       //BORRAR SESION
       const date = `2024-04-01`;
       const [sesion] = await conexion.execute(`DELETE FROM sessionPlanned WHERE dated = '${date}'`);
       console.log(sesion);
        //console.log(usuarios);
    } catch (error) {
        console.error('Error al realizar la consulta:', error);
    } finally {
        // Cierra la conexión
        if (conexion) {
            await conexion.end();
        }
    }
}
consultaUsuarios();