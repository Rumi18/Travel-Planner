--------------------------------
-- TABLA TP_P_CATEGORIAS  -- 
--------------------------------

USE `TravelPlanner`;

CREATE TABLE TP_P_CATEGORIAS(
id  BIGINT(20) NOT NULL AUTO_INCREMENT,
nombre VARCHAR (32) NOT NULL,
descripcion VARCHAR (200),
habilitado BOOLEAN NOT NULL,
eliminado BOOLEAN NOT NULL,
creacion TIMESTAMP NOT NULL,
modificacion TIMESTAMP,

PRIMARY KEY (id)

)ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE INDEX TP_P_CATEGORIAS_ID ON TP_P_CATEGORIAS(id); 