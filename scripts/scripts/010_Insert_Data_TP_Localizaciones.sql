---------------------------------------------
--     INSERT EN TABLA LOCALIZACIONES      -- 
---------------------------------------------

USE `TravelPlanner`;

INSERT INTO TP_P_LOCALIZACIONES (id_ciudad, nombre, coordenadas, duracion, precio, habilitado, eliminado, creacion) VALUES ((SELECT id FROM TP_P_CIUDADES WHERE nombre = 'Sevilla'), 'La Giralda', 'X,Y,Z', 15, 5, TRUE, FALSE, SYSDATE());

COMMIT;