
const tema = localStorage.getItem("Productos elegidos");
const pasaje=JSON.parse(tema)
let i=1

const tabla = document.getElementById("tabla");


  for (const { equipo, nombre, precio, cantidad} of pasaje) {
let fila=document.createElement("tr")
 
    fila.innerHTML=`
    <th scope="row">${i}</th>
    <td>${nombre} ${equipo}</td>
    <td>${precio}</td>
    <td>${cantidad}</td>
  
    `;
    tabla.appendChild(fila)
    i++;
}

const precio = localStorage.getItem("Precio")
const pasaje1=JSON.parse(precio)

const div=document.getElementById("precio")

div.innerHTML=`Precio total a pagar: ${pasaje1}`

function mensaje() {
  (async () => {
    
    const inputOptions = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          Tarjeta: "Tarjeta",
          Efectivo: "Efectivo",
        });
      }, 1000);
    });

    const { value: pago } = await Swal.fire({
      title: "Seleccionar pago",
      input: "radio",
      inputOptions: inputOptions,
      inputValidator: (value) => {
        if (!value) {
          return "ELIJA UNA OPCION, POR FAVOR!!";
        }
      },
    });

    if (pago=="Tarjeta") {
      const { value: formValues } = await Swal.fire({
        title: 'Datos de la tarjeta',
        html:
          '<input id="swal-input1" class="swal2-input" placeholder="Nombre del titular">' +
          '<input id="swal-input2" class="swal2-input" placeholder="N° de la tarjeta">',
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input2').value
          ]
        }
      })
      
      if (formValues) {
        Swal.fire({
          icon:"success",
          html:`El pago se realizo exitosamente`})
      } 
    }
    if (pago=="Efectivo") {
      const { value: formValues } = await Swal.fire({
        title: 'Efectivo',
        
        html:
  
         '<input id="swal-input1" class="swal2-input" placeholder="Cuanto abonas?">',
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value,
            
          ]
        }
      })
      

    }
    
  })();

deshabilitar()
}



let nombre=document.getElementById("inputNombre").value
let apellido=document.getElementById("inputApellido").value
let direccion=document.getElementById("inputAddress").value
let despedida=document.getElementById("cuerpo")

let formu=document.getElementById("formu")
formu.addEventListener("submit", formulario)

function formulario(e){
  e.preventDefault()
  let data= new Personales(nombre, apellido, direccion)
  let saludo=document.createElement("div")
  despedida.innerHTML=``
  despedida.classList.add("m-0", "vh-100", "row");
  despedida.style.justifyContent="center"
  despedida.style.alignItems="center"
  saludo.classList.add("col-auto")
  saludo.style.textShadow= "5px 5px 5px red";
  

  saludo.innerHTML=`<h1>El pedido será enviado al domicilio ${data.direction}. Gracias por la compra ${data.firstName} ${data.lastName}</h1> <br> 
  <div class="text-center mt-3">
  <a href="index.html" >
    <button >Volver a inicio</button>
  </a>
</div>
`
  despedida.appendChild(saludo) 


}


function Personales(nombre, apellido, direccion) {
  this.firstName = nombre;
  this.lastName = apellido;
  this.direction = direccion;

}

function deshabilitar(){

const inputs=["inputNombre","inputApellido", "inputEmail4", "inputAddress", "inputLocalidad","inputProvincia","inputZip","enviar"]

inputs.forEach(input => { 
  let habilitar=document.getElementById(input);
  habilitar.disabled=false;
  
});

}

