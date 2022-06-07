const palabra_ingreso = document.querySelector(".agregar-palabra");
const btn_guardar_jugar = document.querySelector(".btn-guardar-jugar");
const btn_cancelar = document.querySelector(".btn-cancelar");
const alerta_palabra_larga = document.querySelector(".alerta-palabra-larga");
const alerta_palabra_agregada = document.querySelector(".alerta-palabra-agregada");

btn_guardar_jugar.addEventListener("click", function(event){
    event.preventDefault();
    if(palabra_ingreso.value.length === 0 ||  palabra_ingreso.value.trim().length === 0){
        return;
    }else{
        if(palabra_ingreso.value.length > 2 && palabra_ingreso.value.length <= 12){
            let palabra_nueva = palabra_ingreso.value.trim().replace(/ /g, "");
            vector_usuario.push(palabra_nueva);
            vector_palabras.push(palabra_nueva);
            palabra_ingreso.value="";
            setTimeout(function(){
                alert("¡La palabra ha sido agregada con éxito!");   
                iniciar_ahorcado();
                ahorcado.style.display = "";
                inicio.style.display = "none";
                agregar_palabra.style.display = "none";
            }, 1000);
        }else{
            palabra_ingreso.value = "";
            setTimeout(function(){
                alert("¡La palabra no ha sido agregada porque no cumple con la longitud o caracteres requeridos!");    
            }, 1000);
        }
    };
});

btn_cancelar.addEventListener("click",function(event){
    window.removeEventListener("keydown", permitir_tecla);
    inicio.style.display = "";
    agregar_palabra.style.display = "none";
    ahorcado.style.display = "none";
});
