<?php
    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    $subject = "Delta Trade Group Contact";
    $header = "From:abc@somedomain.com \r\n";
    $header .= "Cc:afgh@somedomain.com \r\n";
    $header .= "MIME-Version: 1.0\r\n";
    $header .= "Content-type: text/html\r\n";
    $to = "dinfo@deltatrade-eg.com";
    $postdata = file_get_contents("php://input");
    $response=[]; 
    if(isset($postdata) && !empty($postdata))
    {
        $request=json_decode($postdata);
        $name = $request->name;
        $email = $request->email;
        $message = $request->message."<br>"."has been sent from <br>".
        "<a href='mailto:$email'>$email</a>";
        $retval = mail($to,$subject,$message,$header); 
        if( $retval == true ) {
            $response['result'] = "success";
        }else {
         $response['result'] = "error";
        }

    }
    echo json_encode($response); 
?>