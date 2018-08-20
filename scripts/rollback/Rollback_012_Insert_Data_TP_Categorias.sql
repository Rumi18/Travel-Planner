-----------------------------------------
--     INSERT EN TABLA CATEGORIAS      -- 
-----------------------------------------

USE `TravelPlanner`;

DELETE FROM TP_P_CATEGORIAS WHERE nombre = 'Naturaleza';
DELETE FROM TP_P_CATEGORIAS WHERE nombre = 'Cultura';
DELETE FROM TP_P_CATEGORIAS WHERE nombre = 'Ocio';
DELETE FROM TP_P_CATEGORIAS WHERE nombre = 'Infantil';

COMMIT;