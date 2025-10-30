'use strict'; 

 
//Quiénes van a jugar en mi código
const select = document.querySelector('.player-move');         
const botonJugar = document.querySelector('button.btn.btn-primary'); 
const mensaje = document.querySelector('.cta');

// Dónde guardo los puntos
const scores = document.querySelectorAll('.scoreboard .score');
const scoreJugador = scores[0];
const scorePc = scores[1];

// Estado del juego
let rondas = 0;
let puntosJugador = 0;
let puntosPc = 0;

// Función obligatoria (NO modificar)
function getRandomNumber(max) { 
  return 1 + parseInt(Math.random() * max); 
}

//Cómo decide el PC su jugada. 
// El PC elige un número del 1 al 3, y cada número representa una jugada.
//Si sale 1, devuelve "piedra". Si sale 2, devuelve "papel".Si sale 3, devuelve "tijera".

function getComputerMove() {
  const randomNumber = getRandomNumber(3);
  if (randomNumber === 1) {
    return 'piedra';
  } else if (randomNumber === 2) {
    return 'papel';
  } else {
    return 'tijera';
  } 
}

// Decide el resultado de la ronda para la jugadora
// -> "empate" | "gana" | "pierde"
function resolverRonda(jugadora, pc) {
  if (jugadora === pc) return 'empate';
  if (
    (jugadora === 'piedra' && pc === 'tijera') ||
    (jugadora === 'papel' && pc === 'piedra') ||
    (jugadora === 'tijera' && pc === 'papel')
  ) {
    return 'gana';
  }
  return 'pierde';
}


//Al hacer clic en "Jugar"
botonJugar.addEventListener('click', () => {
   // a) ¿Ya se terminó?
  if (rondas >= 10) {
    mensaje.textContent = 'Juego terminado (10 movimientos).';
    botonJugar.disabled = true;
    botonJugar.textContent = 'Terminado';
    return;
  }
   // b) Leer y validar elección de la jugadora
  const jugadora = (select.value || '').toLowerCase(); // Leo la jugada de la jugadora
    if (!['piedra', 'papel', 'tijera'].includes(jugadora)) {
    mensaje.textContent = 'Elige una jugada…';
    return; // no seguimos si no eligió bien
  }

   // c) Jugada del PC
  const pc = getComputerMove();

  // d) Resolver resultado
  const resultado = resolverRonda(jugadora, pc);

  // e) Mostrar mensaje + sumar puntos si corresponde
  if (resultado === 'empate') {
    mensaje.textContent = 'Empate.';
  } else if (resultado === 'gana') {
    mensaje.textContent = '¡Has Ganado!';
    puntosJugador++;
    scoreJugador.textContent = String(puntosJugador);
  } else {
    mensaje.textContent = '¡Has perdido!';
    puntosPc++;
    scorePc.textContent = String(puntosPc);
  }

   // f) Contar la ronda
  rondas++;

   // g) ¿Se llegó al final?
  if (rondas >= 10) {
    mensaje.textContent += ' — Juego terminado (10 movimientos).';
    botonJugar.disabled = true;
    botonJugar.textContent = 'Terminado';
  }
});


