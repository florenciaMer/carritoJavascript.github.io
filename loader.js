//setTimeout para imprimir los productos 
setTimeout(()=>{
    loaderTexto.remove()
    loader.remove()
    mostrarCatalogo(arrayProd)
 },2000)