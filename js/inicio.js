const typed = new Typed(".typed",{
    strings : ["<u>A</u> <u>H</u> <u>O</u> <u>R</u> <u>C</u> <u>A</u> <u>D</u> <u>O</u>"],
    typeSpeed : 75,
    startDelay : 300,
    backSpeed : 75,
    backDelay : 1500,
    loop : true,
    showCursor : true
});
const inicio = document.querySelector(".inicio");
const agregar_palabra = document.querySelector(".palabra-usuario");
const ahorcado = document.querySelector(".juego-ahorcado");
const btn_iniciar_juego = document.querySelector(".btn-iniciar-juego");
const btn_agregar_palabra = document.querySelector(".btn-agregar-palabra");

btn_iniciar_juego.addEventListener("click", function(event){
    iniciar_ahorcado();
    ahorcado.style.display = "";
    inicio.style.display = "none";
    agregar_palabra.style.display = "none";
});

btn_agregar_palabra.addEventListener("click", function(event){
    agregar_palabra.style.display = "";
    inicio.style.display = "none";
    ahorcado.style.display = "none";
});

window.addEventListener("load",()=>{
    agregar_palabra.style.display = "none";
    ahorcado.style.display = "none";
});