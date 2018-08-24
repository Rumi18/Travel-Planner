----------------------------------------
-- TABLA TP_R_MARCADORES  -- 
----------------------------------------

USE `TravelPlanner`;

CREATE TABLE TP_R_MARCADORES(
id_mapa  BIGINT(20) NOT NULL,
id_localizacion BIGINT(20),
dia INT (2) NOT NULL,
habilitado BOOLEAN NOT NULL,
eliminado BOOLEAN NOT NULL,
creacion TIMESTAMP NOT NULL,
modificacion TIMESTAMP,

PRIMARY KEY (id_mapa, id_localizacion),
FOREIGN KEY (id_mapa) REFERENCES TP_D_MAPAS(id),
FOREIGN KEY (id_localizacion) REFERENCES TP_P_LOCALIZACIONES(id)

)ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE INDEX TP_R_MARCADORES_ID ON TP_R_MARCADORES(id_mapa, id_localizacion); 
