-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 13-09-2018 a las 10:22:39
-- Versión del servidor: 5.5.24-log
-- Versión de PHP: 5.4.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `travelplanner`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tp_d_configuraciones`
--

CREATE TABLE IF NOT EXISTS `tp_d_configuraciones` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `duracion` int(2) NOT NULL,
  `presupuesto_min` int(10) NOT NULL,
  `presupuesto_max` int(10) NOT NULL,
  `mascotas` tinyint(1) NOT NULL,
  `acompaniantes` tinyint(1) NOT NULL,
  `ninios` tinyint(4) NOT NULL,
  `habilitado` tinyint(1) NOT NULL,
  `eliminado` tinyint(1) NOT NULL,
  `creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modificacion` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `TP_D_CONFIGURACIONES_ID` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Volcado de datos para la tabla `tp_d_configuraciones`
--

INSERT INTO `tp_d_configuraciones` (`id`, `duracion`, `presupuesto_min`, `presupuesto_max`, `mascotas`, `acompaniantes`, `ninios`, `habilitado`, `eliminado`, `creacion`, `modificacion`) VALUES
(3, 2, 200, 500, 0, 1, 0, 1, 0, '2018-08-24 22:36:04', NULL),
(4, 1, 50, 100, 0, 1, 0, 1, 0, '2018-08-24 22:45:24', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tp_d_mapas`
--

CREATE TABLE IF NOT EXISTS `tp_d_mapas` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_configuracion` bigint(20) NOT NULL,
  `id_ciudad` bigint(20) NOT NULL,
  `puntuacion` int(2) DEFAULT NULL,
  `observacion` varchar(200) DEFAULT NULL,
  `realizado` tinyint(1) NOT NULL,
  `habilitado` tinyint(1) NOT NULL,
  `eliminado` tinyint(1) NOT NULL,
  `creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modificacion` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_configuracion` (`id_configuracion`),
  KEY `id_ciudad` (`id_ciudad`),
  KEY `TP_D_MAPAS_ID` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `tp_d_mapas`
--

