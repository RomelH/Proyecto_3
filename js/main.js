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

class Carrito {
    constructor() {
        this.productos = [];
        this.descuento = 10;
        this.maxProductosParaDescuento = 3;
        this.descuentoPorProducto = 0;
        this.totalPagar = 0;
    }
    
    agregarProducto(id) {
        let cantProd = 0;
        let producto = productos.find(prod => prod.id === id);
        console.log(producto);
        
        if (producto) {
            console.log(producto.oferta);
            if(producto.oferta===true){
                cantProd = parseInt(prompt("Ingrese cantidad de " + producto.nombre + ". \nOferta: Si compra 3 o mas 10% de descuento" ));
            } else {
                cantProd = parseInt(prompt("Ingrese cantidad de " + producto.nombre + ":" ));
            }
            console.log(cantProd);
            if(cantProd){
                if(this.productos.some(prod => prod.id === id)){
                    producto.cantidad += cantProd;
                } else {
                    producto.cantidad = cantProd;
                    this.productos.push(producto);
                    console.log(this.productos.cantidad)
                }
            }
        } else {
            console.log("No se encontró el Producto con #" + id + "!");
        }
    }

    actualizarCantidadProductoCarrito(){
        return this.productos.reduce((acc, producto) => acc + producto.cantidad,0);
    }

    listarCarrito() {
        let salida = "";
    
        this.productos.forEach(item => {
            salida += item.id + " - " + item.nombre + " - $" + item.precio + "  " + item.cantidad + " Unid.\n";
        })
    
        return salida;
    }

    aplicarDescuento() { //Si tengo 3 o más productos con oferta en mi Carrito, aplico un descuento
        let descuentoTotal = 0;
        this.productos.forEach(item => {
            if((item.oferta === true) && (item.cantidad >= this.maxProductosParaDescuento)){
                descuentoTotal += (((item.precio*item.cantidad)*this.descuento) / 100);
            }
        });
        return descuentoTotal;
    }

    calcularTotalPagar() {
        let total = 0;

        this.productos.forEach(item => {
           total += (item.precio*item.cantidad);
        });

        return total;
    }
}

function listarProductos() {
    let salida = "";

    productos.forEach(item => {
        salida += item.id + " - " + item.nombre + " - $" + item.precio + "\n";
    });
    return salida;
}

const carrito = new Carrito();
//let opcionSeleccionada = 10;




// while (opcionSeleccionada != 0) {
//     opcionSeleccionada = parseInt(prompt("Seleccione el producto a agregar al Carrito: (0 para Salir)\n\n" + listarProductos()));

//     if (opcionSeleccionada == 0) {
//         break;
//     }

//     carrito.agregarProducto(opcionSeleccionada);
// }

// let productosCarrito = "Detalle:\n" + carrito.listarCarrito();
// let salidaSubTotal = "Subtotal: $" + carrito.calcularTotalPagar();
// let salidaDescuento = "Descuento: $" + carrito.aplicarDescuento();
// let montoFinal = "Total: $" + Math.round(carrito.calcularTotalPagar() - carrito.aplicarDescuento());
//alert(productosCarrito + "\n" + salidaSubTotal + "\n" + salidaDescuento + "\n" + montoFinal + "\nGracias por su compra!!");

