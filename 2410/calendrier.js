var model = null;
var boolFirstInit = true;
var derniereLigneASeFaireModifier=0;
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
      
      var monthRow, dateRow, date, finalDate, dayName, days = ['DIM.', 'LUN.', 'MAR.', 'MER.', 'JEU.', 'VEN.', 'SAM.'];
      date = new Date(model.responseJSON.Calendrier[0]);
      finalDate = new Date(model.responseJSON.Calendrier[8]);
      monthRow = "<div class='grid-itemCalMonth'>" +month[date.getMonth()]+" "+ date.getDate() + " - " + month[finalDate.getMonth()]+" "+
       finalDate.getDate()+ ", "+ finalDate.getFullYear() +"</div>";
       document.getElementById('flex-container').innerHTML += monthRow;
      dateRow = "<div class='grid-itemCalDate'>" + "</div>";
      for (var i = 0; i < 10; i = i + 2) {
        date = new Date(model.responseJSON.Calendrier[i]);
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
        var hourRow = "<div class='grid-itemHour'>" +'<br>'+ j + ":00 <br>"+ '<br>' + (j + 1) + ":00 <br>" + "</div>";
        document.getElementById('flex-container').innerHTML += hourRow;
        for (var i = 0; i < 5; i++) {
         updateCal(model, j);
        }
        
      }

      


    })
    .fail(function () {
      console.log("error");
    })
    .always(function () {
      console.log("complete");
    });
}

function updateCal(model, heure) {

  //for (var i = 0; i < model.responseJSON.Participants.length; i++) {
     // for (var j = 0; j < model.responseJSON.Participants[i].Disponibilités.length; j++) {
        //if(model.responseJSON.Participants[i].Disponibilités[j]==heure){
          //contenuCaseCheck= "<input type='image' id='btnCheck"+j+"' src='tick-check.png' alt='Submit' width='130' height='100'>"
          //document.getElementById('flex-container').innerHTML += contenuCaseCheck;
          //}else{
          document.getElementById('flex-container').innerHTML += "<div class='grid-itemHour'>             </div>";
        //}
  
     // }
  //}
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
     var idTemp = target.id;
     var id=idTemp[2];
     var temp = document.getElementsByName("inputText")[0].value
     document.getElementById('grid-container').innerHTML = "";
    model.responseJSON.Participants[derniereLigneASeFaireModifier].Nom = temp;
    initVuTable(id);
    derniereLigneASeFaireModifier=id;

      }

function updateTable(ligneModifiable){

  for (var i = 0; i < model.responseJSON.Participants.length; i++) {
  //nom de la personne
  if(i == ligneModifiable){

    var input = "<div class='grid-item inputCase'><img src='particip1.png' alt='Trulli' width='28' height='26'><input name='inputText' type='text' value='"+model.responseJSON.Participants[i].Nom+"' required='required' maxlength='64'  width='70' height='50'></div>";
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
    var personne = "<div class='grid-item personne' id='p"+i+"'><img src='particip2.png' alt='Trulli' width='28' height='26'>"+model.responseJSON.Participants[i].Nom+"<button type='submit' id='br"+i+"' onclick='modifierPersonne(event,this.id)' name='buttonEditable'><i class='fas fa-pencil-alt'></i></button></div>"
    document.getElementById('grid-container').innerHTML += personne;

  //check /pas check
    for (var j = 0; j < model.responseJSON.Participants[i].Disponibilités.length; j++) {
      ouiOuNon = "";

      if(model.responseJSON.Participants[i].Disponibilités[j]){
        ouiOuNon = model.responseJSON.Participants[i].Nom+" à voté OUI";
        contenuCaseCheck= "<div class='editableCase'id='r"+i+"c"+j+"'><input type='image' src='tick1.png' alt='Submit' width='70' height='50' disabled = 'false'><span class='tooltiptext'>"+model.responseJSON.Calendrier[i]+""+ouiOuNon+"</span></div>";
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
