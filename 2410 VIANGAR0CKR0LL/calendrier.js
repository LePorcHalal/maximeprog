var model = null;
var boolFirstInit = true;
var date, dayName, monthName, hourTwo;
var days = ['DIM.', 'LUN.', 'MAR.', 'MER.', 'JEU.', 'VEN.', 'SAM.'];
var month = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
function initVuTable(ligneModifiable){

var jsonRequestResult = $.getJSON( "cal-data.json", function() {
  console.log( "success" );
})
  .done(function() {

    if(boolFirstInit){
      model = jsonRequestResult;
      boolFirstInit=false;
    }
    //date

    var dateRow, contenuCaseCheck, contenuCasePasCheck,ouiOuNon;
    document.getElementById('grid-container').innerHTML += "<div class='grid-item'></div>"
    for (var i = 0; i < 9; i++) {
      date = new Date(model.responseJSON.Calendrier[i]);
      dayName = days[date.getDay()];
      monthName = month[date.getMonth()];
      hourTwo = date.getHours()+2;
      document.getElementById('grid-container').innerHTML += "<div class='grid-itemDate'>" + monthName  + '<br>' + "<div class='grid-itemJour'>"
      + date.getDate() + "</div>" + dayName + '<br>' + '<br>' + date.getHours() + ':00'+  '<br>' + hourTwo +':00' + "</div>";
    }

//ligne apres les dates
  var nombreDeParticipants = "<div class='grid-item personne'>"+model.responseJSON.Participants.length+" participants</div>"
    document.getElementById('grid-container').innerHTML += nombreDeParticipants;
  var compteurCrochet = 0;
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < model.responseJSON.Participants.length; j++) {
        if(model.responseJSON.Participants[j].Disponibilités[i]) {
          compteurCrochet++;
        }
      }
      var nbCrochets = "<div class='grid-item'><input type='image' src='tick2.png' alt='Submit' width='28' height='23' disabled = 'true'>"+compteurCrochet+"</div>"
      document.getElementById('grid-container').innerHTML += nbCrochets;
      compteurCrochet = 0;
    }

updateTable(ligneModifiable);

  })
  .fail(function() {
    console.log( "error" );
  })
  .always(function() {
    console.log( "complete" );
  });
}


function initVuCalendrier() {
  var jsonRequestResult = $.getJSON("cal-data.json", function () {
    console.log("success");
  })
    .done(function () {

      if(boolFirstInit){
        model = jsonRequestResult;
        boolFirstInit=false;
      }
      //hide("grid-container");
      //date
      var dateRow, date, dayName, days = ['DIM.', 'LUN.', 'MAR.', 'MER.', 'JEU.', 'VEN.', 'SAM.'];
      dateRow = "<div class='grid-itemCalDate'>" + "</div>";
      for (var i = 0; i < 10; i = i + 2) {
        date = new Date(model.responseJSON.Calendrier[i]);
        dayName = days[date.getDay()];
        dateRow += "<div class='grid-itemCalDate'>" + date.getDate() + '\n' + dayName + "</div>";
      }
      document.getElementById('flex-container').innerHTML += dateRow;
      var dayRow = "<div class='grid-itemHour'>Jour entier</div>";
      for (var i = 0; i < 6; i++) {
        dayRow += "<div class='grid-itemHour'>             </div>";
      }
      document.getElementById('flex-container').innerHTML += dayRow;
      for (var j = 0; j < 24; j = j + 2) {
        var hourRow = "<div class='grid-itemHour'>" + j + ":00 \n" + (j + 1) + ":00 \n" + "</div>";
        for (var i = 0; i < 5; i++) {
          hourRow += "<div class='grid-itemHour'>             </div>";
        }
        document.getElementById('flex-container').innerHTML += hourRow;
      }

      updateCal(model, -1);


    })
    .fail(function () {
      console.log("error");
    })
    .always(function () {
      console.log("complete");
    });
}

