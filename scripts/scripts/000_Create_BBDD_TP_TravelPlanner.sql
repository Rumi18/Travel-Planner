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