-------------------------------
-- DELETE EN TABLA USUARIOS  -- 
-------------------------------

USE `TravelPlanner`;

SET SQL_SAFE_UPDATES = 0;

DELETE FROM `TP_D_USUARIOS` WHERE TP_TX_CORREO = 'rumimuii2017@gmail.com';

COMMIT;

--------------------------
-- TABLA TP_D_USUARIOS  -- 
--------------------------

DROP table if exists `TP_D_USUARIOS`;

---------------------------------------
-- DELETE EN TABLA TIPOS DE CUENTAS  -- 
---------------------------------------

DELETE FROM `TP_P_TIPOS_CUENTA` WHERE TP_TX_NOMBRE = 'free';
DELETE FROM `TP_P_TIPOS_CUENTA` WHERE TP_TX_NOMBRE = 'premium';

COMMIT;

------------------------------
-- TABLA TP_P_TIPOS_CUENTA  -- 
------------------------------

DROP table if exists `TP_P_TIPOS_CUENTA`;

----------------------------------------
-- ELIMINACION DE USUARIOS DE LA BBDD -- 
----------------------------------------

drop user 'administrador'@'%';
drop user 'usuario'@'%';

----------------------------------
-- ELIMINACIÓN DE BASE DE DATOS --
----------------------------------

DROP database if exists `TravelPlanner`;

SET SQL_SAFE_UPDATES = 1;