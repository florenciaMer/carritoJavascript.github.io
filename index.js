

setInterval(() =>{
   let DateTime = luxon.DateTime;
   let dt = DateTime.fromISO(new Date().toISOString());
   fecha.innerHTML = `${dt.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}`
   fecha.innerHTML +=  `  ${dt.toLocaleString(DateTime.TIME_24_WITH_SECONDS)}`

})

/****  funciones ******/
criterio.addEventListener(`change`, orden)

function orden(){
      //METODO FILTER
   //creo un nuevo array para no modificar el original
   busquedasNav.innerHTML = ''
   let arrayOrden = []
   
   if(criterio.value === 'mayorMenor'){
   const mayorMenor = [].concat(arrayProd)
   //de forma ascendente por el atributo precio
   mayorMenor.sort((a,b) => b.precio - a.precio)
   arrayOrden = mayorMenor
   }else if(criterio.value == 'menorMayor'){
      //orden de menor a mayor
      const menorMayor = [].concat(arrayProd)
   //de forma ascendente por el atributo precio
   menorMayor.sort((a,b) => a.precio - b.precio)
   arrayOrden = menorMayor
   }else{
      // orden alfabetico de a a z
      const arrayAlfabetico = [].concat(arrayProd)
      arrayAlfabetico.sort( (a,b) =>{
         if (a.nombre > b.nombre) {
            return 1
         }
         if (a.nombre < b.nombre) {
            return -1
         }
         // a must be equal to b
         return 0
      })
 
   arrayOrden = arrayAlfabetico
   }
   productosDiv.innerHTML=''
   mostrarCatalogo(arrayOrden)
 }
 function buscarPorNombre(array){
   //METODO FILTER
   let nombreBusqueda = prompt("Ingrese el nombre del producto que está buscando")
 
    //nombreBusqueda = nombreBusqueda.toLowerCase()
       let busqueda = array.filter((product) => product.nombre.includes(nombreBusqueda))
       busqueda.length == 0? console.log(`Para el nombre ${nombreBusqueda} no hay coincidencias en nuestro catalogo0000000`)
       : verCatalogo(busqueda)    
 }
 
 function buscarPorDescripcion(array){
    //METODO FILTER
    let productoBusqueda = prompt("Ingrese la descripción que desea buscar")
    //filter que nos devuelva los productos que buscamos que contengan la busqueda
    //creamos una condición compuesta para buscar
    let busqueda = array.filter(
       //(producto) => producto.descripcion.includes(productoBusqueda.toLowerCase()) 
       (producto) => producto.descripcion.includes(productoBusqueda) 
    )
    busqueda.length == 0? console.log(`Para el nombre ${nombreBusqueda} no hay coincidencias en nuestro catalogo0000000`)
       : verCatalogo(busqueda)
 }


function verCatalogo(array){
   tableCatalogo.innerHTML = ''
   let theader = document.createElement(`thead`)
   theader.className = "thead-dark"
   theader.innerHTML=`
      <tr>
         <th scope="col">#</th>
         <th scope="col">Categoría</th>
         <th scope="col">Producto</th>
         <th scope="col">Precio</th>
         <th scope="col">Descripcion</th>
      </tr>
      `
    tableCatalogo.append(theader)
   if(array.length >0){
      let contTableList = document.createElement("div")
   
      array.forEach(product =>product.listarBusqueda())
         contTableList.appendChild(tableCatalogo)
         divListar.className="div-listar"
         divListar.appendChild(contTableList)
   }else{
         divListar.innerHTML +=`<p>No hay productos disponibles</p>`
   }
}

