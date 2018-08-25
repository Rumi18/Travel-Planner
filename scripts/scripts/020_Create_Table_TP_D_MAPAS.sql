----------------------------------------
-- TABLA TP_D_MAPAS  -- 
----------------------------------------

USE `TravelPlanner`;

CREATE TABLE TP_D_MAPAS(
id  BIGINT(20) NOT NULL AUTO_INCREMENT,
id_configuracion BIGINT(20) NOT NULL,
id_ciudad BIGINT(20) NOT NULL,
puntuacion INT (2),
observacion VARCHAR (200),
realizado BOOLEAN NOT NULL,
habilitado BOOLEAN NOT NULL,
eliminado BOOLEAN NOT NULL,
creacion TIMESTAMP NOT NULL,
modificacion TIMESTAMP,

PRIMARY KEY (id),
FOREIGN KEY (id_configuracion) REFERENCES TP_D_CONFIGURACIONES(id),
FOREIGN KEY (id_ciudad) REFERENCES TP_P_CIUDADES(id)

)ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE INDEX TP_D_MAPAS_ID ON TP_D_MAPAS(id); 