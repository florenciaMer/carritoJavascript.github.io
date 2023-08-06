
let botonDarkMode = document.getElementById("botonDarkMode")
let botonLightMode = document.getElementById("botonLightMode")
let eliminarModeBtn = document.getElementById("eliminarMode")
let white = document.querySelectorAll('.white')
let h5 = document.getElementsByTagName("h5")
let labels = document.querySelectorAll("label")
let modal = document.querySelector(".modalDark")
let formAlta = document.querySelector("#altaProducto")
let labelOrden = document.querySelector(".labelOrden")
let catalogoDark = document.querySelector('.catalogoDark')
let criterioDark = document.querySelector('.criterioDark')
let inputSearch = document.querySelector('#inputSearch')
console.log(criterioDark)
//leer/consultar localStorage
//si capturamos una clave que no existe, nos devuelve null
let modoOscuro = localStorage.getItem("modoOscuro")

if(modoOscuro == "true"){
   document.body.classList.add("darkMode")
   modal.style.backgroundColor = "gray"
   modal.style.margin = "2px"
   
   let tableCarrito = document.querySelector('.tableCarrito')
   tableCarrito.style.backgroundColor = "white"
   
    let tdDark = document.querySelectorAll('.tdDark')
    for (let i = 0; i < tdDark.length; i++) {
        tdDark[i].style.color = "black";
    }
   
   document.body.classList.add("darkMode")
   //storage
   localStorage.setItem("modoOscuro", true)
    for (let i = 0; i < white.length; i++) {
        white[i].style.color = "white";
    }
    for (let i = 0; i < labels.length; i++) {
        labels[i].style.color = "white";
    }
    let card = document.querySelectorAll(".card")
    
    for (let i = 0; i < card.length; i++) {
        card[i].style.color = "black";
    }
   
}



inputSearch.addEventListener("input", ()=>{
    let card = document.querySelectorAll(".card")
    for (let i = 0; i < card.length; i++) {
        card[i].style.color = "black";
    }
    labelOrden.style.color = "black"
    //localStorage.getItem("modoOscuro") == true ? card.style.color = "black" :''
})

criterioDark.addEventListener("click", ()=>{
    let card = document.querySelectorAll(".card")
    for (let i = 0; i < card.length; i++) {
        card[i].style.color = "black";
    }
    labelOrden.style.color = "black"
     tdDark = document.querySelectorAll('.tdDark')
    for (let i = 0; i < tdDark.length; i++) {
        tdDark[i].style.color = "black";
    }
    //localStorage.getItem("modoOscuro") == true ? card.style.color = "black" :''
})

botonDarkMode.addEventListener("click", ()=>{
   console.log("Funciona botón oscuro")
   //agregar clase de modo oscuro
   modal.style.backgroundColor = "gray"
   modal.style.margin = "2px"
  
   document.body.classList.add("darkMode")
   //storage
   localStorage.setItem("modoOscuro", true)
    for (let i = 0; i < white.length; i++) {
        white[i].style.color = "white";
    }
    for (let i = 0; i < labels.length; i++) {
        labels[i].style.color = "white";
    }
    labelOrden.style.color = "black"
    let tdDark = document.querySelectorAll('.tdDark')
    for (let i = 0; i < tdDark.length; i++) {
        tdDark[i].style.color = "black";
    }
     tableCarrito = document.querySelector('.tableCarrito')
    tableCarrito.style.backgroundColor = "white"
})

botonLightMode.addEventListener("click", ()=>{
   console.log("Funciona botón claro")
   //evento elimina class darkMode y deja el nav por defecto
   document.body.classList.remove("darkMode")
   modal.style.backgroundColor = "white"
   modal.style.margin = "2px"
   localStorage.setItem("modoOscuro", false)
   for (let i = 0; i < white.length; i++) {
    white[i].style.color = "white";
   }
   for (let i = 0; i < white.length; i++) {
    white[i].style.color = "black";
   }
    for (let i = 0; i < labels.length; i++) {
    labels[i].style.color = "black";
   }
   

})
