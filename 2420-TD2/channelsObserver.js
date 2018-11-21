
class channelsObserver {

  constructor(main) {
    this.main = main;
  //  this.connectionHandler = connectionHandler;
  //  this.premiereConnection = true;
  /*
    const self = this;

    document.getElementById("btnNouveauChannel").addEventListener("click", function(){

      self.addChannel();

    });
    */


}

// addChannel(){
//  const socketChannel = new Message("onCreateChannel","", document.getElementById("nomNouveauChannelID").value,nomUsername, Date.now());
//  this.connectionHandler.webSocket.send(JSON.stringify(socketChannel));
//  document.getElementById("nomNouveauChannelID").value = "";
// }
//   changeJoinStatus(channel,channelGeneral){
//
//     const self = this;
//
//     if(channel.joinStatus){
//
//       channel.joinStatus=false;
//       self.leaveChannel(channel.id,channelGeneral.id);
//
//     }else{
//
//       channel.joinStatus=true;
//       self.joinNewChannel(channel.id);
//
//     }
//
//
// }
// joinChannel(channelId){
//   const socketGetChannel = new Message("onGetChannel",channelId,"",nomUsername, Date.now());
//   this.connectionHandler.webSocket.send(JSON.stringify(socketGetChannel));
// }
// joinNewChannel(channelId){
//   const self = this
//   const socketJoinChannel = new Message("onJoinChannel",channelId,"",nomUsername, Date.now());
//   this.connectionHandler.webSocket.send(JSON.stringify(socketJoinChannel));
//   self.joinChannel(channelId);
//
//
// }
// leaveChannel(channelId,channelGeneralId){
//
//   const socketLeaveChannel = new Message("onLeaveChannel",channelId,"",nomUsername, Date.now());
//   this.connectionHandler.webSocket.send(JSON.stringify(socketLeaveChannel));
//
//   const socketGetChannel = new Message("onGetChannel",channelGeneralId,nomUsername, Date.now());
//   this.connectionHandler.webSocket.send(JSON.stringify(socketGetChannel));
//
//


//}
  // setChannelList(){
  //
  //   var symbole;
  //   const self = this;
  //   for (var i = 0; i < channelList.length; i++) {
  //
  //       var newDiv = document.createElement("div");
  //       var newContent = document.createTextNode(channelList[i].name);
  //       newDiv.appendChild(newContent);
  //       newDiv.classList.add("channelItem");
  //       newDiv.setAttribute("id",channelList[i].id);
  //       document.getElementsByClassName("flex-channelList-container")[0].appendChild(newDiv);
  //
  //      if(channelList[i].name == "Général"){
  //         symbole = "glyphicon-star";
  //       }else if(channelList[i].joinStatus){
  //         symbole = "glyphicon-minus";
  //       }else if(!(channelList[i].joinStatus)){
  //         symbole = "glyphicon-plus";
  //       }
  //
  //         var symboleChannel  =   '<span class="pull-right channelBoutton">'+
  //                                   '<a href="#" class="btn btn-lg btn-primary">'+
  //                                     '<span class="glyphicon ' + symbole + '"></span>'+
  //                                   '</a>'+
  //                                  '</span>';
  //
  //       $(newDiv).append(symboleChannel);
  //
  //       var classnameButton = document.getElementsByClassName("channelBoutton");
  //       var classnameDiv = document.getElementsByClassName("channelItem");
  //       var classnameChannelItem = document.getElementsByClassName("channelItem");
  //
  //       classnameButton[i].addEventListener('click',  function(){
  //
  //
  //
  //       for (var i = 0; i < channelList.length; i++) {
  //
  //         if(channelList[i].id == event.currentTarget.parentElement.id){
  //           if(!(channelList[i].name == "Général")){
  //             self.changeJoinStatus(channelList[i],channelList[0]);
  //           }
  //           break;
  //         }
  //
  //       }
  //
  //       });
  //
  //
  //       classnameDiv[i].addEventListener('click',  function(){
  //
  //         if(event.target !== this){
  //           return;
  //         }
  //
  //         for (var i = 0; i < channelList.length; i++) {
  //
  //           if(channelList[i].id == event.currentTarget.id){
  //             if(channelList[i].joinStatus){
  //               self.joinChannel(channelList[i].id);
  //             }
  //             break;
  //           }
  //
  //         }
  //
  //
  //       });
  //    }
  //  }


/*
        classnameChannelItem[i].addEventListener('click',  function(){

          if(channelList[i].joinStatus){

          }

          //event.currentTarget.parentElement.id){

          //    if();



        });
        */
      //  document.getElementsByClassName("btn-primary")[i].addEventListener("click",
filtrer(){
  var listeFiltrer = channelList.filter(channel => channel.joinStatus == true);
  for (var i = 0; i < channelList.length; i++) {
    if(channelList[i].joinStatus==false){
      listeFiltrer.push(channelList[i]);
    }
  }
  return listeFiltrer
}
  setInitChannelList(e){
    const self = this;
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
    channelList = self.filtrer();
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
        this.main.setChannelList(e);


    }

  }


}
