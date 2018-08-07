window.fireRestaurantes.initializeFirebase();
console.log("Sí jala")
const db = firebase.firestore();
console.log(db)
//var map;

const encontrar = () =>{
    let mapa = document.getElementById('mapa');
    // Verificar si soporta geolocalizacion
    if (navigator.geolocation) {
      console.log('Tu navegador soporta Geolocalizacion');
    }else{
      console.log('Tu navegador no soporta Geolocalizacion');
    }
    //Obtenemos latitud y longitud
   const localizacion = (posicion) =>{
      let latitud = posicion.coords.latitude;
      var longitud = posicion.coords.longitude;
      var imgURL = "https://maps.googleapis.com/maps/api/staticmap?center="+latitud+","+longitud+"&size=600x300&markers=color:red%7C"+latitud+","+longitud+"&key=AIzaSyBUaz17mTrasil6s3EjOP1NkpWqxRooDns&libraries=places";
      mapa.innerHTML ="<img src='"+imgURL+"'>";
      
    }
    const error = () =>{
      console.log('No se pudo obtener tu ubicación');
    }
    navigator.geolocation.getCurrentPosition(localizacion,error);
  }
  //Buscar información de restaurantes en database 

let searchbar = document.getElementById('buscarRes');
let searchBtn = document.getElementById('search');
let foodFind = document.getElementById('contenedorRest');

db.collection("places").onSnapshot((querySnapshot) => {
    foodFind.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(doc.data().address)
        foodFind.innerHTML += `<li class="restaurantes">${doc.data().name}`;
    });
});
window.onload = encontrar;


