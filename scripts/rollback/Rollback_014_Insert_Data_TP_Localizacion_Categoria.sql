-----------------------------------------------------
--     INSERT EN TABLA LOCALIZACION_CATEGORIA      -- 
-----------------------------------------------------

USE `TravelPlanner`;

DELETE FROM TP_R_LOCALIZACION_CATEGORIA WHERE id_localizacion = (SELECT id FROM TP_P_LOCALIZACIONES WHERE nombre = 'La Giralda') AND id_categoria = (SELECT id FROM TP_P_CATEGORIAS WHERE nombre = 'Cultura');

COMMIT;