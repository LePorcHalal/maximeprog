
function initVuTable(){
var jqxhr = $.getJSON( "cal-data.json", function() {
  console.log( "success" );
})
  .done(function() {
    var inputField = "<input type='text' placeholder='Saisissez nom' required='required' maxlength='64' width='70' height='50'>";
    //date
    var dateRow, contenuCaseCheck, contenuCasePasCheck,ouiOuNon;

    //dateRow += "<div class='grid-itemDate''</div>";
    for (var i = 0; i < 9; i++) {
      dateRow += "<div class='grid-itemDate'>"+jqxhr.responseJSON.Calendrier[i]+"</div>";
    }
    document.getElementById('grid-container').innerHTML += dateRow;

//ligne apres les dates
  var nombreDeParticipants = "<div class='grid-item personne'>+"+jqxhr.responseJSON.Participants.length+" participants <button name='buttonPlus' type='button' >plus</button></div>"
    document.getElementById('grid-container').innerHTML += nombreDeParticipants;
  var compteurCrochet = 0;
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < jqxhr.responseJSON.Participants.length; j++) {
        if(jqxhr.responseJSON.Participants[j].Disponibilités[i]) {
          compteurCrochet++;
        }
      }
      var nbCrochets = "<div class='grid-item'><input type='image' src='tick2.png' alt='Submit' width='28' height='23' disabled = 'true'>"+compteurCrochet+"</div>"
      document.getElementById('grid-container').innerHTML += nbCrochets;
      compteurCrochet = 0;
    }
//ligne Pour MODIFIER

document.getElementById('grid-container').innerHTML += inputField;

for (var i = 0; i < 9; i++) {
  document.getElementById('grid-container').innerHTML += "<div class='editableCase'><input type='image' id='btnCheck"+i+"' onclick='cocher(event)' src='check.png' alt='Submit' width='70' height='50'></div>";
}

updateTable(jqxhr, -1);


  })
  .fail(function() {
    console.log( "error" );
  })
  .always(function() {
    console.log( "complete" );
  });
}
function cocher(event) {

        var target = event.target;

        var id = target.id;

        if (document.getElementById(id).getAttribute('src') == "check.png")
        {
            document.getElementById(id).setAttribute('src',"tick-check.png");
        }
        else
        {
            document.getElementById(id).setAttribute('src',"check.png");
        }

   }
   function modifierPersonne(event) {
    alert("MAX!");
           var target = event.target;
           var id = target.id;

      }
function updateTable(jqxhr,ligneModifiable){


  for (var i = 0; i < jqxhr.responseJSON.Participants.length; i++) {
  //nom de la personne
  if(i == ligneModifiable){

    var input = "<div class='grid-item personne'><input type='text' value='"+jqxhr.responseJSON.Participants[i].Nom+"' required='required' maxlength='64' width='70' height='50'></div>";
    document.getElementById('grid-container').innerHTML += input;

    for (var j = 0; j < jqxhr.responseJSON.Participants[i].Disponibilités.length; j++) {

      if(jqxhr.responseJSON.Participants[i].Disponibilités[j]){
        contenuCaseCheck= "<div class='editableCase'><input type='image' id='btnCheck"+i+"' onclick='cocher(event)' src='tick-check.png' alt='Submit' width='70' height='50'></div>"
        document.getElementById('grid-container').innerHTML += contenuCaseCheck;

      }else{
        contenuCasePasCheck= "<div class='editableCase'><input type='image' id='btnCheck"+i+"' onclick='cocher(event)' src='check.png' alt='Submit' width='70' height='50'></div>"
    document.getElementById('grid-container').innerHTML += contenuCasePasCheck;

      }

    }

  } else{
    var personne = "<div class='grid-item personne'><img src='particip2.png' alt='Trulli' width='28' height='26'>"+jqxhr.responseJSON.Participants[i].Nom+"<button name='buttonEditable' type='button'>edit</button></div>";
    document.getElementById('grid-container').innerHTML += personne;

  //check /pas check
    for (var j = 0; j < jqxhr.responseJSON.Participants[i].Disponibilités.length; j++) {
      ouiOuNon = "";

      if(jqxhr.responseJSON.Participants[i].Disponibilités[j]){
        ouiOuNon = jqxhr.responseJSON.Participants[i].Nom+" à voté OUI";
        contenuCaseCheck= "<div class='editableCase'><input type='image' src='tick1.png' alt='Submit' width='70' height='50' disabled = 'false'><span class='tooltiptext'>"+jqxhr.responseJSON.Calendrier[i]+""+ouiOuNon+"</span></div>";
        document.getElementById('grid-container').innerHTML += contenuCaseCheck;

      }else{
        ouiOuNon = jqxhr.responseJSON.Participants[i].Nom+" à voté NON";
        contenuCasePasCheck= "<div class='editableCase'><span class='tooltiptext'>"+jqxhr.responseJSON.Calendrier[i]+""+ouiOuNon+"</span></div>";
        document.getElementById('grid-container').innerHTML += contenuCasePasCheck;

      }

    }
  }
}
}
