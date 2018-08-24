----------------------------------------
-- TABLA TP_R_MAPA_CIUDAD  -- 
----------------------------------------

USE `TravelPlanner`;

CREATE TABLE TP_R_MAPA_CIUDAD(
id_mapa BIGINT(20) NOT NULL,
id_ciudad BIGINT(20) NOT NULL,

PRIMARY KEY (id_mapa, id_ciudad),
FOREIGN KEY (id_mapa) REFERENCES TP_D_MAPAS(id),
FOREIGN KEY (id_ciudad) REFERENCES TP_P_CIUDADES(id)

)ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE INDEX TP_R_MAPA_CIUDAD_ID ON TP_R_MAPA_CIUDAD(id_mapa, id_ciudad); 