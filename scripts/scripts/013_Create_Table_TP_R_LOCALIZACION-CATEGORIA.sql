----------------------------------------
-- TABLA TP_R_LOCALIZACION-CATEGORIA  -- 
----------------------------------------

USE `TravelPlanner`;

CREATE TABLE TP_R_LOCALIZACION_CATEGORIA(
id_localizacion BIGINT(20) NOT NULL,
id_categoria BIGINT(20) NOT NULL,

PRIMARY KEY (id_localizacion, id_categoria)

)ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE INDEX TP_R_LOCALIZACION_CATEGORIA_ID ON TP_R_LOCALIZACION_CATEGORIA(id_localizacion, id_categoria); 