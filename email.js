//contraseña del correo generada: 

//1.- cargamos el nodemailer
var nodemailer=require('nodemailer');

//2.1- configuracion del servidor
var transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : 'contacto@facebook.com',
        pass : 'aquí va la contraseña'
    }
});
//2.2.- construir el mensaje de correo
var mailOptions = {
    from : 'contacto@facebook.com',
    to : 'destino@gmail.com',
    subject: 'asunto',
    text: "mensaje"
};
//3.- enviar el correo
transporter.sendMail(mailOptions,function(err,info){
    if(err){
        console.log(err.message)
    }else{
        console.log(info.response);
    }
})
