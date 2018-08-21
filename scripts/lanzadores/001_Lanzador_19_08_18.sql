
CREATE DATABASE IF NOT EXISTS TravelPlanner;
USE TravelPlanner;

-- Tabla tipo de cuentas

CREATE TABLE TP_P_TIPOS_CUENTA (
    id BIGINT (20) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (32) NOT NULL,
    descripcion VARCHAR (500),    
    habilitado BOOLEAN NOT NULL,
    eliminado BOOLEAN NOT NULL,
    creacion TIMESTAMP NOT NULL,
    modificacion TIMESTAMP, 
	
    PRIMARY KEY (id)

)ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE INDEX TP_P_TIPOS_CUENTA_ID ON TP_P_TIPOS_CUENTA(id); 


-- Insertar tipos de cuenta
INSERT INTO TP_P_TIPOS_CUENTA (nombre, descripcion, habilitado, eliminado, creacion) VALUES ('Free', 'Usuario con cuenta gratuita', TRUE, FALSE, SYSDATE());
INSERT INTO TP_P_TIPOS_CUENTA (nombre, descripcion, habilitado, eliminado, creacion) VALUES ('Premium', 'Usuario con cuenta premium', TRUE, FALSE, SYSDATE());


-- Tabla usuarios

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

INSERT INTO TP_D_USUARIOS (nombre, apellidos, email, user_name, user_passwd, id_tipocuenta, habilitado, eliminado, creacion) VALUES ('Miriam', 'Romero Sánchez', 'mirromsan@gmail.com', 'mirromsan', '27429e8a8680e3a010fa5360d7a9dcde', (SELECT id FROM TP_P_TIPOS_CUENTA WHERE nombre = 'Free'), TRUE, FALSE, SYSDATE());
INSERT INTO TP_D_USUARIOS (nombre, apellidos, email, user_name, user_passwd, id_tipocuenta, habilitado, eliminado, creacion) VALUES ('Rubén', 'Tavero Picón', 'rubtavpic@gmail.com', 'rubtavpic', '2728717dfc5ff8df76bcae89d0ba2010', (SELECT id FROM TP_P_TIPOS_CUENTA WHERE nombre = 'Free'), TRUE, FALSE, SYSDATE());

-- Tabla paises

CREATE TABLE TP_P_PAISES(
id  BIGINT(20) NOT NULL AUTO_INCREMENT,
nombre VARCHAR (32) NOT NULL,
habilitado BOOLEAN NOT NULL,
eliminado BOOLEAN NOT NULL,
creacion TIMESTAMP NOT NULL,
modificacion TIMESTAMP,

PRIMARY KEY (id)

)ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE INDEX TP_P_PAISES_ID ON TP_P_PAISES(id); 

-- insertar paises

INSERT INTO TP_P_PAISES (nombre, habilitado, eliminado, creacion) VALUES ('España', TRUE, FALSE, SYSDATE());

-- Tabla ciudades

CREATE TABLE TP_P_CIUDADES(
id  BIGINT(20) NOT NULL AUTO_INCREMENT,
id_pais BIGINT(20) NOT NULL,
nombre VARCHAR (32) NOT NULL,
habilitado BOOLEAN NOT NULL,
eliminado BOOLEAN NOT NULL,
creacion TIMESTAMP NOT NULL,
modificacion TIMESTAMP,

PRIMARY KEY (id),
FOREIGN KEY (id_pais) REFERENCES TP_P_PAISES(id)

)ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE INDEX TP_P_CIUDADES_ID ON TP_P_CIUDADES(id); 

-- insertar cuidades

INSERT INTO TP_P_CIUDADES (id_pais, nombre, habilitado, eliminado, creacion) VALUES ((SELECT id FROM TP_P_PAISES WHERE nombre = 'España'),'Sevilla', TRUE, FALSE, SYSDATE());

-- Tabla localizaciones

CREATE TABLE TP_P_LOCALIZACIONES(
id  BIGINT(20) NOT NULL AUTO_INCREMENT,
id_ciudad BIGINT(20) NOT NULL,
nombre VARCHAR (32) NOT NULL,
coordenadas VARCHAR (32) NOT NULL,
descripcion VARCHAR (200),
duracion INTEGER (10) NOT NULL,
precio DOUBLE,
puntuacion_media INTEGER(2),
habilitado BOOLEAN NOT NULL,
eliminado BOOLEAN NOT NULL,
creacion TIMESTAMP NOT NULL,
modificacion TIMESTAMP,

PRIMARY KEY (id),
FOREIGN KEY (id_ciudad) REFERENCES TP_P_CIUDADES(id)

)ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE INDEX TP_P_LOCALIZACIONES_ID ON TP_P_LOCALIZACIONES(id); 

