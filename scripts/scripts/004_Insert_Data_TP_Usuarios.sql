-------------------------------
-- INSERT EN TABLA USUARIOS  -- 
-------------------------------

USE `TravelPlanner`;

INSERT INTO TP_D_USUARIOS (nombre, apellidos, email, user_name, user_passwd, id_tipocuenta, habilitado, eliminado, creacion) VALUES ('Miriam', 'Romero Sánchez', 'mirromsan@gmail.com', 'mirromsan', '27429e8a8680e3a010fa5360d7a9dcde', (SELECT id FROM TP_P_TIPOS_CUENTA WHERE nombre = 'Free'), TRUE, FALSE, SYSDATE());
INSERT INTO TP_D_USUARIOS (nombre, apellidos, email, user_name, user_passwd, id_tipocuenta, habilitado, eliminado, creacion) VALUES ('Rubén', 'Tavero Picón', 'rubtavpic@gmail.com', 'rubtavpic', '2728717dfc5ff8df76bcae89d0ba2010', (SELECT id FROM TP_P_TIPOS_CUENTA WHERE nombre = 'Free'), TRUE, FALSE, SYSDATE());

COMMIT;