/*function inicializar(){
   let arrayProd =  JSON.parse(localStorage.getItem("arrayProductos")) || [];
   mostrarCatalogo(arrayProd)
}*/
//let productosDiv = document.getElementById("productos")
function mostrarCatalogo(array){
   localStorage.getItem("modoOscuro") == true ? card.style.color = "black" :''
   tableCarrito.innerHTML=''
   productosDiv.innerHTML=''
   divTotal.innerHTML = ''
   
    for(let producto of array ){
       let nuevoProductoDiv = document.createElement("div")
       //agregar class
       nuevoProductoDiv.className = "col-12 col-md-6 col-lg-4 my-2 list-group"
       
       nuevoProductoDiv.innerHTML = `
            <div class="card m-3" style="width: 18rem;">
            <img class="card-img-top" src="./img/${producto.img}" alt="${producto.nombre}">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <h5 class="card-title">$ ${producto.precio}.-</h5>
                <p class="card-text">${producto.descripcion}</p>
            <button id="agregarBtn${producto.id}" class="btn btn-primary">Agregar al carrito</button>
            </div>
        </div>`
       productosDiv.appendChild(nuevoProductoDiv)

      let agregarBtn = document.getElementById(`agregarBtn${producto.id}`)
     
      //eventos
      agregarBtn.addEventListener('click', e=> {
      let cant = 1
         let arrayExisteProducto = almacenado.filter((valor)=> valor.id === producto.id)  
         almacenarItemCarrito(arrayExisteProducto, producto.id, cant, producto.nombre) 
         
         const enJSON  = JSON.stringify(almacenado) //lo convierto a JSON
         localStorage.setItem("carrito", enJSON)
         console.log(localStorage)
        
         console.log(`El producto ${producto.nombre} fue agregado al carrito`)
         //btnAddCart.style.display = "block"
         //btnAddCart.className = "btn btn-success"
         //btnAddCart.innerText = `El producto ${producto.nombre} fué agregado al carrito exitosamente!!`
         //alert para agregar libro
         Toastify({
            text: `El producto ${producto.nombre} fué agregado al carrito exitosamente!!`,
            className: "info",
            style: {
              background: "green",
            }
          }).showToast();

         
         //en un futuro function agregarAlCarrito(producto)
      })
      btnAddCart.addEventListener("click", ()=>{
         btnAddCart.style.display = "none"
      })
    }
 }
/*let catalogo = document.querySelector(`#catalogo`)
catalogo.addEventListener(`click`, () => {
   mostrarCatalogo(arrayProd)
})*/
function almacenarItemCarrito(array, id, cant, nombre){
   if(array.length >0){
      for (let i = 0; i < array.length; i++) {
         cant += array[i].cant
      }
      for (let i = 0; i < almacenado.length; i++) {
         if(almacenado[i].id === id) {
            almacenado[i].cant = cant
         }
      }
   }else{
      let itemCart = new Carrito(id, cant, nombre)
      almacenado.push(itemCart);
   }
}

