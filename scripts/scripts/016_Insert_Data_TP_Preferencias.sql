-----------------------------------------------------
--     INSERT EN TABLA PREFERENCIAS      -- 
-----------------------------------------------------

USE `TravelPlanner`;

INSERT INTO TP_P_PREFERENCIAS (nombre, descripcion, habilitado, eliminado, creacion) VALUES ('Naturaleza', 'Personas a las que le gusta disfrutar de la naturaleza y el aire libre', TRUE, FALSE, SYSDATE());
INSERT INTO TP_P_PREFERENCIAS (nombre, descripcion, habilitado, eliminado, creacion) VALUES ('Cultura', 'Personas a las que le gusta disfrutar de la cultura y conocer los monumentos más característicos de la ciudad', TRUE, FALSE, SYSDATE());

COMMIT;