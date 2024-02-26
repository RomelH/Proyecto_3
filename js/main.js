//Defino mi array de productos
const productos = [
    {
        id: 1, 
        nombre: "Buzo Garra",
        oferta: true,
        precio: 3000,
        cantidad: 0,
        imagen: "./img/Buzo Garra.jpg"
    },
    {
        id: 2,
        nombre: "Buzo Snax H",
        oferta: false,
        precio: 7000,
        cantidad: 0,
        imagen: "./img/Buzo Snax Hombre.jpg"
    },
    {
        id: 3,
        nombre: "Buzo Waves M",
        oferta: true,
        precio: 5000,
        cantidad: 0,
        imagen: "./img/Buzo Waves Mujer.jpg"
    },
    {
        id: 4,
        nombre: "Jeans Levi's H",
        oferta: false,
        precio: 7000,
        cantidad: 0,
        imagen: "./img/Jeans Levis Hombre.jpg"
    },
    {
        id: 5,
        nombre: "Jeans Mxk M",
        oferta: false,
        precio: 8000,
        cantidad: 0,
        imagen: "./img/Jeans Mistica Mujer.jpg"
    },
    {
        id: 6,
        nombre: "Remera Wild H",
        oferta: true,
        precio: 4000,
        cantidad: 0,
        imagen: "./img/Remera Wild.jpg"
    },
    {
        id: 7,
        nombre: "Remera Wild M",
        oferta: true,
        precio: 4000,
        cantidad: 0,
        imagen: "./img/Remera Calabera Mujer.jpg"
    },
    {
        id: 8,
        nombre: "Jeans Crug M",
        oferta: true,
        precio: 7000,
        cantidad: 0,
        imagen: "./img/Jeans Crug.jpg"
    },
    {
        id: 9,
        nombre: "Chomba Salman",
        oferta: true,
        precio: 4000,
        cantidad: 0,
        imagen: "./img/Chomba Salman.jpg"
    },
    {
        id: 10,
        nombre: "Falda Rusty",
        oferta: true,
        precio: 5000,
        cantidad: 0,
        imagen: "./img/Falda Rusty.avif"
    },
    {
        id: 11,
        nombre: "Camisa Salman",
        oferta: false,
        precio: 8000,
        cantidad: 0,
        imagen: "./img/Camisa Salman.jpg"
    },
    {
        id: 12,
        nombre: "Gorro Azul",
        oferta: true,
        precio: 3000,
        cantidad: 0,
        imagen: "./img/Gorro Azul.jpg"
    },
];
// Local storage
const guardarProductosLS = (productos)=>{
    localStorage.setItem("productos", JSON.stringify(productos));
}

const obtenerProductosLS =()=>{
    return JSON.parse(localStorage.getItem("productos"))|| [];
}

const guardarCarritoLS = (productos)=>{
    localStorage.setItem("productos-en-carrito", JSON.stringify(productos));
}

const obtenerCarritoLS =()=>{
    return JSON.parse(localStorage.getItem("productos-en-carrito"))|| [];
}

const contenedorProductos = document.querySelector("#container-items");
const botonCarrito = document.querySelector(".container-cart-icon");
const containerCartProduct = document.querySelector(".container-cart-products");
let botonesAgregar =document.querySelectorAll(".item-agregar");
const cantidadProductoCarrito = document.querySelector("#contador-productos");

function renderProductos(){
    const productos = obtenerProductosLS();
    
    productos.forEach(producto => {
        console.log(contenedorProductos)
        const div = document.createElement("div");
        div.classList.add("item");
        div.innerHTML = `
            <figure>
            <img
                src="${producto.imagen}"
                alt="producto"
            />
            </figure>
            <div class="info-product">
            <h2>${producto.id}:${producto.nombre}</h2>
            <p class="price">$${producto.precio}</p>
            <button class="item-agregar" id="${producto.id}">Añadir</button>
            </div>
        `;
        contenedorProductos.append(div);
    })
    actualizarBotonesAgregar(); 
    
}
guardarProductosLS(productos);
if(contenedorProductos){
    renderProductos();
}

// Funcionalidad carrito
function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".item-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
    
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarCantidadProductoCarrito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e){
     
    const idBoton = parseInt(e.currentTarget.id);
//    console.log(idBoton);
    const productoAgregado = productos.find(item => item.id === idBoton);
    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

//    console.log(productosEnCarrito)
    actualizarCantidadProductoCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
}

function actualizarCantidadProductoCarrito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    cantidadProductoCarrito.innerText = nuevoNumerito;
}
botonCarrito.addEventListener("click",() => {
    actualizarCantidadProductoCarrito();
   // containerCartProduct.classList.toggle("hidden-cart");
});
