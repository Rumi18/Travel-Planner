----------------------------------------
-- TABLA TP_D_CONFIGURACIONES  -- 
----------------------------------------

USE `TravelPlanner`;

CREATE TABLE TP_D_CONFIGURACIONES(
id  BIGINT(20) NOT NULL AUTO_INCREMENT,
duracion INT (2) NOT NULL,
presupuesto_min INT (10) NOT NULL,
presupuesto_max INT (10) NOT NULL,
mascotas BOOLEAN NOT NULL,
acompaniantes BOOLEAN NOT NULL,
ninios BOOLEAN NOT NULL,
habilitado BOOLEAN NOT NULL,
eliminado BOOLEAN NOT NULL,
creacion TIMESTAMP NOT NULL,
modificacion TIMESTAMP,

PRIMARY KEY (id)

)ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE INDEX TP_D_CONFIGURACIONES_ID ON TP_D_CONFIGURACIONES(id); 