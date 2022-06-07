const vector_palabras = ["SOL","NOVIA","BOLA","PERRO","ESPERA","MONEDA","RELOJ","ESTADIO","SARGENTO","OSO","PROGRAMAR", "ANCIANO","MINISTRO","MAESTRO","ESCUELA","AÑEJO","PACIENCIA","ALBAÑIL","TERRENO","IGUANA","CUÑADO","FANTASMA", "CURIOSO", "INSECTO", "GUITARRA", "AHORCADO", "FOGATA", "ESTATUA","CONTROL", "CONTIGUO", "ESTRELLA","CALIENTE","BILLAR", "HACHA", "ALCOHOL", "AYUDAR","BOTELLA","ARQUITECTO","KOALA","KILOGRAMO"];
const btn_nuevo_juego = document.querySelector(".btn-nuevo-juego");
const btn_rendirse = document.querySelector(".btn-rendirse");
const canvas_2 =document.querySelector(".canvas-2");
const ganador = document.querySelector(".ganador");
const perdedor = document.querySelector(".perdedor");
const letras = document.querySelector(".letras");
const letras_falladas = document.querySelector(".letras-falladas");
const teclado_fila1 = document.querySelector(".teclado-fila1");
const teclado_fila2 = document.querySelector(".teclado-fila2");
const teclado_fila3 = document.querySelector(".teclado-fila3");
const letras_fila1 = ["Q","W","E","R","T","Y","U","I","O","P"];
const letras_fila2 = ["A","S","D","F","G","H","J","K","L","Ñ"];
const letras_fila3 = ["Z","X","C","V","B","N","M"];
let ventana = document.querySelector("canvas");
let pincel = ventana.getContext("2d");
let palabra_random;
let letras_utilizadas;
let aciertos;
let errores;
var vector_usuario = [];
var palabra_usuario = "";

btn_nuevo_juego.addEventListener("click", iniciar_ahorcado);

btn_rendirse.addEventListener("click", function(){
    window.removeEventListener("keydown", permitir_tecla);
    quitar_eventos();
    inicio.style.display = "";
    ahorcado.style.display = "none";
    agregar_palabra.style.display = "none";
    vector_usuario = [];
    palabra_usuario = "";
});

function iniciar_ahorcado(){
    aciertos = 0;
    errores = 0;
    letras_utilizadas=[];
    pincel.clearRect(0, 0, ventana.width, ventana.height);
    ganador.style.display = "none";
    perdedor.style.display = "none";
    letras.innerHTML= "";
    letras_falladas.innerHTML= "";
    teclado_fila1.innerHTML = "";
    teclado_fila2.innerHTML = "";
    teclado_fila3.innerHTML = "";

    dibujar_ahorcado(errores);
    palabra();
    guiones();
    window.addEventListener("keydown", permitir_tecla);
    teclado();
}

function teclado(){
    for (let i=0; i < letras_fila1.length;i++){
        let tecla1=document.createElement("button");
        tecla1.classList.add("tecla");
        tecla1.id = letras_fila1[i];
        tecla1.textContent = letras_fila1[i];
        teclado_fila1.appendChild(tecla1);
        tecla1.addEventListener("click", permitir_teclaT);
    }
    for (let j=0; j < letras_fila2.length;j++){
        let tecla2=document.createElement("button");
        tecla2.classList.add("tecla");
        tecla2.id = letras_fila2[j];
        tecla2.textContent = letras_fila2[j];
        teclado_fila2.appendChild(tecla2);
        tecla2.addEventListener("click", permitir_teclaT);
    }
    for (let k=0; k < letras_fila3.length;k++){
        let tecla3=document.createElement("button");
        tecla3.classList.add("tecla");
        tecla3.id = letras_fila3[k];
        tecla3.textContent = letras_fila3[k];
        teclado_fila3.appendChild(tecla3);
        tecla3.addEventListener("click", permitir_teclaT);
    }
}

function palabra(){
    if(vector_usuario != ''){
        let z = vector_usuario[0];
        palabra_usuario = z.split('');
        aciertos = palabra_usuario.length;
    }
    else{
        let random =vector_palabras[Math.round(Math.random()*vector_palabras.length)];
        palabra_random = random.split("");
        aciertos=palabra_random.length;
    }
}

function guiones(){
    if(palabra_usuario != ''){
        for (let i=0; i < palabra_usuario.length; i++){
            let guion_letra =document.createElement("div");
            guion_letra.classList.add("guiones");
            letras.appendChild(guion_letra);
        }
    }
    else{
        for (let i=0; i < palabra_random.length; i++){
            let guion_letra =document.createElement("div");
            guion_letra.classList.add("guiones");
            letras.appendChild(guion_letra);
        }
    }
}

