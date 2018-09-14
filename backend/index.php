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
   $sql = "SELECT * FROM TP_D_USUARIOS WHERE user_name = '{$user_name}' AND eliminado = FALSE AND habilitado = TRUE"; 
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
   $sql = "SELECT * FROM TP_D_USUARIOS WHERE id = '{$id}' AND eliminado = FALSE AND habilitado = TRUE"; 
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

// Eliminar lógicamente un usuario
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
   'code'  => 200,
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
   'code'  => 200,
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
   'code'  => 200,
   'data' => $preferencias
  );
 
 echo json_encode($result);
});

// Obtener la configuración dado su id
$app->get('/getConfiguracion/:idConfiguracion', function($id) use($db, $app){
 $sql = "SELECT * FROM TP_D_CONFIGURACIONES WHERE id ={$id} AND habilitado = TRUE AND eliminado = FALSE"; 
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

// Obtener las localizaciones dado el id de la ciudad
$app->get('/getLocalizaciones/:idCiudad', function($id) use($db, $app){
 $sql = 'SELECT * FROM TP_P_LOCALIZACIONES WHERE id_ciudad = {$id} AND habilitado = TRUE AND eliminado = FALSE ORDER BY puntuacion_media';
 $query = $db->query($sql);

 $localizaciones = array();
 while ($localizacion = $query->fetch_assoc()) { 
  $localizaciones[] = $localizacion;
 }

 $result = array(
   'status' => 'success',
   'code'  => 200,
   'data' => $localizaciones
  );
 
 echo json_encode($result);
});

//Añadir una configuración
$app->post('/addConfiguracion', function() use($app, $db){  
    $json = $app->request->post('json');    
    $data = json_decode($json, true);
    
    $sql = "INSERT INTO TP_D_CONFIGURACIONES (duracion, presupuesto_min, presupuesto_max, mascotas, acompaniantes, ninios, habilitado, eliminado, creacion) VALUES (".
    "{$data['duracion']},". 
    "{$data['presupuesto_min']},".
    "{$data['presupuesto_max']},". 
    "{$data['mascotas']},". 
    "{$data['acompaniantes']},". 
    "{$data['ninios']},".   
    "TRUE, FALSE, SYSDATE())";
      
    $query = $db->query($sql);
      
    if($query){    
      $result = array(
        'status' => 'success',
        'code' => 200,      
        'message' => 'Configuracion creada correctamente'
      );
    }else{
      $result = array(
        'status' => 'error',
        'code' => 404,
        'message' => 'La configuracion no se ha podido crear'
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
   'code'  => 200,
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
   'code'  => 200,
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
 $sql = "SELECT localizacion.nombre, localizacion.latitud, localizacion.longitud, localizacion.descripcion, marcador.dia FROM TP_R_MARCADORES AS marcador INNER JOIN TP_P_LOCALIZACIONES AS localizacion ON marcador.id_localizacion = localizacion.id WHERE marcador.id_mapa = {$id}";
 
 $query = $db->query($sql);

 $marcadores = array();
 while ($marcador = $query->fetch_assoc()) { 
  $marcadores[] = $marcador;
 }

 $result = array(
   'status' => 'success',
   'code'  => 200,
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
   'code'  => 200,
   'data' => $marcadores
  );
 
 echo json_encode($result);
});

// Eliminar lógicamente un mapa de un usuario
$app->get('/deleteMapa/:id', function($id) use($app, $db){	
	
	$sql = "UPDATE TP_D_MAPAS SET habilitado = TRUE, eliminado = TRUE, modificacion =  SYSDATE() ".
	"WHERE id = '{$id}'";
		
	$query = $db->query($sql);
	
	if($query){
		$result = array(
			'status' => 'success',
			'code' => 200,
			'message' => 'Mapa eliminado correctamente'
		);
	}else{
		$result = array(
			'status' => 'error',
			'code' => 404,
			'message' => 'El mapa no se ha podido eliminar'
		);
	}
	
	echo json_encode($result);
});

// Añadir una valoración a un mapa
$app->post('/addValoracion/:id', function($id) use($app, $db){	
	
	$json = $app->request->post('json');		
	$data = json_decode($json, true);
	
	$sql = "UPDATE TP_D_MAPAS SET puntuacion = '{$data['puntuacion']}', ";


    if(isset($data['observacion'])){
		$sql .= "observacion = '{$data['observacion']}', ";
	}
	
	$sql.= "modificacion =  SYSDATE(), realizado = TRUE ".
	"WHERE id = '{$id}'";
		
	$query = $db->query($sql);
 
 if($query){
  $result = array(
   'status' => 'success',
   'code' => 200,
   'message' => 'Mapa actualizado correctamente'
  );
 }else{
  $result = array(
   'status' => 'error',
   'code' => 404,
   'message' => 'El mapa no se ha podido actualizar'
  );
 }
 
 echo json_encode($result);
});

// Habilitar un mapa para añadirlo como uno nuevo
$app->get('/habilitarMapa/:id', function($id) use($app, $db){ 
 
 $json = $app->request->post('json');  
 $data = json_decode($json, true);
 
 $sql = "UPDATE TP_D_MAPAS SET habilitado = 1, modificacion =  SYSDATE() WHERE id = '{$id}'";
   
 $query = $db->query($sql);
 
 if($query){
  $result = array(
   'status' => 'success',
   'code' => 200,
   'message' => 'Mapa habilitado correctamente'
  );
 }else{
  $result = array(
   'status' => 'error',
   'code' => 404,
   'message' => 'El mapa no se ha podido habilitar'
  );
 }
 
 echo json_encode($result);
});

/****** MÉTODO ALGORITMO ******/

// Actualización de la base de datos
$app->get('/actualizaBD', function() use($app, $db){

    $a = 0;
    $b = 0;
    $c = 0;

	//Actualizar todos los destacados a null
	$puesta_a_cero = "UPDATE TP_P_LOCALIZACIONES SET destacado = FALSE";

	$query = $db->query($puesta_a_cero);

	//Traer el 30% de los ids de las localicaciones ordenadas descendentemente por puntuacion media
	$limitador = "SELECT ROUND(COUNT(*)*0.3) as num FROM TP_P_LOCALIZACIONES";
    $query = $db->query($limitador);

    $auxs = array();
    while ($aux = $query->fetch_assoc()) {
        $auxs[] = array_values($aux)[0];
    }
    
    
    $sql = "SELECT id FROM TP_P_LOCALIZACIONES ORDER BY puntuacion_media DESC, total_usuarios DESC LIMIT ";
    $sql .= $auxs[0];

    $query = $db->query($sql);

    $localizaciones_id = array();
    while ($localizacion_id = $query->fetch_assoc()){
        $localizaciones_id[] = array_values($localizacion_id)[0];
    }
    
    // Se clasifican las localizaciones por categoria y se contabilizan cuantas localizaciones hay por categoria
    $sql2 = "SELECT COUNT(*) FROM TP_R_LOCALIZACION_CATEGORIA WHERE id_localizacion IN (";

    foreach ($localizaciones_id as $valor) {
        $sql2 .= $valor;
        $sql2 .= ",";
    }
    $sql2 = substr($sql2, 0, -1);
    $sql2 .= ") GROUP BY id_categoria";

    $query = $db->query($sql2);

    $loc_cat = array();
    while ($l_c = $query->fetch_assoc()){
        $loc_cat[] = array_values($l_c)[0];
    }

    // Se coge el id de las dos categorias mas comunes aplicando el algoritmo de la burbuja
    $indices = array();
    for($i = 0;$i < 7;$i++){
        $a = (int)$loc_cat[$i];
        if($a > $b){
            $c = $b;
            $b = $a;
            $indices[0] = $i+1;
        } else if($a > $c){
            $c = $a;
            $indices[1] = $i+1;
        }
    }

    //Se obtienen los id de las localizaciones que tienen asociado el id de categoria recogido en el array indices sin duplicados
    $sql3 = "SELECT DISTINCT id_localizacion FROM TP_R_LOCALIZACION_CATEGORIA WHERE id_categoria IN (";

    foreach ($indices as $valor) {
        $sql3 .= $valor;
        $sql3 .= ",";
    }
    $sql3 = substr($sql3, 0, -1);
    $sql3 .= ")";

    $query = $db->query($sql3);
    $localizaciones_destacadas = array();
    while ($localizacion_destacada = $query->fetch_assoc()){
        $localizaciones_destacadas[] = array_values($localizacion_destacada)[0];
    }
    $destacadas = array_unique($localizaciones_destacadas);

    // Se actualiza el valor del campo "destacado" a si de las localizaciones cuyo id este en el array destacadas
    $sql4 = "UPDATE TP_P_LOCALIZACIONES SET destacado = TRUE WHERE id IN (";

    foreach ($destacadas as $valor) {
        $sql4 .= $valor;
        $sql4 .= ",";
    }
    $sql4 = substr($sql4, 0, -1);
    $sql4 .= ")";

    $query = $db->query($sql4);

	if($query){
		$result = array(
			'status' => 'success',
			'code' => 200,
			'message' => 'Campos actualizados'
		);
	} else {
		$result = array(
			'status' => 'error',
			'code' => 404,
			'message' => 'Campos no actualizados'
		);
	}
	
	echo json_encode($result);
});

// Obtiene todas las localizaciones que coinciden con la busqueda del usuario y "destacado" a si
$app->post('/extraeLocalizaciones', function() use($app, $db){

    $json = $app->request->post('json');
    $data = json_decode($json, true);

    $tiempo = 7 * (int)$data['duracion'];
    $str = '';
    
    $sql = "SELECT * FROM (SELECT id, COUNT(*) as num FROM TP_P_LOCALIZACIONES AS localizaciones INNER JOIN TP_R_LOCALIZACION_CATEGORIA AS localizacion_categoria ON localizaciones.id = localizacion_categoria.id_localizacion WHERE localizacion_categoria.id_categoria IN (2,5,7) AND localizaciones.destacado = 1 GROUP BY localizaciones.id) as tab WHERE num = 3";
    $query = $db->query($sql);

    $id_localizaciones = array();
    while ($id_localizacion = $query->fetch_assoc()) {
        $id_localizaciones[] = array_values($id_localizacion)[0];
    }

    if(sizeof($id_localizaciones) > $tiempo){
        $str = 'Sobrepasa';
    } else {
        $str = 'No sobrepasa';
    }

    //$caracteristicas_usuario = array{0,0,0,0,0,0,0};

    $result = array(
        'status' => 'success',
        'code' => 200,
        'message' => 'Campos actualizados',
        'data' => $str
    );



    // if($query){
	// 	$result = array(
	// 		'status' => 'success',
	// 		'code' => 200,
    //         'message' => 'Campos actualizados',
    //         'data' => $data
	// 	);
	// } else {
	// 	$result = array(
	// 		'status' => 'error',
	// 		'code' => 404,
	// 		'message' => 'Campos no actualizados'
	// 	);
	// }
	
	echo json_encode($result);
});


// Se lanza la aplicación de slim, lanzando todos los méetodos anteriores para que estén disponibles las rutas
$app->run();