//---------------------------------------------------------------------------------------------------\\

// Fonction permettant de géolocaliser quelqu'un

function maPosition(position) {
  var infopos = "Position déterminée :\n";
  infopos += "Latitude : " + position.coords.latitude +"\n";
  infopos += "Longitude: " + position.coords.longitude +"\n";
  document.getElementById("infoposition").innerHTML = infopos;
}

if(navigator.geolocation)
  navigator.geolocation.getCurrentPosition(maPosition);

$.post("http://localhost/NoSql/index.html",{lat:position.coords.latitude,lng:position.coords.longitude});

//---------------------------------------------------------------------------------------------------\\

// Fonction permettant de suivre les déplacements

function surveillePosition(position) {
    var infopos = "Position déterminée :\n";
    infopos += "Latitude : " + position.coords.latitude +"\n";
    infopos += "Longitude: " + position.coords.longitude +"\n";
    infopos += "Vitesse  : " + position.coords.speed +"\n";
    document.getElementById("infoposition").innerHTML = infopos;
}

// On déclare la variable survId afin de pouvoir par la suite annuler le suivi de la position
var survId = navigator.geolocation.watchPosition(surveillePosition);

// Annule le suivi de la position si nécessaire.
// navigator.geolocation.clearWatch(survId);


//---------------------------------------------------------------------------------------------------\\

// Fonction de callback en cas d’erreur

function erreurPosition(error) {
    var info = "Erreur lors de la géolocalisation : ";
    switch(error.code) {
    case error.TIMEOUT:
        info += "Timeout !";
    break;
    case error.PERMISSION_DENIED:
    info += "Vous n’avez pas donné la permission";
    break;
    case error.POSITION_UNAVAILABLE:
        info += "La position n’a pu être déterminée";
    break;
    case error.UNKNOWN_ERROR:
        info += "Erreur inconnue";
    break;
}

document.getElementById("infoposition").innerHTML = info;


//---------------------------------------------------------------------------------------------------\\

// Met à jour la position toute les minutes au maximum (60000 milliseconde)

navigator.geolocation.getCurrentPosition(maPosition, erreurPosition,{maximumAge:60000,enableHighAccuracy:true});