INSERT INTO `tp_d_mapas` (`id`, `id_configuracion`, `id_ciudad`, `puntuacion`, `observacion`, `realizado`, `habilitado`, `eliminado`, `creacion`, `modificacion`) VALUES
(1, 3, 1, NULL, NULL, 0, 1, 0, '2018-08-24 22:37:51', NULL),
(2, 4, 1, NULL, NULL, 0, 1, 0, '2018-08-24 22:45:24', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tp_d_usuarios`
--

CREATE TABLE IF NOT EXISTS `tp_d_usuarios` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(32) NOT NULL,
  `apellidos` varchar(64) DEFAULT NULL,
  `email` varchar(32) NOT NULL,
  `user_name` varchar(32) NOT NULL,
  `user_passwd` varchar(32) NOT NULL,
  `id_tipocuenta` bigint(20) NOT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  `habilitado` tinyint(1) NOT NULL,
  `eliminado` tinyint(1) NOT NULL,
  `creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modificacion` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`user_name`),
  KEY `id_tipocuenta` (`id_tipocuenta`),
  KEY `TP_D_USUARIOS_ID` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `tp_d_usuarios`
--

INSERT INTO `tp_d_usuarios` (`id`, `nombre`, `apellidos`, `email`, `user_name`, `user_passwd`, `id_tipocuenta`, `imagen`, `habilitado`, `eliminado`, `creacion`, `modificacion`) VALUES
(1, 'Miriam', 'Romero Sánchez', 'mirromsan@gmail.com', 'mirromsan', '27429e8a8680e3a010fa5360d7a9dcde', 1, 'img_1-1535206827-akita-inu-485x300.jpg', 1, 0, '2018-08-20 17:41:22', NULL),
(2, 'Rubén', 'Tavero Picón', 'rubtavpic@gmail.com', 'rubtavpic', '2728717dfc5ff8df76bcae89d0ba2010', 1, NULL, 1, 0, '2018-08-20 17:41:23', NULL),
(3, 'Miguel', 'Caraballo de la Rosa', 'migcarde@us.es', 'migcarde', 'da90dff765dbf526712e33244ce90b18', 1, NULL, 1, 0, '2018-08-22 09:37:41', '2018-08-22 14:45:14'),
(4, 'Monica', 'Tavero Picon', 'moni@gmail.com', 'monica', 'c27dad333088d4b615fe4483c853fb89', 1, NULL, 1, 0, '2018-08-22 12:03:28', NULL),
(5, 'Antonio', 'Carrasco', 'antonio@gmail.com', 'antonio', '5a7e70b16741071b583bc1b62a4bb184', 1, NULL, 1, 0, '2018-08-22 12:51:15', NULL),
(6, 'Marga', 'Caraballo de la Rosa', 'marga@gmail.com', 'marga', '8e8402a76367b3404bbac7f235d451c7', 1, NULL, 1, 0, '2018-08-22 14:26:23', NULL);
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tp_p_categorias`
--

CREATE TABLE IF NOT EXISTS `tp_p_categorias` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(32) NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `habilitado` tinyint(1) NOT NULL,
  `eliminado` tinyint(1) NOT NULL,
  `creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modificacion` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `TP_P_CATEGORIAS_ID` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Volcado de datos para la tabla `tp_p_categorias`
--

INSERT INTO `tp_p_categorias` (`id`, `nombre`, `descripcion`, `habilitado`, `eliminado`, `creacion`, `modificacion`) VALUES
(1, 'Naturaleza', 'Localizaciones que están relacionados con la naturaleza y el aire libre', 1, 0, '2018-08-24 22:10:46', NULL),
(2, 'Cultura', 'Localizaciones que están relacionados con la historia y la cultura', 1, 0, '2018-08-24 22:10:46', NULL),
(3, 'Ocio', 'Localizaciones que están relacionados con el ocio y entretenimiento', 1, 0, '2018-08-24 22:10:46', NULL),
(4, 'Infantil', 'Localizaciones pensadas para los más pequeños', 1, 0, '2018-08-24 22:10:46', NULL),
(5, 'Grupo', 'Localizaciones que están relacionados con el ocio y entretenimiento', 1, 0, '2018-08-25 16:53:41', NULL),
(6, 'Mascotas', 'Localizaciones pensadas para los más pequeños', 1, 0, '2018-08-25 16:53:41', NULL),
(7, 'Individual', 'Localizaciones pensadas para los más pequeños', 1, 0, '2018-08-25 16:53:41', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tp_p_ciudades`
--

CREATE TABLE IF NOT EXISTS `tp_p_ciudades` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_pais` bigint(20) NOT NULL,
  `nombre` varchar(32) NOT NULL,
  `habilitado` tinyint(1) NOT NULL,
  `eliminado` tinyint(1) NOT NULL,
  `creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modificacion` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_pais` (`id_pais`),
  KEY `TP_P_CIUDADES_ID` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `tp_p_ciudades`
--

INSERT INTO `tp_p_ciudades` (`id`, `id_pais`, `nombre`, `habilitado`, `eliminado`, `creacion`, `modificacion`) VALUES
(1, 1, 'Sevilla', 1, 0, '2018-08-24 22:10:45', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tp_p_localizaciones`
--

CREATE TABLE IF NOT EXISTS `tp_p_localizaciones` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_ciudad` bigint(20) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `latitud` double NOT NULL,
  `longitud` double NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `duracion` int(10) NOT NULL,
  `precio` double DEFAULT NULL,
  `puntuacion_media` int(2) DEFAULT NULL,
  `destacado` tinyint(1) DEFAULT NULL,
  `total_usuarios` bigint(20) DEFAULT NULL,
  `habilitado` tinyint(1) NOT NULL,
  `eliminado` tinyint(1) NOT NULL,
  `creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modificacion` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_ciudad` (`id_ciudad`),
  KEY `TP_P_LOCALIZACIONES_ID` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=43 ;

--
-- Volcado de datos para la tabla `tp_p_localizaciones`
--

INSERT INTO `tp_p_localizaciones` (`id`, `id_ciudad`, `nombre`, `latitud`, `longitud`, `descripcion`, `duracion`, `precio`, `puntuacion_media`, `destacado`, `total_usuarios`, `habilitado`, `eliminado`, `creacion`, `modificacion`) VALUES
(1, 1, 'La Giralda', 37.386257, -5.992617, NULL, 15, 5, 5, 0, 9053, 1, 0, '2018-09-13 08:43:38', NULL),
(2, 1, 'Parque Maria Luisa', 37.375101, -5.988736, NULL, 15, 5, 4, 0, 5913, 1, 0, '2018-09-13 08:43:38', NULL),
(3, 1, 'Plaza España', 37.377258, -5.986851, NULL, 15, 5, 5, 0, 34451, 1, 0, '2018-09-13 08:43:38', NULL),
(4, 1, 'Parque Alamillo', 37.41882, -5.9966, NULL, 15, 5, 4, 0, 39, 1, 0, '2018-09-13 08:43:38', NULL),
(5, 1, 'Parque Los principies', 37.373633, -6.005529, NULL, 15, 5, 4, 0, 53, 1, 0, '2018-09-13 08:43:38', NULL),
(6, 1, 'Torre del Oro', 37.382418, -5.996472, NULL, 15, 5, 4, 0, 1916, 1, 0, '2018-09-13 08:43:38', NULL),
(7, 1, 'Arco de la macarena', 37.402803, -5.989241, NULL, 15, 5, 4, 0, 8, 1, 0, '2018-09-13 08:43:38', NULL),
(8, 1, 'Archivo de Indias', 37.38483, -5.993861, NULL, 15, 5, 4, 0, 965, 1, 0, '2018-09-13 08:43:38', NULL),
(9, 1, 'Alcazar', 37.383113, -5.990229, NULL, 15, 5, 5, 0, 28012, 1, 0, '2018-09-13 08:43:38', NULL),
(10, 1, 'Las Setas', 37.393342, -5.991823, NULL, 15, 5, 4, 0, 7191, 1, 0, '2018-09-13 08:43:38', NULL),
(11, 1, 'Prado', 37.389141, -5.984461, NULL, 15, 5, 4, 0, 16, 1, 0, '2018-09-13 08:43:38', NULL),
(12, 1, 'La Catedral', 37.385923, -5.993131, NULL, 15, 5, 5, 0, 20968, 1, 0, '2018-09-13 08:43:38', NULL),
(13, 1, 'Iglesia Colegial del Salvador', 37.39024, -5.993145, NULL, 15, 5, 5, 0, 1667, 1, 0, '2018-09-13 08:43:38', NULL),
(14, 1, 'Edificio la Adriática', 37.387774, -5.994432, NULL, 15, 5, 5, 0, 202, 1, 0, '2018-09-13 08:43:38', NULL),
(15, 1, 'Iglesia de Santa María la Blanca', 37.386625, -5.987304, NULL, 15, 5, 5, 0, 122, 1, 0, '2018-09-13 08:43:38', NULL),
(16, 1, 'Museo Palacio Condesa de Lebrija', 37.392146, -5.993937, NULL, 15, 5, 5, 0, 627, 1, 0, '2018-09-13 08:43:38', NULL),
(17, 1, 'Museo de Bellas Artes de Sevilla', 37.392679, -6.00004, NULL, 15, 5, 5, 0, 1736, 1, 0, '2018-09-13 08:43:38', NULL),
(18, 1, 'Ayuntamiento', 37.392009, -5.994268, NULL, 15, 5, 4, 0, 335, 1, 0, '2018-09-13 08:43:38', NULL),
(19, 1, 'Básilica de la Macarena', 37.402576, -5.989413, NULL, 15, 5, 5, 0, 2048, 1, 0, '2018-09-13 08:43:38', NULL),
(20, 1, 'Plaza del triunfo', 37.385874, -5.992273, NULL, 15, 5, 5, 0, 542, 1, 0, '2018-09-13 08:43:38', NULL),
(21, 1, 'Las Dueñas', 37.395063, -5.989231, NULL, 15, 5, 5, 0, 981, 1, 0, '2018-09-13 08:43:38', NULL),
(22, 1, 'Casa de Pilatos', 37.390142, -5.987279, NULL, 15, 5, 5, 0, 3149, 1, 0, '2018-09-13 08:43:38', NULL),
(23, 1, 'Puerta de Jerez', 37.382569, -5.993172, NULL, 15, 5, 4, 0, 137, 1, 0, '2018-09-13 08:43:38', NULL),
(24, 1, 'Real Fábrica De Tabacos', 37.381397, -5.990559, NULL, 15, 5, 4, 0, 747, 1, 0, '2018-09-13 08:43:38', NULL),
(25, 1, 'Puente de Triana', 37.386489, -6.002472, NULL, 15, 5, 4, 0, 1045, 1, 0, '2018-09-13 08:43:38', NULL),
(26, 1, 'Calle Sierpes', 37.390703, -5.994433, NULL, 15, 5, 4, 0, 672, 1, 0, '2018-09-13 08:43:38', NULL),
(27, 1, 'Plaza de Toros de la Maestranza', 37.386021, -5.999034, NULL, 15, 5, 4, 0, 4331, 1, 0, '2018-09-13 08:43:38', NULL),
(28, 1, 'Plaza nueva', 37.388579, -5.995596, NULL, 15, 5, 4, 0, 562, 1, 0, '2018-09-13 08:43:38', NULL),
(29, 1, 'Estadio Benito Villamarín', 37.356743, -5.981728, NULL, 15, 5, 4, 0, 53, 1, 0, '2018-09-13 08:43:38', NULL),
(30, 1, 'Monasterio de Santa María de las Cuevas', 37.39863, -6.008893, NULL, 15, 5, 3, 0, 163, 1, 0, '2018-09-13 08:43:38', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tp_p_paises`
--

CREATE TABLE IF NOT EXISTS `tp_p_paises` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(32) NOT NULL,
  `habilitado` tinyint(1) NOT NULL,
  `eliminado` tinyint(1) NOT NULL,
  `creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modificacion` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `TP_P_PAISES_ID` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `tp_p_paises`
--

INSERT INTO `tp_p_paises` (`id`, `nombre`, `habilitado`, `eliminado`, `creacion`, `modificacion`) VALUES
(1, 'España', 1, 0, '2018-08-24 22:10:45', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tp_p_preferencias`
--

CREATE TABLE IF NOT EXISTS `tp_p_preferencias` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(32) NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `habilitado` tinyint(1) NOT NULL,
  `eliminado` tinyint(1) NOT NULL,
  `creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modificacion` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `TP_P_PREFERENCIAS_ID` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `tp_p_preferencias`
--

INSERT INTO `tp_p_preferencias` (`id`, `nombre`, `descripcion`, `habilitado`, `eliminado`, `creacion`, `modificacion`) VALUES
(1, 'Naturaleza', 'Personas a las que le gusta disfrutar de la naturaleza y el aire libre', 1, 0, '2018-08-24 22:10:47', NULL),
(2, 'Cultura', 'Personas a las que le gusta disfrutar de la cultura y conocer los monumentos más característicos de la ciudad', 1, 0, '2018-08-24 22:10:47', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tp_p_tipos_cuenta`
--

CREATE TABLE IF NOT EXISTS `tp_p_tipos_cuenta` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(32) NOT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `habilitado` tinyint(1) NOT NULL,
  `eliminado` tinyint(1) NOT NULL,
  `creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modificacion` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `TP_P_TIPOS_CUENTA_ID` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `tp_p_tipos_cuenta`
--

INSERT INTO `tp_p_tipos_cuenta` (`id`, `nombre`, `descripcion`, `habilitado`, `eliminado`, `creacion`, `modificacion`) VALUES
(1, 'Free', 'Usuario con cuenta gratuita', 1, 0, '2018-08-24 22:10:44', NULL),
(2, 'Premium', 'Usuario con cuenta premium', 1, 0, '2018-08-24 22:10:44', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tp_r_config_preferencia`
--

CREATE TABLE IF NOT EXISTS `tp_r_config_preferencia` (
  `id_preferencia` bigint(20) NOT NULL,
  `id_configuracion` bigint(20) NOT NULL,
  PRIMARY KEY (`id_preferencia`,`id_configuracion`),
  KEY `id_configuracion` (`id_configuracion`),
  KEY `TP_R_CONFIG_PREFERENCIA_ID` (`id_preferencia`,`id_configuracion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tp_r_config_preferencia`
--

INSERT INTO `tp_r_config_preferencia` (`id_preferencia`, `id_configuracion`) VALUES
(1, 3),
(2, 3),
(1, 4),
(2, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tp_r_localizacion_categoria`
--

CREATE TABLE IF NOT EXISTS `tp_r_localizacion_categoria` (
  `id_localizacion` bigint(20) NOT NULL,
  `id_categoria` bigint(20) NOT NULL,
  PRIMARY KEY (`id_localizacion`,`id_categoria`),
  KEY `id_categoria` (`id_categoria`),
  KEY `TP_R_LOCALIZACION_CATEGORIA_ID` (`id_localizacion`,`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tp_r_localizacion_categoria`
--

INSERT INTO `tp_r_localizacion_categoria` (`id_localizacion`, `id_categoria`) VALUES
(2, 1),
(4, 1),
(5, 1),
(9, 1),
(30, 1),
(1, 2),
(3, 2),
(6, 2),
(7, 2),
(12, 2),
(13, 2),
(15, 2),
(16, 2),
(17, 2),
(19, 2),
(22, 2),
(24, 2),
(30, 2),
(14, 3),
(18, 3),
(20, 3),
(21, 3),
(22, 3),
(23, 3),
(25, 3),
(26, 3),
(27, 3),
(28, 3),
(29, 3),
(2, 4),
(3, 4),
(4, 4),
(10, 4),
(11, 4),
(20, 4),
(23, 4),
(2, 5),
(3, 5),
(4, 5),
(7, 5),
(12, 5),
(13, 5),
(14, 5),
(15, 5),
(16, 5),
(17, 5),
(18, 5),
(19, 5),
(20, 5),
(21, 5),
(22, 5),
(23, 5),
(25, 5),
(26, 5),
(27, 5),
(28, 5),
(29, 5),
(30, 5),
(2, 6),
(3, 6),
(4, 6),
(5, 6),
(14, 6),
(20, 6),
(23, 6),
(24, 6),
(25, 6),
(26, 6),
(28, 6),
(1, 7),
(6, 7),
(7, 7),
(8, 7),
(12, 7),
(13, 7),
(14, 7),
(15, 7),
(16, 7),
(17, 7),
(18, 7),
(19, 7),
(20, 7),
(21, 7),
(22, 7),
(23, 7),
(24, 7),
(25, 7),
(26, 7),
(28, 7),
(29, 7),
(30, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tp_r_mapa_usuario`
--

CREATE TABLE IF NOT EXISTS `tp_r_mapa_usuario` (
  `id_usuario` bigint(20) NOT NULL,
  `id_mapa` bigint(20) NOT NULL,
  PRIMARY KEY (`id_usuario`,`id_mapa`),
  KEY `id_mapa` (`id_mapa`),
  KEY `TP_R_MAPA_USUARIO_ID` (`id_usuario`,`id_mapa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tp_r_mapa_usuario`
--

INSERT INTO `tp_r_mapa_usuario` (`id_usuario`, `id_mapa`) VALUES
(1, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tp_r_marcadores`
--

CREATE TABLE IF NOT EXISTS `tp_r_marcadores` (
  `id_mapa` bigint(20) NOT NULL,
  `id_localizacion` bigint(20) NOT NULL,
  `dia` int(2) NOT NULL,
  `habilitado` tinyint(1) NOT NULL,
  `eliminado` tinyint(1) NOT NULL,
  `creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modificacion` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_mapa`,`id_localizacion`),
  KEY `id_localizacion` (`id_localizacion`),
  KEY `TP_R_MARCADORES_ID` (`id_mapa`,`id_localizacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tp_r_marcadores`
--

INSERT INTO `tp_r_marcadores` (`id_mapa`, `id_localizacion`, `dia`, `habilitado`, `eliminado`, `creacion`, `modificacion`) VALUES
(1, 1, 1, 1, 0, '2018-08-24 22:49:23', NULL),
(1, 2, 2, 1, 0, '2018-08-25 21:50:04', NULL),
(1, 3, 2, 1, 0, '2018-08-25 21:51:22', NULL),
(1, 4, 1, 1, 0, '2018-08-25 21:51:22', NULL),
(1, 5, 1, 1, 0, '2018-08-25 21:51:22', NULL),
(1, 6, 2, 1, 0, '2018-08-25 21:51:23', NULL),
(1, 7, 1, 1, 0, '2018-08-25 21:51:23', NULL),
(1, 8, 1, 1, 0, '2018-08-25 21:51:23', NULL),
(1, 9, 2, 1, 0, '2018-08-25 21:51:23', NULL),
(2, 1, 1, 1, 0, '2018-08-24 22:49:23', NULL);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tp_d_mapas`
--
ALTER TABLE `tp_d_mapas`
  ADD CONSTRAINT `tp_d_mapas_ibfk_1` FOREIGN KEY (`id_configuracion`) REFERENCES `tp_d_configuraciones` (`id`),
  ADD CONSTRAINT `tp_d_mapas_ibfk_2` FOREIGN KEY (`id_ciudad`) REFERENCES `tp_p_ciudades` (`id`);

--
-- Filtros para la tabla `tp_d_usuarios`
--
ALTER TABLE `tp_d_usuarios`
  ADD CONSTRAINT `tp_d_usuarios_ibfk_1` FOREIGN KEY (`id_tipocuenta`) REFERENCES `tp_p_tipos_cuenta` (`id`);

--
-- Filtros para la tabla `tp_p_ciudades`
--
ALTER TABLE `tp_p_ciudades`
  ADD CONSTRAINT `tp_p_ciudades_ibfk_1` FOREIGN KEY (`id_pais`) REFERENCES `tp_p_paises` (`id`);

--
-- Filtros para la tabla `tp_p_localizaciones`
--
ALTER TABLE `tp_p_localizaciones`
  ADD CONSTRAINT `tp_p_localizaciones_ibfk_1` FOREIGN KEY (`id_ciudad`) REFERENCES `tp_p_ciudades` (`id`);

--
-- Filtros para la tabla `tp_r_config_preferencia`
--
ALTER TABLE `tp_r_config_preferencia`
  ADD CONSTRAINT `tp_r_config_preferencia_ibfk_1` FOREIGN KEY (`id_preferencia`) REFERENCES `tp_p_preferencias` (`id`),
  ADD CONSTRAINT `tp_r_config_preferencia_ibfk_2` FOREIGN KEY (`id_configuracion`) REFERENCES `tp_d_configuraciones` (`id`);

--
-- Filtros para la tabla `tp_r_localizacion_categoria`
--
ALTER TABLE `tp_r_localizacion_categoria`
  ADD CONSTRAINT `tp_r_localizacion_categoria_ibfk_1` FOREIGN KEY (`id_localizacion`) REFERENCES `tp_p_localizaciones` (`id`),
  ADD CONSTRAINT `tp_r_localizacion_categoria_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `tp_p_categorias` (`id`);

--
-- Filtros para la tabla `tp_r_mapa_usuario`
--
ALTER TABLE `tp_r_mapa_usuario`
  ADD CONSTRAINT `tp_r_mapa_usuario_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `tp_d_usuarios` (`id`),
  ADD CONSTRAINT `tp_r_mapa_usuario_ibfk_2` FOREIGN KEY (`id_mapa`) REFERENCES `tp_d_mapas` (`id`);

--
-- Filtros para la tabla `tp_r_marcadores`
--
ALTER TABLE `tp_r_marcadores`
  ADD CONSTRAINT `tp_r_marcadores_ibfk_1` FOREIGN KEY (`id_mapa`) REFERENCES `tp_d_mapas` (`id`),
  ADD CONSTRAINT `tp_r_marcadores_ibfk_2` FOREIGN KEY (`id_localizacion`) REFERENCES `tp_p_localizaciones` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
