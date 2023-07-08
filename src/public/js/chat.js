

const socket = io() 
let user_name
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
    user_name = result.value
    console.log(user_name)
 })

chatBox.addEventListener('keyup',event =>{
    if(event.key === "Enter"){ // el mensaje se enviara cuando el usuario aprete enter
        console.log(chatBox.value)
         console.log(`2 ${chatBox.value.trim().length}`)
        if(chatBox.value.trim().length > 0){ // corroboramos que el input no este vacio o solo contenga espacios //trim remueve los espacios en blanco
           console.log("entre al if")
           socket.emit("message",{user:user_name,message:chatBox.value}); 
           // aca tengo que llamar al post del message
           
         fetch("http://localhost:8080/api/chat", {
                   method: "POST",
                    body: JSON.stringify({
                user_name: user_name,
                 message: chatBox.value,
             }),
             headers: {
                 "Content-type": "application/json; charset=UTF-8"
             }
             })
              .then((response) => response.json())
              .then((json) => console.log(json));
            chatBox.value=""
        }
    }})
   

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