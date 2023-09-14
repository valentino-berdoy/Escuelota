const modal2 = document.getElementById("modalInicio");
const cuadrados = Array.from(document.querySelectorAll(".cuadrado"));
const modal1 = document.getElementById("modalReinicio");
const textoModal = modal1.querySelector("h2");
let estadoJuego = "P1";
const x = "X";
const o = "O";
turnito = document.getElementById("turno");

modal2.showModal();

cuadrados.forEach(function(cuadrado, i) {
  cuadrado.addEventListener("click", function() {
    if (estadoJuego != "pausa") {
      // Si el juego está en pausa, no hagas nada.
      if (cuadrado.textContent === "") {
        // Si el cuadrado está vacío, continúa.
        if (estadoJuego === "P1") {
          cuadrado.innerText = "X";
          turnito.textContent = jugador2;
        } else {
          cuadrado.innerText = "O";
          turnito.textContent = jugador1;
        }

        const ganador = siSeGano();
        if (typeof ganador === "object") {
          quienGano(ganador);
          return;
        }

        if (ganador === "empate") {
          mostrarModal1("Empataron :0");
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

function guardarJugadores() {
  var inputElement1 = document.getElementById("p1").value;
  var inputElement2 = document.getElementById("p2").value;

  sessionStorage.setItem("inputElement1", inputElement1);
  sessionStorage.setItem("inputElement2", inputElement2);
  jugador1 = sessionStorage.getItem("inputElement1");
  jugador2 = sessionStorage.getItem("inputElement2");

  console.log("Nombre del Jugador X:", jugador1);
  console.log("Nombre del Jugador O:", jugador2);

  return jugador1, jugador2;
}

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

  //si hubo empate
  if (tablero.includes("")) return false;
  return "empate";
}

function quienGano(posicionGanadora) {
  console.log("ganador ", posicionGanadora);
  posicionGanadora.forEach(posicion => {
    cuadrados[posicion].classList.toggle("ganador", true);
  });
  if (estadoJuego === "P1") {
    mostrarModal1("Gano el Jugador: " + jugador1);
    estadoJuego = "pausa";
  } else if (estadoJuego === "P2") {
    mostrarModal1("Gano el Jugador: " + jugador2);
    estadoJuego = "pausa";
  }
}

function mostrarModal1(texto) {
  textoModal.innerText = texto;
  modal1.showModal();
}

modal1.querySelector("button").addEventListener("click", () => {
  cuadrados.forEach(cuadrado => {
    cuadrado.textContent = "";
    cuadrado.classList.toggle("ganador", false);
    modal1.close();
    estadoJuego = "P1";
    console.clear();
  });
});

modal2.querySelector("button").addEventListener("click", () => {
  if (jugador1 === "" || jugador2 === "") {
    alert(
      "Los nombres de los jugadores no pueden estar vacíos. Por favor, ingresa nombres válidos."
    );
    return; // Detén la ejecución si los nombres están vacíos
  }

  if (jugador1 === jugador2) {
    alert(
      "Los nombres de los jugadores no pueden ser iguales. Por favor, ingresa nombres diferentes."
    );
    return; // Detén la ejecución si los nombres son iguales
  }

  modal2.close();
});