function updateCal(model, ligneModifiable) {

}

function hide(what) {
  document.getElementById(what).style.display = "none";
}

function reload() {
  location.reload();
}

function switchVuCalendar() {
  document.getElementById("grid-container").style.display = "none";
  document.getElementById("flex-container").style.display = "flex";
}

function switchVuTable() {
  document.getElementById("grid-container").style.display = "grid";
  document.getElementById("flex-container").style.display = "none";
}






function cocherSimulation(event,i,j) {

        var target = event.target;

        var id = target.id;

        if (document.getElementById(id).getAttribute('src') == "check.png")
        {
            document.getElementById(id).setAttribute('src',"tick-check.png");
              model.responseJSON.Participants[i].Disponibilités[j] = 1;
        }
        else
        {
            document.getElementById(id).setAttribute('src',"check.png");
              model.responseJSON.Participants[i].Disponibilités[j] = 0;
        }

   }
   function modifierPersonne(event) {
     //RESET
     var target = event.target;

     var id = target.id;

            document.getElementById('grid-container').innerHTML = "";
            initVuTable(id[2]);
      }

function updateTable(ligneModifiable){

  for (var i = 0; i < model.responseJSON.Participants.length; i++) {
  //nom de la personne
  if(i == ligneModifiable){

    var input = "<div class='grid-item inputCase'><input type='text' value='"+model.responseJSON.Participants[i].Nom+"' required='required' maxlength='64' width='70' height='50'></div>";
    document.getElementById('grid-container').innerHTML += input;

    for (var j = 0; j < model.responseJSON.Participants[i].Disponibilités.length; j++) {
      var idLigne = "r"+ligneModifiable+"c"+j;


      if(model.responseJSON.Participants[i].Disponibilités[j]){
        contenuCaseCheck= "<input type='image' id='btnCheck"+j+"' src='tick-check.png' onclick='cocherSimulation(event,"+i+","+j+")' alt='Submit' width='70' height='50'>"
        document.getElementById('grid-container').innerHTML += contenuCaseCheck;
        }else{
        contenuCasePasCheck= "<input type='image' id='btnCheck"+j+"' src='check.png' onclick='cocherSimulation(event,"+i+","+j+")' alt='Submit' width='70' height='50'>"
    document.getElementById('grid-container').innerHTML += contenuCasePasCheck;

      }

    }

  } else{
    var personne = "<div class='grid-item personne'><img src='particip2.png' alt='Trulli' width='28' height='26'>"+model.responseJSON.Participants[i].Nom+"<button type='submit' id='br"+i+"' onclick='modifierPersonne(event,this.id)' name='buttonEditable'><i class='fas fa-pencil-alt'></i></button></div>"
    document.getElementById('grid-container').innerHTML += personne;

  //check /pas check
    for (var j = 0; j < model.responseJSON.Participants[i].Disponibilités.length; j++) {
      ouiOuNon = "";

      if(model.responseJSON.Participants[i].Disponibilités[j]){
        ouiOuNon = model.responseJSON.Participants[i].Nom+" à voté OUI";
        contenuCaseCheck= "<div class='editableCase id='r"+i+"c"+j+"''><input type='image' src='tick1.png' alt='Submit' width='70' height='50' disabled = 'false'><span class='tooltiptext'>"+model.responseJSON.Calendrier[i]+""+ouiOuNon+"</span></div>";
        document.getElementById('grid-container').innerHTML += contenuCaseCheck;

      }else{
        ouiOuNon = model.responseJSON.Participants[i].Nom+" à voté NON";
        contenuCasePasCheck= "<div class='editableCase'id='r"+i+"c"+j+"'><span class='tooltiptext'>"+model.responseJSON.Calendrier[i]+""+ouiOuNon+"</span></div>";
        document.getElementById('grid-container').innerHTML += contenuCasePasCheck;

      }

    }
  }
}
}
