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
    tbody.innerHTML = '';
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


/*  
io hace referencia a socket.io-- se le llama asi por convencion
*/

//clase 10.9  configuración y uso del socket del lado del servidor  --> (en app.js)
// primero establecer una conexion con un socket-- "quedate escuchando servidor"·

// clase 10.11 para poder recibir un mensaje alguien lo tiene que emitir
