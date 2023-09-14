function guardarJugadores() {
  var inputElement1 = document.getElementById("p1").value;
  var inputElement2 = document.getElementById("p2").value;

  sessionStorage.setItem("inputElement1", inputElement1);
  sessionStorage.setItem("inputElement2", inputElement2);
  var jugador1 = sessionStorage.getItem("inputElement1");
  var jugador2 = sessionStorage.getItem("inputElement2");

  console.log("Nombre del Jugador X:", jugador1);
  console.log("Nombre del Jugador O:", jugador2);
  
  // Redirigir a la página "juego.html"
  window.location.href = "juego.html";
}

const cuadrados = Array.from(document.querySelectorAll(".cuadrado"));
const modal = document.querySelector("dialog");
const textoModal = modal.querySelector("h2");
let estadoJuego = "P1";  
const x = "X";
const o = "O";

guardarJugadores()



cuadrados.forEach(function(cuadrado, i) {
  cuadrado.addEventListener("click", function() {
    if (estadoJuego != "pausa") {
      // Si el juego está en pausa, no hagas nada.
          if (cuadrado.textContent === "") {
      // Si el cuadrado está vacío, continúa.
      if (estadoJuego === "P1") {
        cuadrado.innerText = "X";
      } else {
        cuadrado.innerText = "O";
      }

      const ganador = siSeGano();
      if (typeof ganador === "object") {
        quienGano(ganador);
        return;
      }

      if (ganador === "empate") {
        mostrarModal("Empataron rey");
      }

      if (estadoJuego === "P1") {
        estadoJuego = "P2";
      } else {
        estadoJuego = "P1";
      } // Alternar turnos.
    }
    }


  });
});

function siSeGano() {
  const tablero = cuadrados.map(cuadrado => cuadrado.textContent);
  console.log(tablero);

  //horizontales
  for (let i = 0; i <= 9; i += 3) {
    if (
      tablero[i] &&
      tablero[i] === tablero[i + 1] &&
      tablero[i] === tablero[i + 2]
    ) {
      return [i, i + 1, i + 2];
    }
  }

  //verticales
  for (let i = 0; i <= 9; i += 1) {
    if (
      tablero[i] &&
      tablero[i] === tablero[i + 3] &&
      tablero[i] === tablero[i + 6]
    ) {
      return [i, i + 3, i + 6];
    }
  }

  //oblicuas
  if (tablero[0] && tablero[0] === tablero[4] && tablero[0] === tablero[8]) {
    return [0, 4, 8];
  }
  if (tablero[2] && tablero[2] === tablero[4] && tablero[2] === tablero[6]) {
    return [2, 4, 6];
  }

  if (tablero.includes("")) return false;
  return "empate";
}

function quienGano(posicionGanadora) {
  console.log("ganador ", posicionGanadora);
  posicionGanadora.forEach(posicion => {
    cuadrados[posicion].classList.toggle("ganador", true);
  });

  mostrarModal("Gano el Jugador: " + estadoJuego);
  estadoJuego = "pausa";
}

function mostrarModal(texto) {
  textoModal.innerText = texto;
  modal.showModal();
}

modal.querySelector("button").addEventListener("click", () => {
  cuadrados.forEach(cuadrado => {
    cuadrado.textContent = "";
    cuadrado.classList.toggle("ganador", false);
    modal.close();
    estadoJuego = "P1";
  });
});
