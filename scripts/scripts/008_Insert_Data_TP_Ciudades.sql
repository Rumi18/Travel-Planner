---------------------------------------
--     INSERT EN TABLA CIUDADES      -- 
---------------------------------------

USE `TravelPlanner`;

INSERT INTO TP_P_CIUDADES (id_pais, nombre, habilitado, eliminado, creacion) VALUES ((SELECT id FROM TP_P_PAISES WHERE nombre = 'España'),'Sevilla', TRUE, FALSE, SYSDATE());

COMMIT;