function permitir_tecla(evento){
    let letra = evento.key.toUpperCase();
    let x_T = document.querySelector("#" + letra);
    if(letra.match(/^[a-zA-ZÑñ]$/i) && !letras_utilizadas.includes(letra)){
        agregar_letra(letra);
        x_T.classList.add("tecla_perdida");
        x_T.removeEventListener("click", permitir_teclaT);
    }
}

function permitir_teclaT(){
    let letra =this.id;
    if (letra.match(/^[A-ZÑ]$/i) && !letras_utilizadas.includes(letra)){
        this.classList.add("tecla_perdida");
        this.removeEventListener("click", permitir_teclaT);
        agregar_letra(letra);
    }
}

function agregar_letra(letra){
    if(palabra_usuario != ""){
        let x = 0
        let i = palabra_usuario.indexOf(letra, x);
        const guiones = document.querySelectorAll(".guiones")
        if (i != -1){
            letras_utilizadas.push(letra);
            while(i != -1){
                guiones[i].innerHTML = letra;
                aciertos --;
                x = i + 1;
                i =  palabra_usuario.indexOf(letra, x);
            }
            if(aciertos == 0){
                partida_terminada();
            }

        }else{
            letras_utilizadas.push(letra);
            mostrar_letras_falladas(letra);
            errores++;
            dibujar_ahorcado(errores);
        }
        if(errores == 8){
            partida_perdida();
        }
    }
    else{
        let y = 0
        let j = palabra_random.indexOf(letra, y);
        const guiones = document.querySelectorAll(".guiones")
        if (j != -1){
            letras_utilizadas.push(letra);
            while(j != -1){
                guiones[j].innerHTML = letra;
                aciertos --;
                y = j + 1;
                j =  palabra_random.indexOf(letra, y);
            }
            if(aciertos == 0){
                partida_terminada();
            }

        }else{
            letras_utilizadas.push(letra);
            mostrar_letras_falladas(letra);
            errores++;
            dibujar_ahorcado(errores);
        }
        if(errores == 8){
            partida_perdida();
        }
    }
}

function mostrar_letras_falladas(letra){
    let fallada = document.createElement("span");
    fallada.innerHTML = letra;
    fallada.classList.add("falladas");
    letras_falladas.appendChild(fallada);
}

function partida_terminada(){
    window.removeEventListener("keydown", permitir_tecla);
    quitar_eventos();
    ganador.style.display = "";
    vector_usuario = [];
    palabra_usuario = "";
}

function partida_perdida(){
    window.removeEventListener("keydown", permitir_tecla);
    quitar_eventos();
    letras_falladas.innerHTML = "";
    perdedor.style.dibujar_ahorcado = "";
    const pallabra = document.createElement("span");
    let palabra_correcta
    if (palabra_usuario!=""){
        palabra_correcta = palabra_usuario.join("");
    }
    else{
        palabra_correcta = palabra_random.join("");
    }
    pallabra.innerHTML= "La palabra correcta era: "+ palabra_correcta+"<br>¡Vuelve a intentarlo!";
    pallabra.classList.add("palabrarandom");
    letras_falladas.appendChild(pallabra);
    vector_usuario = [];
    palabra_usuario = "";
}

function quitar_eventos(){
    for(let i = 0; i < letras_fila1.length; i++){
        let tecla1 = document.querySelector("#" + letras_fila1[i]);
        tecla1.removeEventListener("click", permitir_teclaT);
    }

    for(let j = 0; j < letras_fila2.length; j++){
        let tecla2 = document.querySelector("#" + letras_fila2[j]);
        tecla2.removeEventListener("click", permitir_teclaT);
    }

    for(let k = 0; k < letras_fila3.length; k++){
        let tecla3 = document.querySelector("#" + letras_fila3[k]);
        tecla3.removeEventListener("click", permitir_teclaT);
    }
}

function dibujar_ahorcado(errores){
    pincel.lineWidth = 10;
    pincel.strokeStyle = "rgba(255, 255, 255, 1)";
    pincel.beginPath();

    switch(errores){
        case 1:
            pincel.moveTo(0, 400);
            pincel.lineTo(350, 400);
        break;

        case 2:
            pincel.moveTo(60, 400);
            pincel.lineTo(60, 0);
        break;

        case 3:
            pincel.moveTo(60, 0);
            pincel.lineTo(200, 0);
        break;

        case 4:
            pincel.moveTo(200, 0);
            pincel.lineTo(200, 70);
        break;

        case 5:
            pincel.arc(200, 110, 40, 2*Math.PI, 0);
        break;

        case 6:
            pincel.moveTo(200, 150);
            pincel.lineTo(200, 300);
        break;

        case 7:
            pincel.moveTo(200, 190);
            pincel.lineTo(270, 260);
            pincel.moveTo(200, 190);
            pincel.lineTo(130, 260);
        break;

        case 8:
            pincel.moveTo(200, 300);
            pincel.lineTo(270, 370);
            pincel.moveTo(200, 300);
            pincel.lineTo(130, 370);
        break;
    }
    pincel.stroke();
}
