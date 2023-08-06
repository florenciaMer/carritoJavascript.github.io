class Producto {
   
    constructor(id, categoria,  nombre, precio, cantidad, descripcion, img){
       this.id = id;
       this.categoria = categoria;
       this.nombre = nombre
       this.precio = precio;
       this.cantidad = cantidad;
       this.descripcion = descripcion; 
       this.img = img
    }

    listarBusqueda = function(){
      const { id, categoria, nombre, precio, cantidad, descripcion, img } = this;
       let trNuevo = document.createElement("tr")
        trNuevo.innerHTML =
             `
                <td scope="row">${id}</td>
                <td>${categoria}</td>
                <td>${nombre}</td>
                <td>$${precio}.-</td>
                <td>${descripcion}</td>
                <td>${img}</td>
             `
             tableCatalogo.append(trNuevo)     
    }
 
 }
 
 //Instanciación de objetos: 
 const instanciacion = async () =>{
 //function instanciacion(){
   document.querySelector('.aCart').style.visibility = 'hidden'
if(arrayProd.length == 0){

const res = await fetch("products.json")
const response = await res.json()

console.log(response)
for(let producto of response){
    let productoData = new Producto(producto.id, producto.categoria, producto.nombre, producto.precio, producto.cantidad,producto.descripcion, producto.img)
    arrayProd.push(productoData)
    
}
localStorage.setItem("arrayProductos", JSON.stringify(arrayProd)) //lo convierto a json

    console.log('array productos')
    console.log(arrayProd)

    console.log('en localstorage')
    console.log(JSON.parse(localStorage.getItem("arrayProductos")))
   // arrayProd.push(producto1, producto2, producto3, producto4, producto5, producto6, producto7)
 

    }else{
      console.log('array produ.lengh >0')
    }
 }

 class Carrito {
    constructor(id,cant,nombre){
       this.id = id;
       this.cant = cant;
       this.nombre = nombre
    } 
    sumarUnidad(){
      this.cantidad = this.cantidad + 1
      return this.cantidad
  }
  
   restarUnidad(){
      this.cantidad = this.cantidad - 1
      return this.cantidad
  }
 }

