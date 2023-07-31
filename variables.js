let nuevoDiv = document.createElement("div")
let divListar = document.querySelector(`#listar`)
let arrayProd =  JSON.parse(localStorage.getItem("arrayProductos")) || [];
let almacenado = JSON.parse(localStorage.getItem("carrito")) || [];
let busquedaSearch
let btnAddCart = document.querySelector("#btnInfoAddCart")
let tableCatalogo = document.querySelector(".table")
let aromas = "aromas"
let cremas = "cremas"
let ofertas = "ofertas"
let regex = /[0-9]+/;
let divTotal = document.querySelector('.divTotal')
let btnInfo = document.querySelector(`.btnInfo`)
    btnInfo.style.display = "block"
    btnInfo.className = "btn btn-success"
let tableCarrito = document.querySelector('.tableCarrito')

let total = 0;
let divCarrito = document.querySelector(".divCarrito")
let eliminarBtn
let busqueda =[]// grabo el detalle de precio y nombre del producto que esta en el carrito    
let producto = {}
let productosDiv = document.getElementById("productos")
let fecha = document.querySelector('.fecha')
let criterio = document.getElementById("criterio")
let btnProductos = document.querySelector('btnProductos')
// validacion de alta productos
let categoriaTrue
let nombreTrue
let precioTrue
let cantidadTrue
let descripcionTrue
let imgTrue

let categoriaProductoValue
let nombreProductoValue
let precioProductoValue
let cantidadProductoValue
let descripcionProductoValue

let categoria
let nombre
let precio
let descripcion
let tableProductos = document.querySelector('.tableProductos')
let formEditarProd

const url = window.location.search;
const urlParametro = new URLSearchParams(url);
const parametro = parseInt(urlParametro.get("id"));

let productoBuscado

let loader = document.getElementById("loader")
let loaderTexto = document.getElementById("loaderTexto")