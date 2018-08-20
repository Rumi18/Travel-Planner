--------------------------
-- TABLA TP_D_USUARIOS  -- 
--------------------------

USE `TravelPlanner`;

CREATE TABLE TP_D_USUARIOS(
id  BIGINT(20) NOT NULL AUTO_INCREMENT,
nombre VARCHAR (32) NOT NULL,
apellidos VARCHAR (64),
email VARCHAR (32) NOT NULL,
user_name VARCHAR (32) NOT NULL UNIQUE,
user_passwd VARCHAR (32) NOT NULL,
id_tipocuenta BIGINT(20) NOT NULL,
imagen VARCHAR (100),
habilitado BOOLEAN NOT NULL,
eliminado BOOLEAN NOT NULL,
creacion TIMESTAMP NOT NULL,
modificacion TIMESTAMP,

PRIMARY KEY (id),
FOREIGN KEY (id_tipocuenta) REFERENCES TP_P_TIPOS_CUENTA(id)

)ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE INDEX TP_D_USUARIOS_ID ON TP_D_USUARIOS(id); 