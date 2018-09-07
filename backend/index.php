<?php

// Carga el framework
require_once 'vendor/autoload.php';

// Instancia del objeto slim
$app = new \Slim\Slim();

// Conexión a la base de datos
$db = new mysqli('localhost', 'root', '', 'TravelPlanner');
 mysqli_set_charset($db, "utf8");
  
//Configuración de cabeceras HTTP para AJAX
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}

/****** MÉTODOS USUARIO ******/

// Crear un nuevo usuario
$app->post('/addUsuarios', function() use($app, $db){	
	$json = $app->request->post('json');		
	$data = json_decode($json, true);
	
	$sql = "INSERT INTO TP_D_USUARIOS (nombre, apellidos, email, user_name, user_passwd, id_tipocuenta, habilitado, eliminado, creacion) VALUES (". 
	"'{$data['nombre']}',". 
	"'{$data['apellidos']}',".
	"'{$data['email']}',". 
	"'{$data['user_name']}',". 
	"'{$data['user_passwd']}',". 
	"(SELECT id FROM TP_P_TIPOS_CUENTA WHERE nombre = 'Free'),". 
	"TRUE, FALSE, SYSDATE()".
	")";
		
	$query = $db->query($sql);
	
	if($query){
		$result = array(
			'status' => 'success',
			'code' => 200,
			'message' => 'Usuario creado correctamente'
		);
	}else{
		$result = array(
			'status' => 'error',
			'code' => 404,
			'message' => 'El usuario no se ha podido crear'
		);
	}
	
	echo json_encode($result);
});

// Obtener un usuario dado su user_name
$app->get('/getUsuario/:user_name', function($user_name) use($app, $db){
   $sql = "SELECT * FROM `TP_D_USUARIOS` WHERE user_name = '{$user_name}' AND eliminado = FALSE AND habilitado = TRUE";	
    $query= $db->query($sql);

    $result = array(
        'status' => 'error',
        'code' => 404,
        'message' => 'Usuario no encontrado'
    );

    if($query->num_rows == 1){
        $usuario = $query->fetch_assoc();

        $result = array(
            'status' => 'success',
            'code' => 200,
            'data' => $usuario
        );
    }

    echo json_encode($result);
});

// Obtener un usuario dado su id
$app->get('/getInforUsuario/:id', function($id) use($app, $db){
   $sql = "SELECT * FROM `TP_D_USUARIOS` WHERE id = '{$id}' AND eliminado = FALSE AND habilitado = TRUE";	
    $query= $db->query($sql);

    $result = array(
        'status' => 'error',
        'code' => 404,
        'message' => 'Usuario no encontrado'
    );

    if($query->num_rows == 1){
        $usuario = $query->fetch_assoc();

        $result = array(
            'status' => 'success',
            'code' => 200,
            'data' => $usuario
        );
    }

    echo json_encode($result);
});

// Modificar un usuario
$app->post('/setUsuario/:id', function($id) use($app, $db){	
	$json = $app->request->post('json');		
	$data = json_decode($json, true);
	
	$sql = "UPDATE TP_D_USUARIOS SET ";
	
	if(isset($data['user_passwd'])){
		$sql .= "user_passwd = '{$data['user_passwd']}', ";
	}

	if(isset($data['imagen'])){
		$sql .= "imagen = '{$data['imagen']}', ";
	}
	
	$sql.= "modificacion =  SYSDATE() ".
	"WHERE id = '{$id}'";
		
	$query = $db->query($sql);
	
	if($query){
		$result = array(
			'status' => 'success',
			'code' => 200,
			'message' => 'Usuario actualizado correctamente'
		);
	}else{
		$result = array(
			'status' => 'error',
			'code' => 404,
			'message' => 'El usuario no se ha podido actualizar'
		);
	}
	
	echo json_encode($result);
});

// Eliminar virtualmente un usuario
$app->get('/deleteUsuario/:id', function($id) use($app, $db){	
	
	$sql = "UPDATE TP_D_USUARIOS SET eliminado = TRUE, modificacion =  SYSDATE() ".
	"WHERE id = '{$id}'";
		
	$query = $db->query($sql);
	
	if($query){
		$result = array(
			'status' => 'success',
			'code' => 200,
			'message' => 'Usuario eliminado correctamente'
		);
	}else{
		$result = array(
			'status' => 'error',
			'code' => 404,
			'message' => 'El usuario no se ha podido eliminar'
		);
	}
	
	echo json_encode($result);
});

