----------------------------------------------
-- TABLA TP_R_CONFIGURACION_PREFERENCIA  -- 
----------------------------------------------

USE `TravelPlanner`;

CREATE TABLE TP_R_CONFIG_PREFERENCIA(
id_preferencia BIGINT(20) NOT NULL,
id_configuracion BIGINT(20) NOT NULL,

PRIMARY KEY (id_preferencia, id_configuracion),
FOREIGN KEY (id_preferencia) REFERENCES TP_P_PREFERENCIAS(id),
FOREIGN KEY (id_configuracion) REFERENCES TP_D_CONFIGURACIONES(id)

)ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE INDEX TP_R_CONFIG_PREFERENCIA_ID ON TP_R_CONFIG_PREFERENCIA(id_preferencia, id_configuracion); 