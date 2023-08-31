const x ="X";
const o ="O";
let estadoJuego = "P1";

const cuadrados = document.querySelectorAll(".cuadrado")

cuadrados.forEach((cuadrado,i) => {
    cuadrado.addEventListener("click", ()=>{
        cuadrado.innerText= estadoJuego === "P1" ? x : o;
        estadoJuego = estadoJuego === "P1" ? "P2": "P1";
        quienGano()
    })
})


function quienGano(){
    const tablero = Array.from(cuadrados).map(cuadrado => cuadrado.textContent)
    console.log(tablero)
}