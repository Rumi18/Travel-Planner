-------------------------------
-- CREACIÓN DE BASE DE DATOS --
-------------------------------

create database `TravelPlanner`;

-- Configuracion

SET SQL_SAFE_UPDATES = 0;
SET FOREIGN_KEY_CHECKS = 0;
SET storage_engine = INNODB;

-- Esta query modifica el tamaño del fichero máximo para subir a la base de datos:
SET GLOBAL max_allowed_packet=50000000;

-------------------------------------
-- CREACIÓN DE USUARIOS DE LA BBDD -- 
-------------------------------------

USE `TravelPlanner`;

-- Se crea el usuario administrador con contraseña administrador
create user 'administrador'@'%' identified by 'administrador';

-- Asignación de permisos para el usuario administrador:
grant select, insert, update, delete, create, drop, references, index, alter, 
        create temporary tables, lock tables, create view, create routine, 
        alter routine, execute, trigger, show view
    on `TravelPlanner`.* to 'administrador'@'%';

-- Se crea el usuario usuario con contraseña usuario
create user 'usuario'@'%' identified by 'usuario';

-- Asignación de permisos para el usuario usuario:
grant select, insert, update, delete 
	on `TravelPlanner`.* to 'usuario'@'%';

------------------------------
-- TABLA TP_P_TIPOS_CUENTA  -- 
------------------------------

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

---------------------------------------
-- INSERT EN TABLA TIPOS DE CUENTAS  -- 
---------------------------------------

INSERT INTO `TP_P_TIPOS_CUENTA` ( 
    TP_TX_NOMBRE,
    TP_DS_DESCRIPCION,    
    TP_LG_HABILITADO,
    TP_LG_ELIMINADO,
    TP_DT_CREACION,
    TP_DT_MODIFICACION)
VALUES (
    'free' ,
    'Usuario con un tipo de cuenta FREE, no tendrá acceso a la aplicación completa y aparecerán anuncios en su cuenta.',
    true,
    false,
    SYSDATE(),
    SYSDATE());

INSERT INTO `TP_P_TIPOS_CUENTA` ( 
    TP_TX_NOMBRE,
    TP_DS_DESCRIPCION,    
    TP_LG_HABILITADO,
    TP_LG_ELIMINADO,
    TP_DT_CREACION,
    TP_DT_MODIFICACION)
VALUES (
    'premium' ,
    'Usuario con un tipo de cuenta PREMIUM, tendrá acceso a la aplicación completa y no aparecerán anuncios en su cuenta.',
    true,
    false,
    SYSDATE(),
    SYSDATE());

COMMIT;

--------------------------
-- TABLA TP_D_USUARIOS  -- 
--------------------------

CREATE TABLE TP_D_USUARIOS (
    TP_ID_SECUENCIAL BIGINT (20) NOT NULL AUTO_INCREMENT,
    TP_TX_USUARIO VARCHAR (32) NOT NULL,
    TP_TX_CONTRASENIA VARCHAR (32) NOT NULL,
    TP_ID_TIPOCUENTA BIGINT NOT NULL,
    TP_TX_NOMBRE VARCHAR (32) NOT NULL,
    TP_TX_APELLIDO1 VARCHAR (32) NOT NULL,
    TP_TX_APELLIDO2 VARCHAR (32) NOT NULL,
    TP_TX_CORREO VARCHAR (32) NOT NULL,
    TP_LB_FOTO LONGBLOB,   
    TP_LG_HABILITADO BOOL NOT NULL,
    TP_LG_ELIMINADO BOOL NOT NULL,
    TP_DT_CREACION TIMESTAMP NOT NULL,
    TP_DT_MODIFICACION TIMESTAMP NOT NULL,
    PRIMARY KEY (TP_ID_SECUENCIAL),
    FOREIGN KEY (TP_ID_TIPOCUENTA) REFERENCES TP_P_TIPOS_CUENTA(TP_ID_SECUENCIAL)
);

CREATE INDEX TP_D_USUARIOS_ID ON TP_D_USUARIOS(TP_ID_SECUENCIAL); 

-------------------------------
-- INSERT EN TABLA USUARIOS  -- 
-------------------------------

INSERT INTO `TP_D_USUARIOS` ( 
    TP_TX_USUARIO,
    TP_TX_CONTRASENIA,
    TP_ID_TIPOCUENTA,
    TP_TX_NOMBRE,
    TP_TX_APELLIDO1,
    TP_TX_APELLIDO2,
    TP_TX_CORREO,
    TP_LG_HABILITADO,
    TP_LG_ELIMINADO,
    TP_DT_CREACION,
    TP_DT_MODIFICACION)
VALUES (
    'travelplanner' ,
    'travelplanner',
    (SELECT TP_ID_SECUENCIAL FROM `TP_P_TIPOS_CUENTA` WHERE TP_TX_NOMBRE = 'premium'),
    'Rumi',
    'Apellido1 Rumi',
    'Apellido2 Rumi',
    'rumimuii2017@gmail.com',
    true,
    false,    
    SYSDATE(),
    SYSDATE());

COMMIT;