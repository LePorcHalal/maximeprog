class messagesObserver(){

  constructor(){

    var me = {};
    me.avatar = "https://pbs.twimg.com/profile_images/918264641368629249/F78xAklG_400x400.jpg";

    var you = {};
    you.avatar = "https://image-store.slidesharecdn.com/33be41bd-29a2-44d4-8b81-4805eac10600-original.jpeg";
  }

  handleMessageReceived (messageData){

//ajouter le message au bon channel
    for (var i = 0; i < joinedChannelList.length; i++) {
      if(joinedChannelList[i].id==messageData.channelId){
        joinedChannelList[i].messages.push(messageData.data);
        break;
      }
    }
//insere le message dans le bon channel
    insertChat(messageData.sender, messageData.data, messageData.timeStamp);

  }

  insertChat(sender, messageText, timeStamp, channelId){
      if (timeStamp === undefined){
          timeStamp = 0;
      }
      var control = "";
      var date = formatAMPM(new Date());

      if (sender == null){
          control = '<li style="width:100%">' +
                          '<div class="msj macro">' +
                          '<div class="avatar"><img class="img-circle" style="width:100%;" src="'+ me.avatar +'" /></div>' +
                              '<div class="text text-l">' +
                                  '<p>'+ messageText +'</p>' +
                                  '<p><small>'+date+'</small></p>' +
                              '</div>' +
                          '</div>' +
                      '</li>';
      }else{
          control = '<li style="width:100%;">' +
                          '<div class="msj-rta macro">' +
                              '<div class="text text-r">' +
                                  '<p>'+messageText+'</p>' +
                                  '<p><small>'+date+'</small></p>' +
                              '</div>' +
                          '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="'+you.avatar+'" /></div>' +
                    '</li>';
      }

              $("ul").append(control).scrollTop($("ul").prop('scrollHeight'));


  }

  sendText() {
    // Construct a msg object containing the data the server needs to process the message from the chat client.

  //obtention du texte
  var data = document.getElementById("textBoxInput").value;


  const socketMessage = new Message("onMessage", currentChannelId, data, "MAXIME", Date.now());
      console.log("Message sent to socket : \n" + JSON.stringify(socketMessage));
      this.webSocket.send(JSON.stringify(socketMessage));
      //reset du texte
    document.getElementById("textBoxInput").value = "";

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

    resetChat(){
        $("ul").empty();
    }
}
