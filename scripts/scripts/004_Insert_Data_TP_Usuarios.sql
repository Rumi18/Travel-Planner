-------------------------------
-- INSERT EN TABLA USUARIOS  -- 
-------------------------------

USE `TravelPlanner`;

INSERT INTO TP_D_USUARIOS (nombre, apellidos, email, user_name, user_passwd, id_tipocuenta, habilitado, eliminado, creacion) VALUES ('Miriam', 'Romero Sánchez', 'mirromsan@gmail.com', 'mirromsan', 'mirromsan', (SELECT id FROM TP_P_TIPOS_CUENTA WHERE nombre = 'Free'), TRUE, FALSE, SYSDATE());
INSERT INTO TP_D_USUARIOS (nombre, apellidos, email, user_name, user_passwd, id_tipocuenta, habilitado, eliminado, creacion) VALUES ('Rubén', 'Tavero Picón', 'rubtavpic@gmail.com', 'rubtavpic', 'rubtavpic', (SELECT id FROM TP_P_TIPOS_CUENTA WHERE nombre = 'Free'), TRUE, FALSE, SYSDATE());

COMMIT;