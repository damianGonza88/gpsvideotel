var crd;
var datos;
var permiso=false;

// $ ./chrome --user-data-dir=/tmp/foo --unsafely-treat-insecure-origin-as-secure=http://your.insecure.site;
const scriptURL = 'https://script.google.com/macros/s/AKfycbyDjoy-ja7HQbcM3ySmCQpXDtn-hhQuuXdC7BjNGTqkpdXeje0/exec'
const form = document.forms['submit-form']


    
form.addEventListener('submit', e => {
    navigator.geolocation.getCurrentPosition(succes,error,{timeout:1000});
    e.preventDefault();
    enviarUbicacion();   
    
}) 

function enviarUbicacion() {
    if(permiso === false) {
        window.setTimeout(enviarUbicacion, 100); /* this checks the flag every 100 milliseconds*/
    } else {
        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => console.log('Success!', response), )
        .catch(error => console.error('Error!', error.message))
        location.reload();
        alert ("Ubicacion Enviada");
    }
}

//Funcion de exito
function succes (pos) {
    crd = pos.coords; 
    console.log('Latitude : ' + crd.latitude);
    console.log('Longitude: ' + crd.longitude);
    datos = crd.latitude +','+ crd.longitude;   
    form.coordenadas.value = datos; 
    permiso = true;   
}

//Funcion de error
function error (error) {
	alert('Error: '+ error.code +' '+ error.message + '\n\nPor favor compruebe que está conectado '+'a internet y habilite la opción permitir compartir ubicación física');
}

