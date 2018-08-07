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
  //Buscar información de restaurantes en firestore

let searchbar = document.getElementById('buscarRes');
let searchBtn = document.getElementById('search');
let restEncontrados = document.getElementById('contenedorRest');

db.collection("places").onSnapshot((querySnapshot) => {
  restEncontrados.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(doc.data().address)
        restEncontrados.innerHTML += `
        <div class="card">
  <div class="card-header">
  ${doc.data().name}
  </div>
  <div class="card-body">
    <h5 class="card-title">${doc.data().type}</h5>
    <p class="card-text">${doc.data().rate}</p>
    <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Detalles</a>
  </div>
</div>
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Dirección</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div class="modal-body">
      ${doc.data().address}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>`;
    });
});
window.onload = encontrar;


