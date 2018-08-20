---------------------------------------
--      INSERT EN TABLA PAISES       -- 
---------------------------------------

USE `TravelPlanner`;

INSERT INTO TP_P_PAISES (nombre, habilitado, eliminado, creacion) VALUES ('España', TRUE, FALSE, SYSDATE());

COMMIT;