-----------------------------------------------------
--     INSERT EN TABLA PREFERENCIAS      -- 
-----------------------------------------------------

USE `TravelPlanner`;

DELETE FROM TP_P_PREFERENCIAS WHERE nombre = 'Naturaleza';
DELETE FROM TP_P_PREFERENCIAS WHERE nombre = 'Cultura';
COMMIT;