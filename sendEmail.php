<?php
$recipient_email    = "sales@kuhovar.com"; //recepient
$from_email         = "sales@kuhovar.com"; //from email using site domain.
    $subject        = "Запрос с сайта";
    $sender_name    = $_POST["name"]; //capture sender name
    $sender_email   = $_POST["email"]; //capture sender email
    $message        = $_POST["message"]; //capture message
    
    //php validation, exit outputting json string
    if(strlen($sender_name)<1){
        print json_encode(array('type'=>'error', 'text' => 'Name is too short or empty!'));
        exit;
    }
    if(!filter_var($sender_email, FILTER_VALIDATE_EMAIL)){ //email validation
        print json_encode(array('type'=>'error', 'text' => 'Please enter a valid email!'));
        exit;
    }
    if(strlen($message)<1){ //check emtpy message
        print json_encode(array('type'=>'error', 'text' => 'Too short message! Please enter something.'));
        exit;
    }

   
    
    //construct a message body to be sent to recipient
    $message_body =  "Message from $sender_name\n";
    $message_body .=  "------------------------------\n";
    $message_body .=  "$message\n";
    $message_body .=  "------------------------------\n";
    $message_body .=  "$sender_name\n";
    $message_body .=  "$sender_email\n";
       $headers = "From:".$from_email."\r\n".
        "Reply-To: ".$sender_email. "\n" .
        "X-Mailer: PHP/" . phpversion();
    $body = $message_body;
        
    $sentMail = mail($recipient_email, $subject, $body, $headers);
    if($sentMail) //output success or failure messages
    {       
        print json_encode(array('type'=>'done', 'text' => 'Thank you for your email'));
        exit;
    }else{
        print json_encode(array('type'=>'error', 'text' => 'Could not send mail! Please check your PHP mail configuration.'));  
        exit;
    }
?>