//Funcion para deshabilitar el boton atrás del telefono
function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}


function onDeviceReady() {
    document.addEventListener("backbutton", onBackKeyDown, false);
}

function onBackKeyDown() {
    
}