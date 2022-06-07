function permitir(mensaje){
    const caracterespermitidos = /[a-zA-ZÑñ]$/;
    return caracterespermitidos.test(mensaje);
}

function mayusculas(inputpalabra){
    inputpalabra.value = inputpalabra.value.toUpperCase();
}