let ocultarCatalogo = document.getElementById(`ocultarCatalogo`)
//ocultarCatalogo.onclick = () => { productosDiv.innerHTML=''}

 function borrarProducto(){
   //borra por id
  alert('A continuacion se listarán por consola los productos existentes para que indiques el id del que desee eliminar')
  verCatalogo(arrayProd)
  if(arrayProd.length >0){
   
      eliminarId = parseInt(prompt(`Ingrese el id del producto a eliminar`))

      if(regex.test(eliminarId)){
      //creo un array con los id
      let arrayID = arrayProd.map(prod => prod.id)

      //busco el indice del id que ingreso el usuario
      let indice = arrayID.indexOf(eliminarId)

      //elimino esa posicion solo 1 valor
         arrayProd.splice(indice, 1);
         if(arrayProd.length >0){
            verCatalogo(arrayProd)
         }else{
            console.log(`El catálogo está vacío en este momento`)
         }
      }else{
         alert(`Solo debe ser un valor numérico`)
      }
  }
}
function borrarProductoPorNombre(){
   alert('A continuacion se listarán por consola los productos existentes para que indiques el nombre que desees eliminar')
   verCatalogo(arrayProd)
   
   if(arrayProd.length >0){
    
       let eliminar =prompt(`Ingrese el nombre o parte del mismo del producto a eliminar`)
 
       if(!regex.test(eliminar)){
       //recorro el array y voy chequeando si tiene ese nombre para ir eliminando en cada pasada
       
       let array = arrayProd.filter((product) => !product.nombre.includes(eliminar))
      
         arrayProd = array
         arrayProd.length >0? verCatalogo(arrayProd):console.log(`El catálogo está vacío en este momento`)
         
       }else{
          alert(`Solo debe ser un valor de texto`)
       }
   }
 }

 function buscarPorCategoria(categoria){
   //METODO FILTER
   let busquedasNav = document.getElementById('busquedasNav')
   let busqueda = arrayProd.filter(
      (producto) => producto.categoria === categoria 
   )
   if(busqueda.length == 0){

      Toastify({
         text: `No hay productos con la categoría ${categoria} en nuestro catalogo`,
         className: "info",
         style: {
           background: "green",
         }
       }).showToast();

      
      //busquedasNav.innerHTML = `<h4>No hay productos con la categoría ${categoria} en nuestro catalogo</h4>`
    
   }else{
      //busquedasNav.innerHTML = `<h4>Productos en el catálogo para la categoría ${categoria}</h4>`
     // busquedasNav.style.margin = "auto"
     // busquedasNav.style.padding= "2%"

     Toastify({
      text: `Productos en el catalogo para la categoría ${categoria} `,
      className: "info",
      style: {
        background: "green",
      }
    }).showToast();

      mostrarCatalogo(busqueda)
     
   }
}

 function search(){

 document.getElementById("searchSelected").addEventListener("input", function (event) {
   event.preventDefault();
      productosDiv.innerHTML = ''
      let buscado = document.getElementById("inputSearch").value;
     
     // let busqueda = arrayProd.filter((product) => product.nombre.includes(buscado))
     let busquedasNav = document.getElementById('busquedasNav')
     busqueda = arrayProd.filter(
      (dato) => dato.nombre.includes(buscado.toLowerCase())  || dato.descripcion.includes(buscado.toLowerCase()) 
   )
     busqueda.length == 0 ? (
        // busquedasNav.innerHTML = `<h4>No hay Productos en el catálogo para la búsqueda seleccionada <strong>${buscado}</strong></h4>`,
        // busquedasNav.style.marginTop = "3%",
       //  busquedasNav.style.paddingBottom = "1%"
       Swal.fire({
         title: 'Atención',
         background: '#fff',
         text: `No hay productos en nuestro catalogo para la búsqueda seleccionada`,
         icon: 'info',
         confirmButtonText: 'Atención!!!',
         timer:1500

       })
     ):
      (
         busquedasNav.innerHTML = `<h4>Productos en el catálogo para la búsqueda seleccionada <strong>${buscado}</strong></h4>`,
         busquedasNav.style.margin = "auto",
         busquedasNav.style.marginTop = "3%",
         busquedasNav.style.paddingBottom = "1%",
         mostrarCatalogo(busqueda)
      )
      
      buscado.value = ''
   })
 }

