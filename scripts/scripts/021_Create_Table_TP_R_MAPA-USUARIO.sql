----------------------------------------
-- TABLA TP_R_MAPA_USUARIO  -- 
----------------------------------------

USE `TravelPlanner`;

CREATE TABLE TP_R_MAPA_USUARIO(
id_usuario BIGINT(20) NOT NULL,
id_mapa BIGINT(20) NOT NULL,

PRIMARY KEY (id_usuario, id_mapa),
FOREIGN KEY (id_usuario) REFERENCES TP_D_USUARIOS(id),
FOREIGN KEY (id_mapa) REFERENCES TP_D_MAPAS(id)

)ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE INDEX TP_R_MAPA_USUARIO_ID ON TP_R_MAPA_USUARIO(id_usuario, id_mapa); 