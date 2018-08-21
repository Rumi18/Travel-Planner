---------------------------------------
-- INSERT EN TABLA TIPOS DE CUENTAS  -- 
---------------------------------------

USE `TravelPlanner`;

DELETE FROM TP_P_TIPOS_CUENTA WHERE nombre = 'Free';
DELETE FROM TP_P_TIPOS_CUENTA WHERE nombre = 'Premium';
COMMIT;