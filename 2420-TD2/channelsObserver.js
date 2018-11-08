class channelsObserver {

  constructor(connectionHandler) {
    this.connectionHandler = connectionHandler;
    const self = this;

  }
  changeJoinStatus(channel){

    if(channel.joinStatus){
      channel.joinStatus=false;
      connectionHandler.changeChannel(id);
      //webSocket.onLeaveChannel(channel.id);
    }else{
      channel.joinStatus=true;
      //webSocket.onJoinChannel(channel.id);
    }
  }
  setChannelList(){

    var symbole;

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

          var symboleChannel  =   '<span class="pull-right channelBoutton">'+
                                    '<a href="#" class="btn btn-lg btn-primary">'+
                                      '<span class="glyphicon ' + symbole + '"></span>'+
                                    '</a>'+
                                   '</span>';

        $(newDiv).append(symboleChannel);

        var classname = document.getElementsByClassName("channelBoutton");

        classname[i].addEventListener('click',  function(){
          event.currentTarget.parentElement.innerText

        for (var i = 0; i < channelList.length; i++) {
          if(channelList[i].name == event.currentTarget.parentElement.innerText){
            if(!(channelList[i].name == "Général")){
              changeJoinStatus(channelList[i]);
            }
            break;
          }
        }
            alert("max");

        });
      //  document.getElementsByClassName("btn-primary")[i].addEventListener("click",
    }
  }

  update(e){

    const self = this;

    if(e.eventType=="updateChannelsList"){

      if(channelList.length == 0){
        //init de base (creation darray avec les channels)
        self.setInitChannelList(e);
      }

      self.setChannelList(e);

      console.log(e);
    }
    if(e.eventType=="onLeaveChannel"){

    }
    if(e.eventType=="onJoinChannel"){

    }
    if(e.eventType=="onCreateChannel"){

      }


  }

  setInitChannelList(e){

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
}
