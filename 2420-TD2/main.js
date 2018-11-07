//wt.base = "ws://log2420-nginx.info.polymtl.ca/chatservice";
//endPoint = url_base?username={ nom };
//wt client = new WebSocket(endPoint);
  //var client = new WebSocket("ws://log2420-nginx.info.polymtl.ca/chatservice");
var client, jsonChannelId,messageData,currentChannelId;
var channelList = [];
var joinedChannelList = [];
var premiereConnection = true;

function initSocket(){
  this.webSocket =  new WebSocket("ws://log2420-nginx.info.polymtl.ca/chatservice");
          const self  = this; //Because this refers to the context, it will change in the function
          this.webSocket.onmessage = function(e){

            if(premiereConnection){

              jsonChannelId = JSON.parse(e.data);
              setInitChannelList();
              setChannelList();
              premiereConnection = false;
              console.log(jsonChannelId);
            }else{
                messageData = JSON.parse(e.data);
                handleMessageReceived (messageData);
            }

            console.log(e.data);

          };

          this.webSocket.onJoinChannel = function(e){
            console.log(e.data)
          };

          window.onkeyup = function(e) {

           var key = e.keyCode ? e.keyCode : e.which;

           if (key == 13) {
               sendText();
           }
        }
      }

function switchChannel(channelId){

  //document.getElementById("chatBoxId")

}

function setInitChannelList(){
  currentChannelId = jsonChannelId.data[0].id

  for (var i = 0; i < jsonChannelId.data.length; i++) {
    var messageList = []
    var channel = new Channel(jsonChannelId.data[i].id,jsonChannelId.data[i].name,jsonChannelId.data[i].joinStatus,messageList,jsonChannelId.data[i].numberOfUsers);

    if(channel.joinStatus){
      joinedChannelList.push(channel);
    }
    channelList.push(channel);
  }
}
function setChannelList(){

  for (var i = 0; i < channelList.length; i++) {

      var newDiv = document.createElement("div");
      var newContent = document.createTextNode(channelList[i].name);
      newDiv.appendChild(newContent);
      newDiv.classList.add("channelItem");
      document.getElementsByClassName("flex-channelList-container")[0].appendChild(newDiv);

     if(channelList[i].name == "Général"){
        symbole = "glyphicon-star";
      }else if(channelList[i].joinStatus){
        symbole = "glyphicon-minus";
      }else if(!(channelList[i].joinStatus)){
        symbole = "glyphicon-plus";
      }
        var symboleChannel  =   '<span class="pull-right">'+
                                  '<a href="#" class="btn btn-lg btn-primary">'+
                                    '<span class="glyphicon ' + symbole + '"></span>'+
                                  '</a>'+
                                 '</span>';

      $(newDiv).append(symboleChannel);

  }

}
function sendText() {
  // Construct a msg object containing the data the server needs to process the message from the chat client.

//obtention du texte
var data = document.getElementById("textBoxInput").value;


const socketMessage = new Message("onMessage", currentChannelId, data, "MAXIME", Date.now());
    console.log("Message sent to socket : \n" + JSON.stringify(socketMessage));
    this.webSocket.send(JSON.stringify(socketMessage));

//reset du texte
  document.getElementById("textBoxInput").value = "";

  }


  var me = {};
  me.avatar = "https://pbs.twimg.com/profile_images/918264641368629249/F78xAklG_400x400.jpg";

  var you = {};
  you.avatar = "https://image-store.slidesharecdn.com/33be41bd-29a2-44d4-8b81-4805eac10600-original.jpeg";

  function formatAMPM(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
  }

  //-- No use time. It is a javaScript effect.
  function handleMessageReceived (messageData){

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

  function insertChat(sender, messageText, timeStamp, channelId){
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

  function resetChat(){
      $("ul").empty();
  }
/*
  $(".mytext").on("keydown", function(e){
      if (e.which == 13){
          var text = $(this).val();
          if (text !== ""){
              insertChat("me", text);
              $(this).val('');
          }
      }
  });

  $('body > div > div > div:nth-child(2) > span').click(function(){
      $(".mytext").trigger({type: 'keydown', which: 13, keyCode: 13});
  })
*/
  //-- Clear Chat
//  resetChat();

  //-- Print Messages
  /*
  insertChat("me", "Hello Tom...", 0);
  insertChat("you", "Hi, Pablo", 1500);
  insertChat("me", "What would you like to talk about today?", 3500);
  insertChat("you", "Tell me a joke",7000);
  insertChat("me", "Spaceman: Computer! Computer! Do we bring battery?!", 9500);
  insertChat("you", "LOL", 12000);
*/

  //-- NOTE: No use time on insertChat.
