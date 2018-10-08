var model = null;
var derniereLigneASeFaireModifier = 0;
var date, dayName, monthName, hourTwo;
var days = ['DIM.', 'LUN.', 'MAR.', 'MER.', 'JEU.', 'VEN.', 'SAM.'];
var month = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
var jour = 0;
/**
  * Fonction qui initialise la vu du calendrier et la vu de la table
  *
  **/
function init() {

  initVuTable(0);
  initVuCalendrier();
  hide("flex-container");
}
/**
  * Fonction qui load le data du fichier json
  *
  **/
function loadData() {
  var body = "";
  fetch("cal-data.json")
    .then(
      (response) => {
        return response.json();
      }
    )
    .then(
      (json) => {
        model = json;
      }
    ).then(
      () => {
        init();
      }
    );
};

/**
  *@param ligneModifiable le numero de la ligne qui est modifiable (au depart la 1er, donc 0)
  *
  *
  **/

function initVuTable(ligneModifiable) {

  //LES DATES DU CALENDRIER
  var dateRow, contenuCaseCheck, contenuCasePasCheck, ouiOuNon;
  document.getElementById('grid-container').innerHTML += "<div class='grid-item'></div>"
  for (var i = 0; i < 9; i++) {
    date = new Date(model.Calendrier[i]);
    dayName = days[date.getDay()];
    monthName = month[date.getMonth()];
    hourTwo = date.getHours() + 2;
    document.getElementById('grid-container').innerHTML += "<div class='grid-itemDate'>" + monthName + '<br>' + "<div class='grid-itemJour'>"
      + date.getDate() + "</div>" + dayName + '<br>' + '<br>' + date.getHours() + ':00' + '<br>' + hourTwo + ':00' + "</div>";
  }

  //INITIALISE LA TABLE
  var nombreDeParticipants = "<div class='grid-item personne'>" + model.Participants.length + " participants</div>"
  document.getElementById('grid-container').innerHTML += nombreDeParticipants;
  var compteurCrochet = 0;
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < model.Participants.length; j++) {
      if (model.Participants[j].Disponibilités[i]) {
        compteurCrochet++;
      }
    }
    var nbCrochets = "<div class='grid-item'><input type='image' src='img/tick2.png' alt='Submit' width='28' height='23' disabled = 'true'>" + compteurCrochet + "</div>"
    document.getElementById('grid-container').innerHTML += nbCrochets;
    compteurCrochet = 0;
  }

  updateTable(ligneModifiable);


}
/**
  * Fonction initialise la vu en mode calendrier
  *
  **/

function initVuCalendrier() {


  var monthRow, dateRow, date, finalDate, dayName, days = ['DIM.', 'LUN.', 'MAR.', 'MER.', 'JEU.', 'VEN.', 'SAM.'];
  date = new Date(model.Calendrier[0]);
  finalDate = new Date(model.Calendrier[8]);
  monthRow = "<div class='grid-itemCalMonth'>" + month[date.getMonth()] + " " + date.getDate() + " - " + month[finalDate.getMonth()] + " " +
    finalDate.getDate() + ", " + finalDate.getFullYear() + "</div>";
  document.getElementById('flex-container').innerHTML += monthRow;
  dateRow = "<div class='grid-itemCalDate'>" + "</div>";
  for (var i = 0; i < 10; i = i + 2) {
    date = new Date(model.Calendrier[i]);
    dayName = days[date.getDay()];
    dateRow += "<div class='grid-itemCalDate'>" + date.getDate() + '<br>' + dayName + "</div>";
  }
  document.getElementById('flex-container').innerHTML += dateRow;
  var dayRow = "<div class='grid-itemHour'>Jour entier</div>";
  for (var i = 0; i < 5; i++) {
    dayRow += "<div class='grid-itemHour'>             </div>";
  }
  document.getElementById('flex-container').innerHTML += dayRow;
  for (var j = 0; j < 24; j = j + 2) {
    var hourRow = "<div class='grid-itemHour'>" + '<br>' + j + ":00 <br>" + '<br>' + (j + 1) + ":00 <br>" + "</div>";
    document.getElementById('flex-container').innerHTML += hourRow;
    for (var i = 27; i < 32; i++) {
      updateCal(model, j, i);
    }
  }
}

/**
  * Fonction qui upadte le calendrier
  *
  **/


function updateCal(model, heure, jours) {
  var check = false;

  var tab = "";
  for (var i = 0; i < 9; i++) {
    date = new Date(model.Calendrier[i]);
    if (date.getHours() == heure && date.getDate() == jours) {
      check = true;
      jour = i;
    }
  }
  if (check == true) {
    contenuCaseCheck = "<div class='grid-itemCheck'><input type='image' id='btnCheck' src='img/check.png' alt='Submit' width='100' height='80'> </div>";
    //document.getElementById('flex-container').innerHTML += contenuCaseCheck;
    var compteurCrochet = 0;
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < model.Participants.length; j++) {
        if (model.Participants[j].Disponibilités[i]) {
          compteurCrochet++;
        }
      }
      tab += compteurCrochet + "";


      compteurCrochet = 0;
    }
    var nbCrochets = "<div class='grid-item'><input type='image' src='img/tick2.png' alt='Submit' width='28' height='23' disabled = 'true'>" + tab[jour] + "</div>";
    //jour++;
    var complet = "<div class='grid-itemCalCheck'>" + contenuCaseCheck + nbCrochets + "</div>";
    document.getElementById('flex-container').innerHTML += complet;
  } else {
    document.getElementById('flex-container').innerHTML += "<div class='grid-itemHour'>             </div>";
  }
}
/**
  * Fonction cache une des 2 vu
  *
  **/
