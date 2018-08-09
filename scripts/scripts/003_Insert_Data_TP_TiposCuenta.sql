---------------------------------------
-- INSERT EN TABLA TIPOS DE CUENTAS  -- 
---------------------------------------

USE `TravelPlanner`;

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