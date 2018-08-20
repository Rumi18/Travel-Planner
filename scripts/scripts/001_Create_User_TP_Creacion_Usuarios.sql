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