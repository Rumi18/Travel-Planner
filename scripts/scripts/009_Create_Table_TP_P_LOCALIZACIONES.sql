--------------------------------
-- TABLA TP_P_LOCALIZACIONES  -- 
--------------------------------

USE `TravelPlanner`;

CREATE TABLE TP_P_LOCALIZACIONES(
id  BIGINT(20) NOT NULL AUTO_INCREMENT,
id_ciudad BIGINT(20) NOT NULL,
nombre VARCHAR (32) NOT NULL,
latitud DOUBLE (32) NOT NULL,
longitud DOUBLE (32) NOT NULL,
descripcion VARCHAR (200),
duracion INTEGER (10) NOT NULL,
precio DOUBLE,
puntuacion_media INTEGER(2),
habilitado BOOLEAN NOT NULL,
eliminado BOOLEAN NOT NULL,
creacion TIMESTAMP NOT NULL,
modificacion TIMESTAMP,

PRIMARY KEY (id),
FOREIGN KEY (id_ciudad) REFERENCES TP_P_CIUDADES(id)

)ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE INDEX TP_P_LOCALIZACIONES_ID ON TP_P_LOCALIZACIONES(id); 