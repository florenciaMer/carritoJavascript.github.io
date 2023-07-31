// alta de producto //
const nuevoForm = document.getElementById("altaProducto")
nuevoForm.addEventListener("submit", altaProducto)
 let formSearchSelected = document.getElementById(`searchSelected`)
 formSearchSelected.addEventListener("click", search)

 //valido el ingreso de los campos del input categoria
     let categoriaProducto = document.getElementById("categoria")
     categoriaProducto.addEventListener("input", function (e) { 
     categoriaProductoValue = document.getElementById("categoria").value
     categoriaTrue = validarTxt(categoriaProducto,categoriaProductoValue, "errorCategoria") 
    })

//valido el ingreso de los campos del input nombre
   let nombreProducto = document.getElementById("nombre")
   nombreProducto.addEventListener("input", function (e) { 
   nombreProductoValue = document.getElementById("nombre").value;
   validarTxt(nombreProducto,nombreProductoValue, "errorNombre")
   nombreTrue = validarTxt(nombreProducto,nombreProductoValue, "errorNombre") 
   })

//valido el ingreso de los campos del input precio
   let precioProducto = document.getElementById("precio");
   precioProducto.addEventListener("input", function (e) { 
   precioProductoValue = parseInt(document.getElementById("precio").value);
   validarNum(precioProducto,precioProductoValue, "errorPrecio")
   precioTrue = validarNum(precioProducto,precioProductoValue, "errorPrecio")
   })

 //valido el ingreso de los campos del input cantidad
   let cantidadProducto = document.getElementById("cantidad");
   cantidadProducto.addEventListener("input", function (e) { 
   cantidadProductoValue = parseInt(document.getElementById("cantidad").value);
   validarNum(cantidadProducto,cantidadProductoValue, "errorCantidad")
   cantidadTrue = validarNum(cantidadProducto,cantidadProductoValue, "errorCantidad")
   })

  //valido el ingreso de los campos del input descripcion
  let descripcionProducto = document.getElementById("descripcion");
  descripcionProducto.addEventListener("input", function (e) { 
  descripcionProductoValue = document.getElementById("descripcion").value;
  validarTxt(descripcionProducto,descripcionProductoValue, "errorDescripcion")
  descripcionTrue = validarTxt(descripcionProducto,descripcionProductoValue, "errorDescripcion")
  })


 function altaProducto(e){
  e.preventDefault();
    imagen = "01_crema.jpeg"
   //imagen = document.getElementById("img").files[0].name

   if(categoriaTrue & nombreTrue & cantidadTrue &  precioTrue &descripcionTrue){
      producto = new Producto(arrayProd.length+1, categoriaProductoValue, nombreProductoValue,precioProductoValue, cantidadProductoValue, descripcionProductoValue, imagen) 
      arrayProd.push(producto) 
      //lo convierto a JSON
     const enJSONProductos  = JSON.stringify(arrayProd) 
     localStorage.setItem("arrayProductos", enJSONProductos)
       
       //  btnAddCart.innerText = "El producto ha sido agregado al storage!!"
      console.log("El producto ha sido agregado al storage")
      console.log(localStorage.arrayProductos)
         
      
      //btnInfo.innerText = "El producto ha sido ingresado exitosamente!!"
      Toastify({
         text: `El producto ${producto.nombre} fué agregado al exitosamente al carrito!!`,
         className: "info",
         style: {
           background: "green",
         }
       }).showToast();

     // mostrarCatalogo(arrayProd)
      verProductos();
      btnInfo.addEventListener("click", ()=>{
         btnInfo.style.display = "none"
      })
      //limpio el form
      document.getElementById("categoria").value = ''
      document.getElementById("nombre").value = ''
      document.getElementById("precio").value = ''
      document.getElementById("cantidad").value = ''
      document.getElementById("descripcion").value = ''
   }else{
       !categoriaTrue?(validarTxt(categoriaProducto,categoriaProductoValue, "errorCategoria")):''
      
       !nombreTrue? (validarTxt(nombreProducto,nombreProductoValue, "errorNombre")):''
      
       !precioTrue? (validarNum(precioProducto,precioProductoValue, "errorPrecio")):''
      
       !cantidadTrue? (validarNum(cantidadProducto,cantidadProductoValue, "errorCantidad")):''
      }
       !descripcionTrue? (validarTxt(descripcionProducto,descripcionProductoValue, "errorDescripcion")):''
  
 }

function validarTxt(dato, datoValue, idError){
   //validacion de los input type text
   let error = document.getElementById(idError) 
   if(datoValue === '' || datoValue?.length <=3 || datoValue === undefined){ 
      error.style.display="block"
      error.value = "Debés completar el campo con un texto de mas de 3 caracteres"
      error.margin = "2px" 
   }else{
      error.style.display="none"
      //devuelvo un true para informar que no hay error de validacion y asi poder refrescar el form
      return true
   }
}

function validarNum(dato, datoValue, idError){
   //let regex = /[0-9]+/;
   let error = document.getElementById(idError) 
   if (isNaN(datoValue) || datoValue === undefined){ 
      
      error.style.display="block"
      error.value = "Debés completar el campo con un valor numérico"
      error.margin = "2px"
   }else{
      //devuelvo un true para informar que no hay error de validacion y asi poder refrescar el form
      error.style.display="none"
      return true
   }
}