// Subir la imagen de un usuario
$app->post('/subirImagen/:id', function($id) use($app, $db){		
	$result = array(
		'status' => 'error',
		'code' => 404,
		'message' => 'La imagen no se ha podido cargar'
	);
	
	if(isset($_FILES['imagen'])){
		$piramideUploader = new PiramideUploader();		
		$upload = $piramideUploader->upload("img_{$id}", 'imagen', 'uploads', array('image/jpeg', 'image/jpg', 'image/png'));
		$file = $piramideUploader->getInfoFile();
		$file_name = $file['complete_name'];
		
		if(isset($upload) && $upload["uploaded"] == false){
			$result = array(
			'status' => 'error',
			'code' => 404,
			'message' => 'La imagen no se ha podido subir'
			);
		}else{
			$result = array(
			'status' => 'success',
			'code' => 200,
			'message' => 'La imagen se ha subido correctamente',
			'filename'  => $file_name
			
			);			
		}
	}
	
	echo json_encode($result);
});

// Devolver un solo usuario por el email
$app->get('/usuario_mail/:email', function($email) use($app, $db){
    $sql = "SELECT * FROM TP_D_USUARIOS WHERE email = '{$email}' AND eliminado = '{FALSE}' AND habilitado = '{TRUE}'";
    $query= $db->query($sql);
    
    $result = array(
        'status' => 'error',
        'code' => 404,
        'message' => 'Usuario no encontrado'
    );

    if($query->num_rows == 1){
        $usuario = $query->fetch_assoc();

        $result = array(
            'status' => 'success',
            'code' => 200,
            'data' => $usuario
        );
    }

    echo json_encode($result);
});

// Devolver error
$app->get('/error', function(){
    $result = array(
        'status' => 'error',
        'code' => 400,
        'message' => 'Campos incorrectos'
    );

    echo json_encode($result);
});

/****** MÉTODOS CONFIGURACION ******/

// Obtener todas las ciudades de BD
$app->get('/getCiudades', function() use($db, $app){
	$sql = 'SELECT * FROM TP_P_CIUDADES WHERE habilitado = TRUE AND eliminado = FALSE ORDER BY nombre';
	$query = $db->query($sql);

	$ciudades = array();
	while ($ciudad = $query->fetch_assoc()) {	
		$ciudades[] = $ciudad;
	}

	$result = array(
			'status' => 'success',
			'code'	 => 200,
			'data' => $ciudades
		);
	
	echo json_encode($result);
});

// Obtener todas las preferencias de BD
$app->get('/getPreferencias', function() use($db, $app){
	$sql = 'SELECT * FROM TP_P_PREFERENCIAS WHERE habilitado = TRUE AND eliminado = FALSE ORDER BY nombre';
	$query = $db->query($sql);

	$preferencias = array();
	while ($preferencia = $query->fetch_assoc()) {	
		$preferencias[] = $preferencia;
	}

	$result = array(
			'status' => 'success',
			'code'	 => 200,
			'data' => $preferencias
		);

	echo json_encode($result);
});


//Obtener las preferencias de una configuración dado su id
$app->get('/getPreferencias/:idConfiguracion', function($id) use($db, $app){
	$sql = "SELECT preferencia.* FROM TP_R_CONFIG_PREFERENCIA AS conf_pref INNER JOIN TP_P_PREFERENCIAS AS preferencia ON conf_pref.id_preferencia = preferencia.id WHERE conf_pref.id_configuracion = {$id}";
	
	$query = $db->query($sql);

	$preferencias = array();
	while ($preferencia = $query->fetch_assoc()) {	
		$preferencias[] = $preferencia;
	}

	$result = array(
			'status' => 'success',
			'code'	 => 200,
			'data' => $preferencias
		);
	
	echo json_encode($result);
});


// Obtener la configuración de un mapa dada su id
$app->get('/getConfiguracion/:idMapa', function($id) use($db, $app){
	$sql = "SELECT configuracion.* FROM TP_D_MAPAS AS mapa INNER JOIN TP_D_CONFIGURACIONES AS configuracion ON mapa.id_configuracion = configuracion.id WHERE mapa.id = 1 AND mapa.habilitado = TRUE AND mapa.eliminado = FALSE";	
    $query= $db->query($sql);

    $result = array(
        'status' => 'error',
        'code' => 404,
        'message' => 'Configuración no encontrada'
    );

    if($query->num_rows == 1){
        $configuracion = $query->fetch_assoc();

        $result = array(
            'status' => 'success',
            'code' => 200,
            'data' => $configuracion
        );
    }

    echo json_encode($result);
});


/****** MÉTODOS MAPAS ******/