-- insertar localizaciones

INSERT INTO TP_P_LOCALIZACIONES (id_ciudad, nombre, coordenadas, duracion, precio, habilitado, eliminado, creacion) VALUES ((SELECT id FROM TP_P_CIUDADES WHERE nombre = 'Sevilla'), 'La Giralda', 'X,Y,Z', 15, 5, TRUE, FALSE, SYSDATE());

-- Tabla categorías

CREATE TABLE TP_P_CATEGORIAS(
id  BIGINT(20) NOT NULL AUTO_INCREMENT,
nombre VARCHAR (32) NOT NULL,
descripcion VARCHAR (200),
habilitado BOOLEAN NOT NULL,
eliminado BOOLEAN NOT NULL,
creacion TIMESTAMP NOT NULL,
modificacion TIMESTAMP,

PRIMARY KEY (id)

)ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE INDEX TP_P_CATEGORIAS_ID ON TP_P_CATEGORIAS(id); 

-- insertar categorias

INSERT INTO TP_P_CATEGORIAS (nombre, descripcion, habilitado, eliminado, creacion) VALUES ('Naturaleza', 'Localizaciones que están relacionados con la naturaleza y el aire libre', TRUE, FALSE, SYSDATE());
INSERT INTO TP_P_CATEGORIAS (nombre, descripcion, habilitado, eliminado, creacion) VALUES ('Cultura', 'Localizaciones que están relacionados con la historia y la cultura', TRUE, FALSE, SYSDATE());
INSERT INTO TP_P_CATEGORIAS (nombre, descripcion, habilitado, eliminado, creacion) VALUES ('Ocio', 'Localizaciones que están relacionados con el ocio y entretenimiento', TRUE, FALSE, SYSDATE());
INSERT INTO TP_P_CATEGORIAS (nombre, descripcion, habilitado, eliminado, creacion) VALUES ('Infantil', 'Localizaciones pensadas para los más pequeños', TRUE, FALSE, SYSDATE());

-- Tabla localizacion-categoria

CREATE TABLE TP_R_LOCALIZACION_CATEGORIA(
id_localizacion BIGINT(20) NOT NULL,
id_categoria BIGINT(20) NOT NULL,

PRIMARY KEY (id_localizacion, id_categoria)

)ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE INDEX TP_R_LOCALIZACION_CATEGORIA_ID ON TP_R_LOCALIZACION_CATEGORIA(id_localizacion, id_categoria); 

-- insertar relaciones localizacion-categoria

INSERT INTO TP_R_LOCALIZACION_CATEGORIA (id_localizacion, id_categoria) VALUES ((SELECT id FROM TP_P_LOCALIZACIONES WHERE nombre = 'La Giralda'),(SELECT id FROM TP_P_CATEGORIAS WHERE nombre = 'Cultura'));

-- Tabla preferencias

CREATE TABLE TP_P_PREFERENCIAS(
id  BIGINT(20) NOT NULL AUTO_INCREMENT,
nombre VARCHAR (32) NOT NULL,
descripcion VARCHAR (200),
habilitado BOOLEAN NOT NULL,
eliminado BOOLEAN NOT NULL,
creacion TIMESTAMP NOT NULL,
modificacion TIMESTAMP,

PRIMARY KEY (id)

)ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE INDEX TP_P_PREFERENCIAS_ID ON TP_P_PREFERENCIAS(id); 

-- insert de preferencias

INSERT INTO TP_P_PREFERENCIAS (nombre, descripcion, habilitado, eliminado, creacion) VALUES ('Naturaleza', 'Personas a las que le gusta disfrutar de la naturaleza y el aire libre', TRUE, FALSE, SYSDATE());
INSERT INTO TP_P_PREFERENCIAS (nombre, descripcion, habilitado, eliminado, creacion) VALUES ('Cultura', 'Personas a las que le gusta disfrutar de la cultura y conocer los monumentos más característicos de la ciudad', TRUE, FALSE, SYSDATE());
