class channelsObserver(){

  constructor(currentChannelId){

    this.currentChannelId = currentChannelId;

  }

  setChannelList(){

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

  setInitChannelList(){

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
}