function mostrarCarrito(){
   let eliminarBtn;
   
   tableCarrito.innerHTML = ''
   almacenado = JSON.parse(localStorage.getItem("carrito")) || [];
   console.log("almacenado carga de pagina")
   console.log(almacenado)
    if(almacenado.length >0){
      total = 0
   
      console.log("almacenado")
      console.log(almacenado)
      for(let itemCarrito of almacenado ){
         let nuevoCarritoTr = document.createElement("tr")
         // busco los datos del producto con filter
         console.log('array productos')
         console.log(arrayProd)
         busqueda = arrayProd.filter(
            (producto) => producto.id === itemCarrito.id 
         )
         //muestro los datos del producto
         console.log('busqueda')
         console.log(busqueda)
         for(let itemBusqueda of busqueda){
            let subtotal = parseInt(itemBusqueda.precio)* parseInt(itemCarrito.cant)
            nuevoCarritoTr.innerHTML =
            `
            <ul>
               <li class="text-center list-unstyled"><img src="./img/${itemBusqueda.img}" width="56px"</li>
               <li class="text-center list-unstyled">${itemBusqueda.nombre}</li>
               <li class="text-center list-unstyled">$${itemBusqueda.precio}</li>
               <li class="text-center list-unstyled" id="cantidadCart${itemBusqueda.id}">${itemCarrito.cant}</li>
               <li class="text-center list-unstyled">$${subtotal}</li>
               <li class="text-center list-unstyled">
                  <button class= "btn btn-success" id="botonSumarUnidad${itemBusqueda.id}"><i class=""></i>+1</button>
                  <button class= "btn btn-danger" id="botonRestarUnidad${itemBusqueda.id}"><i class=""></i>-1</button> 
                  <button type="button" id="eliminarCarrito${itemBusqueda.id}" class="btn btn-danger"><ion-icon name="trash"></ion-icon></button></button></li>
               <hr>
               </ul>
               `
               total += subtotal
               
               tableCarrito.append(nuevoCarritoTr)
               eliminarBtn = document.getElementById(`eliminarCarrito${itemBusqueda.id}`)
               
               //le paso el id del producto para buscarlo y eliminarlo
            /*idEliminar = document.getElementById("itemBusqueda").innerHTML;
               console.log(idEliminar)*/
               divTotal.innerHTML =`
         
               <div class="d-flex justify-content-between rounded"> 
               <p class="rounded m-0">Total:</p>
               <p class="rounded m-0">$${total}</p>
               </div>
               <hr>
               `
               //evento para sumar una unidad al carro
               document.getElementById(`botonSumarUnidad${itemBusqueda.id}`).addEventListener("click", () =>{
                  
                  //busco el indice del item seleccionado en el array del carrito "almacenado"
                  let indice = almacenado.findIndex(item => item.id == itemBusqueda.id)

                  //le sumo uno
                  almacenado[indice].cant = almacenado[indice].cant + 1

                  //lo convierto a json
                  const enJSON  = JSON.stringify(almacenado) 

                  //lo grabo en el locastorage
                  localStorage.setItem("carrito", enJSON)
                  console.log("sume cantidad + 1")
                  console.log(itemBusqueda.cantidad)  
                  //document.getElementById("cantidadCart${itemBusqueda.id}").innerHTML =  almacenado[indice].cant
                  mostrarCarrito()
               })
               //evento para Restar una unidad al carro
               document.getElementById(`botonRestarUnidad${itemBusqueda.id}`).addEventListener("click", () =>{
                  
                  //busco el indice del item seleccionado en el array del carrito "almacenado"
                  let indice = almacenado.findIndex(item => item.id == itemBusqueda.id)

                  //le resto uno
                  if(almacenado[indice].cant >1){
                    almacenado[indice].cant = almacenado[indice].cant-1 
                   
                    //lo convierto a json
                    const enJSON  = JSON.stringify(almacenado) 
  
                    //lo grabo en el locastorage
                    localStorage.setItem("carrito", enJSON)
                    console.log("reste cantidad  1")
                    console.log(itemBusqueda.cantidad)  
                    //document.getElementById("cantidadCart${itemBusqueda.id}").innerHTML =  almacenado[indice].cant
                    mostrarCarrito()

                  }else{
                     Toastify({
                        text: `No se puede contemplar menos cantidad que 1`,
                        className: "info",
                        style: {
                        background: "red",
                        }
                     }).showToast();
                  }
                  //lo convierto a json
                          })
               eliminarBtn.addEventListener('click', ()=> {
         
                  //busco el indice
               let indice = almacenado.findIndex(item => item.id == itemBusqueda.id)
           
                  //let nombre = almacenado[indice].nombre
                  almacenado.splice(indice, 1);
                  nombre = itemBusqueda.nombre
                  btnAddCart.style.display = "block"
                  btnAddCart.className = "btn btn-success"
                  if(almacenado.length >0){
                     const enJSON  = JSON.stringify(almacenado) //lo convierto a JSON
                     localStorage.setItem("carrito", enJSON)
                     tableCarrito.innerHTML=''

                     //btnAddCart.innerText = "El producto ha sido eliminado!!"
                     Toastify({
                        text: `El producto ${nombre} fué eliminado del carrito!!`,
                        className: "info",
                        style: {
                          background: "green",
                        }
                      }).showToast();
            
                     mostrarCarrito()
                  }else{
                     localStorage.removeItem("carrito")
                     tableCarrito.innerHTML=''
                     divTotal.innerHTML = ''
                    // btnAddCart.innerText = "El carrito está vacío!!"
                     console.log("el carrito esta vacio")
                     Toastify({
                        text: `El carrito está vacío!!`,
                        className: "info",
                        style: {
                          background: "green",
                        }
                      }).showToast();
                     let btnFinalizar = document.querySelector('#botonFinalizarCompra')
                     btnFinalizar.innerHTML = ''

                  }

            })
       }
     }
   }else{

      Toastify({
         text: `El carrito está vacío!!`,
         className: "info",
         style: {
           background: "green",
         }
       }).showToast();
       
      console.log("el carrito esta vacio")
      let btnFinalizar = document.querySelector('#botonFinalizarCompra')
      btnFinalizar.style.display = 'none'
   }

   
}
// modulo de administracion de productos


