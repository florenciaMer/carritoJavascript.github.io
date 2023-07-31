function updateOnload(){
   
    console.log(parametro)
    
    arrayProd =  JSON.parse(localStorage.getItem("arrayProductos")) 
    //busco el producto
    productoBuscado = arrayProd.find(item => item.id === parametro)
       
    console.log(productoBuscado)
    categoria = document.querySelector("#categoria"); 
    nombre = document.querySelector("#nombre");
    precio = document.querySelector("#precio");
    descripcion = document.querySelector("#descripcion");
    
    categoria.value = productoBuscado.categoria;
    nombre.value = productoBuscado.nombre;
    precio.value = productoBuscado.precio;
    descripcion.innerHTML = productoBuscado.descripcion
 
    categoria = categoria.value 
    nombre = nombre.value 
    precio = precio.value 
    descripcion = descripcion.innerHTML 
 }
 
formEditarProd = document.querySelector("#editarProducto")
categoria = document.querySelector("#categoria").value; 
nombre = document.querySelector("#nombre").value;
precio = document.querySelector("#precio").value;
descripcion = document.querySelector("#descripcion").innerHTML;

console.log('arroy prod')
console.log(arrayProd)
  //busco el indice
  let indice = arrayProd.findIndex(item => item.id == parametro)
  console.log("parametro por url")
  console.log(parametro)
  console.log("indice")
  console.log(indice)
  console.log(arrayProd)
  categoria =arrayProd[indice].categoria
  nombre = arrayProd[indice].nombre
  precio = arrayProd[indice].precio
  descripcion = arrayProd[indice].descripcion

 

  formEditarProd.addEventListener('submit',(e)=>{
     e.preventDefault(e)
     
      categoria = document.querySelector("#categoria").value; 
      nombre = document.querySelector("#nombre").value;
      precio = document.querySelector("#precio").value;
      descripcion = document.querySelector("#descripcion").innerHTML;

      //grabo los valores en el array
    arrayProd[indice].categoria = categoria
    arrayProd[indice].nombre = nombre
    arrayProd[indice].precio = precio
    arrayProd[indice].descripcion = descripcion
     console.log("array con cant modificadas")
     console.log(arrayProd)
     //reemplazo los datos

     //grabo los valores para el localstorage
     const enJSON  = JSON.stringify(arrayProd) //lo convierto a JSON
     localStorage.setItem("arrayProductos", enJSON)

     Toastify({
      text: `El producto ${arrayProd[indice].nombre} fué modificado exitosamente!!`,
      className: "info",
      style: {
        background: "green",
      }
    }).showToast();
})