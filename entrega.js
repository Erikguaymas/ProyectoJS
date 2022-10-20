let i;
let array = [];
let modal = document.getElementById("modal");

let subtotal = document.getElementById("subtotal");
let sumaParcial = 0;

let idem = document.getElementById("nombre");
idem.addEventListener("keypress", validar);

function validar(event) {
  var key = event.keyCode;
    if ((key < 65 || key > 90) && (key > 122 || key < 97) && (key = !13)) {
      event.preventDefault();
      }
}

let clickeo = document.getElementById("formu");
    clickeo.addEventListener("submit", muestra);

function muestra() {
  clickeo.remove();
  
  Swal.fire(`Hola bienvenido ${idem.value}, acontinuación te mostraremos los productos disponibles`)
  mostrar()
}

let deportivos=[]



    const mostrar= async () => {
        const resp = await fetch('./datos.json')
        const datas = await resp.json()
 
  deportivos=datas
let div = document.getElementById("cards");
  console.log(deportivos);
  buscador(deportivos)

  deportivos.forEach((elemento, indice) => {
    
    let cont = document.createElement("div");
    cont.className = "card";
    cont.style.maxWidth = "400px";
    cont.innerHTML = `
<div class="row g-0">
  <div class="col-md-4">
    <img src="${elemento.imagen}"  class="img-fluid rounded-start" alt="ERROR">
  </div>
<div class="col-md-8">
  <div class="card-body">
    <h5 class="card-title">${elemento.nombre} ${elemento.equipo}</h5>
    <p class="card-text">Precio: $${elemento.precio}</p>
    <button  type="button" class="btn btn-dark" onClick="agregar(${indice})">Agregar al carrito</button>
  </div>
</div>
</div>
<div class="accordion">
<div class="accordion-item" >
<h2 class="accordion-header" >
<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" onClick="ocultar(${indice})">
  Ver detalle
</button>
</h2>
<div  class="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
<div class="accordion-body">
  ${elemento.detalle}
</div>
</div>
</div>
</div>
`;
  div.appendChild(cont);
  });
}


function ocultar(indice){

const div=document.getElementsByClassName("accordion-collapse")
const button=document.getElementsByClassName("accordion-button")
if(div[indice].classList.contains('show')){
div[indice].classList.remove("show")
button[indice].classList.add("collapsed")
}

else{
  div[indice].classList.add("show")
  button[indice].classList.remove("collapsed")
}


}

function agregar(indice) {
  console.log(deportivos)
  const repe = array.some((el) => {
    return deportivos[indice].id == el.id;
  });
  const index = array.findIndex((el) => {
    return deportivos[indice].id == el.id;
  });
  
  if(repe){
     (array[index].cantidad = array[index].cantidad + 1);
      actualizar();
      almacenar();
      
      toas(array, index);
  }else{ 
      (deportivos[indice].cantidad = 1);
      //SPREAD ARRAY DE OBJECTOS
      (elemento = [deportivos[indice]]);
      (array = [...array, ...elemento]);
      
      actualizar();
      almacenar();
      toas(deportivos, indice);
}
}
function actualizar() {
  modal.innerHTML = " ";

  array.forEach((el, ind) => {
    let subido = document.createElement("div");

    subido.innerHTML = `<div>
    <div><h2>${el.nombre} de ${el.equipo}</h2>
    <button type="button" id="boton1" onclick="cambio(${ind},'+')">+</button>
    <button type="button" id="boton2"  onclick="cambio(${ind},'-')">-</button>
    
    </div>
<p>Precio: ${el.precio}</p>
</div>
<p>Cantidad: ${el.cantidad}</p>`;

    modal.appendChild(subido);

    sumaParcial = array.reduce(
      (acumulador, elemento) =>
        acumulador + elemento.precio * elemento.cantidad,
      0
    );
    subtotal.innerText = `Subtotal: ${sumaParcial}`;
  });
}  

function cambio(ind, e){

  if(e=="+"){
    array[ind].cantidad  = array[ind].cantidad + 1
  console.log(array[ind].cantidad)
 actualizar();
 almacenar();
  }
 
 if(e=="-"){
  array[ind].cantidad -= 1
        if(array[ind].cantidad==0){
          array.splice(ind, 1);
          actualizar();
    almacenar();
        
    }
    actualizar();
    almacenar();
    }
 }

 function vaciarCarrito() {
  let long = array.length;
  array.splice(0, long);
  sumaParcial = 0;
  subtotal.innerText = `Subtotal: ${sumaParcial}`;
  actualizar();
}


function compra() {
  

  tot = array.reduce(
    (acumulador, elemento) => acumulador + elemento.precio * elemento.cantidad,
    0
  );

  almacenar(tot);

 
}


function almacenar(tot) {
  const pasaje = JSON.stringify(array);
  localStorage.setItem("Productos elegidos", pasaje);
  const precio=JSON.stringify(tot)
  localStorage.setItem("Precio", precio);

}

let div1 = document.getElementById("cards");

function filtro(categoria){
  console.log(categoria)
  if (categoria == "general") {
    div1.innerHTML = "";
    mostrar();
    
  }
  else{
    filtracion(deportivos.filter(produ =>
produ.nombre==categoria
    ))
   
  }

}

function filtracion(filtrado) {
  console.log(filtrado);
  div1.innerHTML = "";
  filtrado.forEach((elemento) => {
    let cont = document.createElement("div");
    cont.className = "card";
    cont.style.maxWidth = "400px";
    cont.style.maxHeight = "200px";
    cont.innerHTML = `
<div class="row g-0">
  <div class="col-md-4">
    <img src="${elemento.imagen}"  class="img-fluid rounded-start" alt="ERROR">
  </div>
<div class="col-md-8">
  <div class="card-body">
    <h5 class="card-title">${elemento.nombre} ${elemento.equipo}</h5>
    <p class="card-text">Precio: $${elemento.precio}</p>
    <button  type="button" class="btn btn-dark" onClick="agregar(${
      elemento.id - 1
    })">Agregar al carrito</button>
  </div>
</div>
</div>
`;
    div1.appendChild(cont);
  });
}

 function toas(array, index) {
  Toastify({
    text: `Se agregó ${array[index].nombre} de ${array[index].equipo}`,
    duration: 3000,
    gravity: `bottom`,
  }).showToast();
}

let resultados=document.getElementById("candidatos")
  let search= document.getElementById("buscador")
  
function buscador(deportivos){
  const array2=[]
  console.log(deportivos)
  deportivos.forEach(element => {
       

    producto=`${element.nombre} ${element.equipo}`

   
        array2.push(producto)
        
    })
  search.addEventListener("keyup", buscar)

  function buscar(e){
  

    busqueda=e.target.value
    letra=busqueda.charAt(0)
    letraM=busqueda.charAt(0).toLocaleUpperCase()
    palabra=busqueda.replace(letra,letraM)
    
    filtro(palabra)
  }
function filtro(palabra){
  console.log(palabra)
  resultados.innerHTML=""

    array2.forEach(element => {
       
    let a=document.createElement("div")
        
   
    if(element.includes(palabra)) {
        
        a.innerHTML=`<p>${element}</p>`
        resultados.appendChild(a)
        resultados.style.display="block"
        resultados.style.maxWidth="400px"
    } 
});

if(resultados.innerHTML==""){
  resultados.style.display="block"
  resultados.style.maxWidth="400px"
    resultados.innerHTML="<p>Producto no encontrado</p>"
    
}
if(palabra==""){
  resultados.style.display="none"
}
}}


