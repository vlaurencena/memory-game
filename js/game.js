var colores = ["rojo", "rojo", "amarillo", "amarillo", "azul", "azul", "verde", "verde", "negro", "negro", "naranja", "naranja", "marron", "marron", "celeste", "celeste"];

var nuevoOrdenColores = [];

var idFichaElegida = null;
var eleccionesJugadorColor = [];
var eleccionesJugadorFicha = [];
var intentos = -1;

// EVENT LISTENER

var eventListener = function (event) {

  if (eleccionesJugadorColor.length === 2) {
    removeEventListener();
  }

  idFichaElegida = event.target.id;
  console.log("idFichaElegida");
  eleccionesJugadorColor.push(nuevoOrdenColores[idFichaElegida])
  eleccionesJugadorFicha.push(idFichaElegida);
  ponerColor();
  chequear();

}

EventListener();

function EventListener() {
  for (let i = 0; i < document.getElementsByClassName("ficha").length; i++) {
    document.getElementsByClassName("ficha")[i].addEventListener("click", eventListener);
  }
  cambiarTexto();
}

function removeEventListener() {

  for (let i = 0; i < document.getElementsByClassName("ficha").length; i++) {
    document.getElementsByClassName("ficha")[i].removeEventListener("click", eventListener);
  }

}
// REORDENAR COLORES

function redordenarColores() {
  var numeroRandom = Math.floor(Math.random() * colores.length);
  var colorRandom = colores[numeroRandom];
  nuevoOrdenColores.push(colorRandom);
  colores.splice(numeroRandom, 1);
}

for (let i = colores.length; i > 0; i--) {
  redordenarColores();
}

// ANIMACION

function ponerColor() {
  document.getElementsByClassName("propiedades-div")[idFichaElegida].classList.add(nuevoOrdenColores[idFichaElegida]);
  document.getElementsByClassName("propiedades-div")[idFichaElegida].classList.remove("gris");
}


function sacarColor() {
  for (let i = 0; i < 16; i++) {
    document.getElementsByClassName("propiedades-div")[eleccionesJugadorFicha[0]].classList.remove(eleccionesJugadorColor[0]);
    document.getElementsByClassName("propiedades-div")[eleccionesJugadorFicha[0]].classList.add("gris");
    document.getElementsByClassName("propiedades-div")[eleccionesJugadorFicha[1]].classList.remove(eleccionesJugadorColor[1]);
    document.getElementsByClassName("propiedades-div")[eleccionesJugadorFicha[1]].classList.add("gris");
  }
}

// CHEQUEAR

function chequear() {

  if (eleccionesJugadorColor.length === 2 && eleccionesJugadorColor[0] === eleccionesJugadorColor[1]) {
    removeEventListener();
    document.getElementsByClassName("propiedades-div")[eleccionesJugadorFicha[0]].classList.remove("ficha");
    document.getElementsByClassName("propiedades-div")[eleccionesJugadorFicha[1]].classList.remove("ficha");
    idFichaElegida = null;
    eleccionesJugadorFicha = [];
    eleccionesJugadorColor = [];
    EventListener();


  } else if (eleccionesJugadorColor.length === 2) {
    removeEventListener();
    setTimeout(function () {
      sacarColor();


    }, 500);

    setTimeout(function () {
      eleccionesJugadorFicha = [];
      eleccionesJugadorColor = [];
      idFichaElegida = null;
      EventListener();

    }, 502);
  }


}

function cambiarTexto() {
  if (document.getElementsByClassName("ficha").length === 0) {
    alert("¡Felicitaciones! ¡Ganaste! Completaste el juego en " + intentos + " intentos.");
  } else if (eleccionesJugadorColor.length === 0) {
    intentos++;
    document.getElementById("texto-nivel").innerHTML = "Número de intentos = " + intentos;
  }
}