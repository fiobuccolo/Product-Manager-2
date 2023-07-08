console.log("hola")
//clase 10.8  levantar nuestro socket del lado del cliente
const socket = io() // permite instanciar el socket y guardarlo en la constante socket  
//clase 10.9  configuración y uso del socket del lado del servidor  -- en app.js
socket.on("connection",(socket)=>{
    console.log('cliente conectado desde front')
    })

socket.on("disconnect",(socket)=>{
        console.log('se desconecto el backend')
        })

socket.on('products',datos =>{
    console.log(datos)
    const tbody = document.querySelector('.product-table tbody');
    const productos = datos;
    tbody.innerHTML = "";
    productos.forEach(element => {
        console.log(element)
        const row = document.createElement('tr')
        row.innerHTML=`
            <td><img src="${element.img}"</td>
            <td>${element.name}</td>
            <td>${element.description}</td>
            <td>${element.price}</td>
            <td>${element.stock}</td>
            <td>
             <button class="borrarProducto" data-id="${element.id}">
                <i class="fas fa-trash-alt"></i>
             </button>
            </td>`
            tbody.appendChild(row);

            const botonBorrar = row.querySelector('.borrarProducto');
            botonBorrar.addEventListener('click', () => {
                const productoId = botonBorrar.dataset.id;
                console.log({ productoId });
                socket.emit('products', productoId);})
    });
})

let user
let chatBox = document.getElementById("chatBox");

Swal.fire({
    tittle:"Enter your name",
    input: "text", 
    text:"Please enter your name to continue",
    inputValidator: (value) =>{
        return !value && 'Necesitas escribir un nombre de usuario para continuar' 
    },
    allowOutsideClick: false,
    icon:"success",
}) .then (result =>{
    user=result.value
})

chatBox.addEventListener('keyup',event =>{
    if(event.key === "Enter"){ // el mensaje se enviara cuando el usuario aprete enter
        console.log(chatBox.value)
        if(chatBox.value.trim().length > 0){ // corroboramos que el input no este vacio o solo contenga espacios //trim remueve los espacios en blanco
         //   console.log("entre al if")
            console.log(chatBox.value)
            socket.emit("message",{user:user,message:chatBox.value}); 
            chatBox.value=""
        }
    }
})

socket.on("messageLogs",(messages)=>{
    let log = document.getElementById("messageLogs"); 
    let msjs = ""
    log.innerHTML="";
    messages.forEach(message => {
        //let messageElement = document.createElement("div");
        //messageElement.innerHTML = `<strong>${message.user}</strong>: ${message.message}`;     
        //log.appendChild(messageElement);   
        msjs += `<p><strong>${message.user}</strong>: ${message.message}</p>`;     
    });
    log.innerHTML = msjs
})
socket.on("messageConected", (data) =>{
    let log = document.getElementById("messageLogs");
    log.innerHTML += `<p><strong>${data}</strong></p>`;     
})


/*  
io hace referencia a socket.io-- se le llama asi por convencion
*/

//clase 10.9  configuración y uso del socket del lado del servidor  --> (en app.js)
// primero establecer una conexion con un socket-- "quedate escuchando servidor"·

// clase 10.11 para poder recibir un mensaje alguien lo tiene que emitir
