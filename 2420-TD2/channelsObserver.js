
class channelsObserver {

  constructor(connectionHandler) {
    this.connectionHandler = connectionHandler;
    this.premiereConnection = true;
    const self = this;


    document.getElementById("btnNouveauChannel").addEventListener("click", function(){

      self.addChannel();

    });


}
addChannel(){
 const socketChannel = new Message("onCreateChannel","", document.getElementById("nomNouveauChannelID").value,nomUsername, Date.now());
 this.connectionHandler.webSocket.send(JSON.stringify(socketChannel));
 document.getElementById("nomNouveauChannelID").value = "";
}
  changeJoinStatus(channel){

    const self = this;

    if(channel.joinStatus){

      channel.joinStatus=false;
      self.leaveChannel(channel.id);

    }else{

      channel.joinStatus=true;
      self.joinChannel(channel.id);

    }


}
changeChannel(e){

}
joinChannel(channelId){

  const socketJoinChannel = new Message("onJoinChannel",channelId,"",nomUsername, Date.now());
  this.connectionHandler.webSocket.send(JSON.stringify(socketJoinChannel));

}
leaveChannel(channelId){

  const socketLeaveChannel = new Message("onLeaveChannel",channelId,"",nomUsername, Date.now());
  this.connectionHandler.webSocket.send(JSON.stringify(socketLeaveChannel));


}
  setChannelList(){

    var symbole;
    const self = this;
    for (var i = 0; i < channelList.length; i++) {

        var newDiv = document.createElement("div");
        var newContent = document.createTextNode(channelList[i].name);
        newDiv.appendChild(newContent);
        newDiv.classList.add("channelItem");
        newDiv.setAttribute("id",channelList[i].id);
        document.getElementsByClassName("flex-channelList-container")[0].appendChild(newDiv);

       if(channelList[i].name == "Général"){
          symbole = "glyphicon-star";
        }else if(channelList[i].joinStatus){
          symbole = "glyphicon-minus";
        }else if(!(channelList[i].joinStatus)){
          symbole = "glyphicon-plus";
        }

          var symboleChannel  =   '<span class="pull-right channelBoutton">'+
                                    '<a href="#" class="btn btn-lg btn-primary">'+
                                      '<span class="glyphicon ' + symbole + '"></span>'+
                                    '</a>'+
                                   '</span>';

        $(newDiv).append(symboleChannel);

        var classname = document.getElementsByClassName("channelBoutton");
        var classnameChannelItem = document.getElementsByClassName("channelItem");
        classname[i].addEventListener('click',  function(){


        for (var i = 0; i < channelList.length; i++) {
          if(channelList[i].id == event.currentTarget.parentElement.id){
            if(!(channelList[i].name == "Général")){
              self.changeJoinStatus(channelList[i]);
            }
            break;
          }
        }
        });


        classnameChannelItem[i].addEventListener('click',  function(){

          if(channelList[i].joinStatus){

          }

          //event.currentTarget.parentElement.id){

          //    if();

         

        });
      //  document.getElementsByClassName("btn-primary")[i].addEventListener("click",
    }
  }
  setInitChannelList(e){

    channelList = [];
    joinedChannelList = [];
    currentChannelId = e.data[0].id

    for (var i = 0; i < e.data.length; i++) {
      var messageList = []
      var channel = new Channel(e.data[i].id,e.data[i].name,e.data[i].joinStatus,messageList,e.data[i].numberOfUsers);

      if(channel.joinStatus){
        joinedChannelList.push(channel);
      }
      channelList.push(channel);
    }
  }

  update(e){
    console.log(e);
    const self = this;

    if(e.eventType=="updateChannelsList"){

      if(this.premiereConnection){
        currentChannelId = e.data[0].id
        this.premiereConnection = false;
      }
        document.getElementsByClassName("flex-channelList-container")[0].innerHTML = "";
        self.setInitChannelList(e);
        self.setChannelList(e);


    }
    if(e.eventType=="onLeaveChannel"){

    }
    if(e.eventType=="onJoinChannel"){

    }
    if(e.eventType=="onCreateChannel"){

      }


  }


}
