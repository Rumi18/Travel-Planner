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



// Se lanza la aplicación de slim, lanzando todos los méetodos anteriores para que estén disponibles las rutas
$app->run();