//listado de productos en formato lista para administrar
function verProductos(){
   tableProductos.innerHTML = ''
   let theader = document.createElement(`thead`)
   theader.className = "thead-dark"
   theader.innerHTML=`
      <tr>
         <th scope="col">#</th>
         <th scope="col">Categoría</th>
         <th scope="col">Producto</th>
         <th scope="col">Precio</th>
         <th scope="col">Descripcion</th>
         <th scope="col">Imagen</th>
         <th scope="col">Eliminar</th>
         <th scope="col">Modificar</th>
      </tr>
      `
   tableProductos.append(theader)
   console.log('arrayProd***************')
   arrayProd =   JSON.parse(localStorage.getItem("arrayProductos"))
   
   if(arrayProd.length >0){
      
      let contTableList = document.createElement("div")
      for (let i = 0; i < arrayProd.length; i++) {
         const element = arrayProd[i];
        
         let trNuevo = document.createElement("tr")
        trNuevo.innerHTML =
             `
                <td scope="row">${arrayProd[i].id}</td>
                <td>${arrayProd[i].categoria}</td>
                <td>${arrayProd[i].nombre}</td>
                <td>$${arrayProd[i].precio}.-</td>
                <td>${arrayProd[i].descripcion}</td>
                <td><img class="card-img-top w-70" src="./img/${arrayProd[i].img}" alt="${arrayProd[i].nombre}"></td>
                <td><button id="eliminarBtn${arrayProd[i].id}" class="btn btn-danger"><ion-icon name="trash"></ion-icon></button></td>
                <td><button id="modificarBtn${arrayProd[i].id}" class="btn btn-primary"><ion-icon name="create"></ion-icon></button></td>
           
             `
             nuevoForm.innerHTML = ""
             tableProductos.append(trNuevo)    
             tableProductos.className = "table"
             let eliminarProdBtn = document.getElementById(`eliminarBtn${arrayProd[i].id}`)
             let modificarProdBtn = document.getElementById(`modificarBtn${arrayProd[i].id}`)
     
             modificarProdBtn.addEventListener('click', e=>{
               window.location.href = "./productosUpdate.html?id=" + arrayProd[i].id;
               
             })
             //evento 
             eliminarProdBtn.addEventListener('click', e=> {
             
                let arrayExisteProductoEnCarrito = almacenado.filter((valor)=> valor.id === arrayProd[i].id)  
                if(arrayExisteProductoEnCarrito.length >0){
                  console.log('el producto existe en el carrito')
                  Toastify({
                     text: `El producto  se encuentra activo en un carrito`,
                     className: "info",
                     style: {
                       background: "green",
                     }
                   }).showToast();

                }else{
                  console.log('el producto No existe en el carrito')
                  let arrayID = arrayProd.map(prod => prod.id)

                     //busco el indice del id que ingreso el usuario
                     let indice = arrayID.indexOf(arrayProd[i].id)
                       nombre = arrayProd[i].nombre
                       
                     //elimino esa posicion solo 1 valor
                        arrayProd.splice(indice, 1);
                        if(arrayProd.length >0){
                           Toastify({
                              text: `El producto fué eliminado exitosamente!!`,
                              className: "info",
                              style: {
                                 background: "green",
                              }
                           }).showToast();

                           const enJSON  = JSON.stringify(arrayProd) //lo convierto a JSON
                           localStorage.setItem("arrayProductos", enJSON)
                           verProductos()
                        }else{
                           console.log(`El catálogo está vacío en este momento`)
                        }
                }
               
             })
         
      }

      contTableList.appendChild(tableProductos)
      divListar.className="div-listar"
      divListar.appendChild(contTableList)
    
      
   }else{
         divListar.innerHTML +=`<p>No hay productos disponibles</p>`
   }
}




