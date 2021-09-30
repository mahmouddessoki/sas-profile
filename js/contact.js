let nameRegx = /^[A-z]{3,20}$/
let emailRegx = /\S+@\S+\.\S+/
$("input[type='text']").keyup(()=>{
   
    if(! nameRegx.test($("input[type='text']").val())) {
        $("input[type='text'] + .alert").css("display","block");
    }else {
        $("input[type='text'] + .alert").css("display","none");

    }
    
})
$("input[type='email']").keyup(()=>{
   
    if(! emailRegx.test($("input[type='email']").val())) {
        $("input[type='email'] + .alert").css("display","block");
    }else {
        $("input[type='email'] + .alert").css("display","none");

    }  
})



// -----------------------------------------------
const myform = document.getElementById("myform");

myform.addEventListener('submit',function (e) {
    e.preventDefault();
    var name = $("input[type='text']").val();
    var email = $("input[type='email'").val();
    var message = $("textarea").val();
    if (emailRegx.test(email) && nameRegx.test(name) && (message.length > 0)) {
        // console.log("hii")
        sendmessage(name,email,message);
    } else {
        if (! emailRegx.test(email)) {
            $("input[type='email'] + .alert").css("display","block");
            if(! nameRegx.test(name)) {
                $("input[type='text'] + .alert").css("display","block");
                if(message.length < 0) {
                    $("textarea + .alert").css("display","block");
                }
            }if(message.length < 0) {
            $("textarea + .alert").css("display","block");
            }
            
        }else if (! nameRegx.test(name)) {
            $("input[type='text'] + .alert").css("display","block");
            if(message.length < 0) {
                $("textarea + .alert").css("display","block");
            }
        }else {
            $("textarea + .alert").css("display","block");

        }
    }
     
        


    
        
})

async function sendmessage(name,email,message) {
    const params = {
        name: name,
        email: email,
        message :message

    };
    const options = {
        method: 'POST',
        body: JSON.stringify( params )  
    };
    var response = await fetch("http://localhost/delta%20site/php/contact.php",options)
    .then( response => response.json() )
    .then( response => {
        if(response['result'] == "success") {
            console.log("yes")
            $(".alert-success").animate({"opacity":"1"},200)
            $(".alert-danger").css("opacity","0")
        } else{
            $(".alert-danger").animate({"opacity":"1"},200)
            $(".alert-success").css("opacity","0")

        }
    } );
}