function hide(what) {
  document.getElementById(what).style.display = "none";
}
/**
  * Fonction qui reload
  *
  **/
function reload() {
  location.reload();
}
/**
  * Fonction qui switch la vu au calendrier
  *
  **/
function switchVuCalendar() {
  document.getElementById("grid-container").style.display = "none";
  document.getElementById("flex-container").innerHTML = "";
  document.getElementById("flex-container").style.display = "flex";
  initVuCalendrier();
}
/**
  * Fonction qui switch la vu a la table
  *
  **/
function switchVuTable() {
  document.getElementById("grid-container").style.display = "grid";
  document.getElementById("flex-container").style.display = "none";
}

/**
  * Fonction qui fait les changements lorsqu'une case est coché
  *
  **/
function cocher(event, i, j) {

  var target = event.target;

  var id = target.id;

  if (document.getElementById(id).getAttribute('src') == "img/check.png") {
    document.getElementById(id).setAttribute('src', "img/tick-check.png");
    model.Participants[i].Disponibilités[j] = 1;
  }
  else {
    document.getElementById(id).setAttribute('src', "img/check.png");
    model.Participants[i].Disponibilités[j] = 0;
  }

}

/**
  * Fonction qui transforme un row avec des crochets en une row: editable
  *
  **/
function modifierPersonne(event) {
  //RESET
  var target = event.target;
  var idTemp = target.id;
  var id = idTemp[2];
  var temp = document.getElementsByName("inputText")[0].value;
  document.getElementById('grid-container').innerHTML = "";
  model.Participants[derniereLigneASeFaireModifier].Nom = temp;
  initVuTable(id);
  derniereLigneASeFaireModifier = id;

}

/**
  * Fonction qui update la table
  *
  **/
function updateTable(ligneModifiable) {

  for (var i = 0; i < model.Participants.length; i++) {


    //VERIFIE SI CEST UNE LIGNE EN MODE: EDITABLE
    if (i == ligneModifiable) {

      var input = "<div class='grid-item inputCase'><img src='img/particip1.png' alt='Trulli' width='28' height='26'><input name='inputText' type='text' value='" + model.Participants[i].Nom + "' required='required' maxlength='64'  width='70' height='50'></div>";
      document.getElementById('grid-container').innerHTML += input;

      for (var j = 0; j < model.Participants[i].Disponibilités.length; j++) {
        var idLigne = "r" + ligneModifiable + "c" + j;


        if (model.Participants[i].Disponibilités[j]) {
          contenuCaseCheck = "<input type='image' id='btnCheck" + j + "' src='img/tick-check.png' onclick='cocher(event," + i + "," + j + ")' alt='Submit' width='70' height='50'>"
          document.getElementById('grid-container').innerHTML += contenuCaseCheck;
        } else {
          contenuCasePasCheck = "<input type='image' id='btnCheck" + j + "' src='img/check.png' onclick='cocher(event," + i + "," + j + ")' alt='Submit' width='70' height='50'>"
          document.getElementById('grid-container').innerHTML += contenuCasePasCheck;

        }

      }
      //LAISSE LA LIGNE NON MODIFIABLE SI ELLE N'EST PAS MODIFIABLE
    } else {
      var personne = "<div class='grid-item personne' id='p" + i + "'><img src='img/particip2.png' alt='Trulli' width='28' height='26'>" + model.Participants[i].Nom + "<button type='submit' id='br" + i + "' onclick='modifierPersonne(event,this.id)' name='buttonEditable'><i class='fas fa-pencil-alt' id='pr" + i + "'></i></button></div>"
      document.getElementById('grid-container').innerHTML += personne;

      //check /pas check
      for (var j = 0; j < model.Participants[i].Disponibilités.length; j++) {
        ouiOuNon = "";

        if (model.Participants[i].Disponibilités[j]) {
          ouiOuNon = model.Participants[i].Nom + " à voté OUI";
          contenuCaseCheck = "<div class='editableCase'id='r" + i + "c" + j + "'><input type='image' src='img/tick1.png' alt='Submit' width='70' height='50' disabled = 'false'><span class='tooltiptext'>" + model.Calendrier[i] + "" + ouiOuNon + "</span></div>";
          document.getElementById('grid-container').innerHTML += contenuCaseCheck;

        } else {
          ouiOuNon = model.Participants[i].Nom + " à voté NON";
          contenuCasePasCheck = "<div class='editableCase'id='r" + i + "c" + j + "'><span class='tooltiptext'>" + model.Calendrier[i] + "" + ouiOuNon + "</span></div>";
          document.getElementById('grid-container').innerHTML += contenuCasePasCheck;

        }

      }
    }
  }
}
