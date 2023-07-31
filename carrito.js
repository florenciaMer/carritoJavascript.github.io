let btnFinalizar = document.querySelector('#botonFinalizarCompra')
btnFinalizar.addEventListener("click", ()=>{
    Swal.fire({
        title: 'Está seguro de realizar la compra',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, cancelare la compra',
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
    }).then((result) => {
        if(result.isConfirmed){
           //finalizar compra con todos sus detalles
           //a nivel DOM avisarle que se realizo la compra
           let totalFinal = total
           Swal.fire({
              title: 'Compra realizada',
              icon: 'success',
              confirmButtonColor: 'green',
              text: `Muchas gracias por su compra ha adquirido nuestros productos. Debe pagar $${total} `,
              color:'white'
            })
            tableCarrito.innerHTML=''
            btnFinalizar.style.display = "none"
           //nivel arrays resear productosEnCarrito
           almacenado = []
           localStorage.removeItem("carrito")
           divTotal.innerHTML = ''
        }else{
           Swal.fire({
              title: 'Compra no realizada',
              icon: 'info',
              text: `La compra no ha sido realizada! Atención sus productos siguen en el carrito!!`,
              confirmButtonColor: 'green',
              color:'white',
              timer:3500
          })
        }
    } )
})
