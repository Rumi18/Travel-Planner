-------------------------------
-- INSERT EN TABLA USUARIOS  -- 
-------------------------------

USE `TravelPlanner`;

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