// Obtener todos los mapas pendientes de un usuario dado su id
$app->get('/getMapasPendientes/:idUsuario', function($id) use($db, $app){
	$sql = "SELECT mapa.id, ciudad.nombre, mapa.puntuacion, mapa.observacion, configuracion.id AS id_configuracion, configuracion.duracion FROM TP_R_MAPA_USUARIO AS map_us INNER JOIN TP_D_MAPAS AS mapa ON map_us.id_mapa = mapa.id INNER JOIN TP_P_CIUDADES AS ciudad ON mapa.id_ciudad = ciudad.id INNER JOIN TP_D_CONFIGURACIONES AS configuracion ON mapa.id_configuracion = configuracion.id WHERE map_us.id_usuario = {$id} AND mapa.habilitado = TRUE AND mapa.eliminado = FALSE AND mapa.realizado = FALSE ORDER BY ciudad.nombre";
	
	$query = $db->query($sql);

	$mapas = array();
	while ($mapa = $query->fetch_assoc()) {	
		$mapas[] = $mapa;
	}

	$result = array(
			'status' => 'success',
			'code'	 => 200,
			'data' => $mapas
		);
	
	echo json_encode($result);
});

// Obtener todos los mapas realizados de un usuario dado su id
$app->get('/getHistorialMapas/:idUsuario', function($id) use($db, $app){
	$sql = "SELECT mapa.id, ciudad.nombre, mapa.puntuacion, mapa.observacion, configuracion.id AS id_configuracion FROM TP_R_MAPA_USUARIO AS map_us INNER JOIN TP_D_MAPAS AS mapa ON map_us.id_mapa = mapa.id INNER JOIN TP_P_CIUDADES AS ciudad ON mapa.id_ciudad = ciudad.id INNER JOIN TP_D_CONFIGURACIONES AS configuracion ON mapa.id_configuracion = configuracion.id WHERE map_us.id_usuario = {$id} AND mapa.habilitado = TRUE AND mapa.eliminado = FALSE AND mapa.realizado = TRUE ORDER BY ciudad.nombre";
	
	$query = $db->query($sql);

	$mapas = array();
	while ($mapa = $query->fetch_assoc()) {	
		$mapas[] = $mapa;
	}

	$result = array(
			'status' => 'success',
			'code'	 => 200,
			'data' => $mapas
		);
	
	echo json_encode($result);
});


// Obtener un mapa dado su id
$app->get('/getMapa/:idMapa', function($id) use($db, $app){
	$sql = "SELECT * FROM TP_D_MAPAS WHERE id = {$id} AND habilitado = TRUE AND eliminado = FALSE";	
    $query= $db->query($sql);

    $result = array(
        'status' => 'error',
        'code' => 404,
        'message' => 'Mapa no encontrado'
    );

    if($query->num_rows == 1){
        $mapa = $query->fetch_assoc();

        $result = array(
            'status' => 'success',
            'code' => 200,
            'data' => $mapa
        );
    }

    echo json_encode($result);
});


//Obtener todos los marcadores de un mapa dado su id
$app->get('/getMarcadores/:idMapa', function($id) use($db, $app){
	$sql = "SELECT localizacion.nombre, localizacion.latitud, localizacion.longitud, marcador.dia FROM TP_R_MARCADORES AS marcador INNER JOIN TP_P_LOCALIZACIONES AS localizacion ON marcador.id_localizacion = localizacion.id WHERE marcador.id_mapa = {$id}";
	
	$query = $db->query($sql);

	$marcadores = array();
	while ($marcador = $query->fetch_assoc()) {	
		$marcadores[] = $marcador;
	}

	$result = array(
			'status' => 'success',
			'code'	 => 200,
			'data' => $marcadores
		);
	
	echo json_encode($result);
});


//Obtener todos los marcadores de un mapa dado su id y el día
$app->get('/getMarcadoresPorDia/:idMapa/:dia', function($id, $dia) use($db, $app){
	$sql = "SELECT localizacion.nombre, localizacion.latitud, localizacion.longitud, marcador.dia FROM TP_R_MARCADORES AS marcador INNER JOIN TP_P_LOCALIZACIONES AS localizacion ON marcador.id_localizacion = localizacion.id WHERE marcador.id_mapa = {$id} AND marcador.dia = {$dia}";
	
	$query = $db->query($sql);

	$marcadores = array();
	while ($marcador = $query->fetch_assoc()) {	
		$marcadores[] = $marcador;
	}

	$result = array(
			'status' => 'success',
			'code'	 => 200,
			'data' => $marcadores
		);
	
	echo json_encode($result);
});

// Se lanza la aplicación de slim, lanzando todos los méetodos anteriores para que estén disponibles las rutas
$app->run();