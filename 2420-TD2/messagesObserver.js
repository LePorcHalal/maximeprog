class messagesObserver {

  constructor(){
    //this.connectionHandler = connectionHandler;

    const self = this;
  var modal = document.getElementById('myModal');
    document.getElementById("btnAddChannel").addEventListener("click", function(){

        modal.style.display = "block";

    });


for (var i = 0; i < document.getElementsByClassName("close").length; i++) {

  document.getElementsByClassName("close")[i].addEventListener("click", function(){

    modal.style.display = "none";
document.getElementById("myModalNouveauUtilisateur").style.display = "none";
});
}

/*
    document.getElementById("btnEnter").addEventListener("click", function(){

        self.sendText();

    });
    window.onkeyup = function(e) {

          var key = e.keyCode ? e.keyCode : e.which;

            if (key == 13) {
                self.sendText();
            }
        }
*/
  }

/*
  sendText() {
    // Construct a msg object containing the data the server needs to process the message from the chat client.

  //obtention du texte
     var data = document.getElementById("textBoxInput").value;
     const socketMessage = new Message("onMessage", currentChannelId, data,"MAXIME", Date.now());
      console.log("Message sent to socket : \n" + JSON.stringify(socketMessage));
      this.connectionHandler.webSocket.send(JSON.stringify(socketMessage));

      //reset du texte
      document.getElementById("textBoxInput").value = "";

    }
*/
  handleMessageReceived (messageData){
    const self = this;
//ajouter le message au bon channel

  console.log(messageData);
/*    for (var i = 0; i < joinedChannelList.length; i++) {
      if(joinedChannelList[i].id==messageData.channelId){
        joinedChannelList[i].messages.push(messageData.data);
        break;
      }
    }
    */
//insere le message dans le bon channel
  if(messageData.channelId == currentChannelId){
    self.insertChat(messageData.sender, messageData.data, messageData.timeStamp);
  }
  }

  insertChat(sender, messageText, timeStamp){
    const you = "https://pbs.twimg.com/profile_images/918264641368629249/F78xAklG_400x400.jpg";
    const me = "https://image-store.slidesharecdn.com/33be41bd-29a2-44d4-8b81-4805eac10600-original.jpeg";

    const self = this;
      if (timeStamp === undefined){
          timeStamp = 0;
      }
      var control = "";
      var date = self.formatAMPM(new Date());
/*
      var messageText = sanitizeHtml(messageText1, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ])
      });
    */
    //sender = "Admin";
    //  if (sender == this.connectionHandler.getUsername()){
      if (sender == nomUsername){
        control =
                  '<li style="width:100%;">' +
                        '<div class="msj-rta macro">' +
                            '<div class="text text-r">' +
                                '<p>'+messageText+'</p>' +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="'+you+'" /></div>' +
                  '</li>';

      }else if(sender=="Admin") {

        control = '<li style="width:100%">' +
                    '<div id="groupJoinId">'+messageText+'</div>'+
                    '</li>';

      }else{

        control = '<li style="width:100%">' +
                    '<div id="nomSenderId">'+sender+'</div>'+
                        '<div class="msj macro">' +
                        '<div class="avatar"><img class="img-circle" style="width:100%;" src="'+ me +'" /></div>' +
                            '<div class="text text-l">' +
                                '<p>'+ messageText +'</p>' +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '</div>' +
                    '</li>';

      }

              $("ul").append(control).scrollTop($("ul").prop('scrollHeight'));


  }


    formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    refreshView(e){
      const self = this;
      var listeDesMessagesDuChannel = e.data.messages;
      currentChannelId = e.channelId;
      self.resetChat();
      for (var i = 0; i < listeDesMessagesDuChannel.length; i++) {
          self.handleMessageReceived(listeDesMessagesDuChannel[i]);
      }

    }

    resetChat(){
        $("ul").empty();
    }
    update(e){

      const self = this;

      if(e.eventType=="onGetChannel"){

        self.refreshView(e);

      }else{

        self.handleMessageReceived(e);
      }
    }
}
