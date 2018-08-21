-----------------------------------------------------
--     INSERT EN TABLA LOCALIZACION_CATEGORIA      -- 
-----------------------------------------------------

USE `TravelPlanner`;

INSERT INTO TP_R_LOCALIZACION_CATEGORIA (id_localizacion, id_categoria) VALUES ((SELECT id FROM TP_P_LOCALIZACIONES WHERE nombre = 'La Giralda'),(SELECT id FROM TP_P_CATEGORIAS WHERE nombre = 'Cultura'));

COMMIT;