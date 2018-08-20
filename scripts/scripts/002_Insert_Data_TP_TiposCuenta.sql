---------------------------------------
-- INSERT EN TABLA TIPOS DE CUENTAS  -- 
---------------------------------------

USE `TravelPlanner`;

INSERT INTO TP_P_TIPOS_CUENTA (nombre, descripcion, habilitado, eliminado, creacion) VALUES ('Free', 'Usuario con cuenta gratuita', TRUE, FALSE, SYSDATE());
INSERT INTO TP_P_TIPOS_CUENTA (nombre, descripcion, habilitado, eliminado, creacion) VALUES ('Premium', 'Usuario con cuenta premium', TRUE, FALSE, SYSDATE());

COMMIT;