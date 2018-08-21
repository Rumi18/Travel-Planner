<?php
    require_once 'vendor/autoload.php';
    require_once 'C:\wamp64\bin\php\php5.6.35\pear\Mail.php';

    //Configuracion de cabeceras
    header('Content-type: application/json');
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    $method = $_SERVER['REQUEST_METHOD'];
    if($method == "OPTIONS") {
        die();
    }

    $errors = '';

    if (empty($errors)) {
        // Datos a enviar
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);

        //Datos del emisor
        $from_email = '<kronos.8721@gmail.com>';
        $message = 'Su usuario es '.$request->user_name.' y su password es '.$request->user_passwd;
        $from_name = 'TravelPlanner';

        //Datos del destinatario
        $to_email = $request->email;

        $contact = "<p><strong>Name:</strong> $from_name</p>
                                <p><strong>Email:</strong> $from_email</p>";

        $content = "<p>$message</p>";

        $email_subject = "Correo de recuperacion";

        $email_body = '<html><body>';
	    $email_body .= "$contact $content";
        $email_body .= '</body></html>';
        
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
        $headers .= "From: $from_email\n";
        $headers .= "Reply-To: $from_email";

        $smtp = Mail::factory('smtp', array(
            'host' => 'ssl://smtp.gmail.com',
            'port' => '587',
            'auth' => true,
            'username' => 'kronos.8721@gmail.com',
            'password' => 'lIONWOLF21?210887'
        ));

        $aux = "<".$to_email.">";

        $body = "Hello";

        $headers = array(
            'From' => $from_email,
            'To' => $aux,
            'Subject' => $subject
        );

        var_dump($subject);

        $mail = $smtp->send($aux, $headers, $body);

        // mail($to_email,$email_subject,$email_body,$headers);

        // $response_array['status'] = 'success';
        // $response_array['from'] = $from_email;
        // echo json_encode($response_array);
        // echo json_encode($from_email);
        // header($response_array);
        // return $from_email;
        
    } /*else {
        $response_array['status'] = 'error';
        echo json_encode($response_array);
        header('Location: /error.html');
    }*/