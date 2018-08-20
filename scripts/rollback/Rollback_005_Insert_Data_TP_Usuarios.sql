-------------------------------
-- DELETE EN TABLA USUARIOS  -- 
-------------------------------

USE `TravelPlanner`;

DELETE FROM `TP_D_USUARIOS` WHERE TP_TX_CORREO = 'rumimuii2017@gmail.com';

COMMIT;