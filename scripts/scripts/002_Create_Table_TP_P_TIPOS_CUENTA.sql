------------------------------
-- TABLA TP_P_TIPOS_CUENTA  -- 
------------------------------

USE `TravelPlanner`;

CREATE TABLE TP_P_TIPOS_CUENTA (
    TP_ID_SECUENCIAL BIGINT (20) NOT NULL AUTO_INCREMENT,
    TP_TX_NOMBRE VARCHAR (32) NOT NULL,
    TP_DS_DESCRIPCION VARCHAR (500) NOT NULL,    
    TP_LG_HABILITADO BOOL NOT NULL,
    TP_LG_ELIMINADO BOOL NOT NULL,
    TP_DT_CREACION TIMESTAMP NOT NULL,
    TP_DT_MODIFICACION TIMESTAMP NOT NULL,   
    PRIMARY KEY (TP_ID_SECUENCIAL)
);

CREATE INDEX TP_P_TIPOS_CUENTA_ID ON TP_P_TIPOS_CUENTA(TP_ID_SECUENCIAL); 