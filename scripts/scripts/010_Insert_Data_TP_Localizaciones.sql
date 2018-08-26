---------------------------------------------
--     INSERT EN TABLA LOCALIZACIONES      -- 
---------------------------------------------

USE `TravelPlanner`;

INSERT INTO TP_P_LOCALIZACIONES (id_ciudad, nombre, latitud, longitud, duracion, precio, habilitado, eliminado, creacion) VALUES ((SELECT id FROM TP_P_CIUDADES WHERE nombre = 'Sevilla'), 'La Giralda', 'X', 'Y', 15, 5, TRUE, FALSE, SYSDATE());

COMMIT;