// Paso 1: Crear el servidor
// Paso 2: Verificar el request (en este caso, la ruta comida y el parametro nombre)
// Paso 3: Guardar los datos que vienen (lista de alimentos)
// Paso 4: Cuando llegue la ruta "fin", enviar la lista por correo
var http = require('http');
var url = require('url');
var nodemailer = require('nodemailer');
var alimentos="";


// Configuracion del correo
var transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : 'mencoalexis@gmail.com',
        pass : 'mubdlnbdmgjkukgs'
    }
});

http.createServer(function (request, response) {
    let q = url.parse(request.url, true); // url separada
    // comprobar que la ruta sea "comida" o "fin"
    if(q.pathname=="/comida"){
        // comprobar que exista un solo parametro y sea "nombre"
        if(Object.keys(q.query).length!=1){
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.end("Ruta no encontrada 1");
        } else if (Object.keys(q.query)[0]!='nombre'){
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.end("Ruta no encontrada 2");
        } else {
            alimentos += q.query.nombre+";"
            console.log("alimentos: " +alimentos)
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end("Correcto!");
        }

    }else if (q.pathname=="/fin"){
        var correo = {
            to:"pauli.18ampaimolina@gmail.com",
            from:"curso@node.cl",
            subject:"Lista de ingredientes!",
            text: alimentos
        }
        transporter.sendMail(correo, function(err){
            if(err){
                console.log(err.message)
            }else{
                console.log("correo enviado");
                console.log(info.response)
            }
        })
        response.write("Correo enviado")
    } else {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end("Ruta no encontrada");
    }
}).listen(8081);

console.log('Servidor escuchando (8081)');