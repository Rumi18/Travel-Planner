-----------------------------------------
--     INSERT EN TABLA CATEGORIAS      -- 
-----------------------------------------

USE `TravelPlanner`;

INSERT INTO TP_P_CATEGORIAS (nombre, descripcion, habilitado, eliminado, creacion) VALUES ('Naturaleza', 'Localizaciones que están relacionados con la naturaleza y el aire libre', TRUE, FALSE, SYSDATE());
INSERT INTO TP_P_CATEGORIAS (nombre, descripcion, habilitado, eliminado, creacion) VALUES ('Cultura', 'Localizaciones que están relacionados con la historia y la cultura', TRUE, FALSE, SYSDATE());
INSERT INTO TP_P_CATEGORIAS (nombre, descripcion, habilitado, eliminado, creacion) VALUES ('Ocio', 'Localizaciones que están relacionados con el ocio y entretenimiento', TRUE, FALSE, SYSDATE());
INSERT INTO TP_P_CATEGORIAS (nombre, descripcion, habilitado, eliminado, creacion) VALUES ('Infantil', 'Localizaciones pensadas para los más pequeños', TRUE, FALSE, SYSDATE());

COMMIT;