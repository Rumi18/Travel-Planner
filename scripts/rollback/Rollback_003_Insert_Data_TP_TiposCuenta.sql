---------------------------------------
-- DELETE EN TABLA TIPOS DE CUENTAS  -- 
---------------------------------------

USE `TravelPlanner`;

DELETE FROM `TP_P_TIPOS_CUENTA` WHERE TP_TX_NOMBRE = 'free';
DELETE FROM `TP_P_TIPOS_CUENTA` WHERE TP_TX_NOMBRE = 'premium';

COMMIT;