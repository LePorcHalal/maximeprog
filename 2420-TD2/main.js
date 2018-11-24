//wt.base = "ws://log2420-nginx.info.polymtl.ca/chatservice";
//endPoint = url_base?username={ nom };
//wt client = new WebSocket(endPoint);
//var client = new WebSocket("ws://log2420-nginx.info.polymtl.ca/chatservice");


var currentChannelId;
var channelList = [];
var joinedChannelList = [];
var nomUsername = "Caporal Maxime"

class Main {

  constructor() {
    const self = this;
    self.initMain();

  }

  initMain() {

    const self = this;
    this.connectHandlerObservable = new connectionHandler(nomUsername);

    this.channelsObs = new channelsObserver(this);

    this.messagesObs = new messagesObserver();

    this.connectHandlerObservable.addChannelsObserver(this.channelsObs);
    this.connectHandlerObservable.addMessagesObserver(this.messagesObs)

    this.connectHandlerObservable.connection();

    self.initEventlisteners();

  }

  initEventlisteners() {
    const self = this;

    //Event du bouton enter
    document.getElementById("btnEnter").addEventListener("click", function () {

      self.sendText();

    });
    //Event touche enter
    document.addEventListener('keydown', (event) => {
      const nomTouche = event.key;

      if (nomTouche === 'Enter') {
        self.sendText();
      }

    }, false);
    //Event boutonAjouterChannel
    document.getElementById("btnNouveauChannel").addEventListener("click", function () {

      self.addChannel();

    });
    document.getElementById("btnNouveauChannel").addEventListener("click", function () {

      self.addChannel();

    });
  }

  addChannel() {
    const socketChannel = new Message("onCreateChannel", "", document.getElementById("nomNouveauChannelID").value, nomUsername, Date.now());
    this.connectHandlerObservable.webSocket.send(JSON.stringify(socketChannel));
    document.getElementById("nomNouveauChannelID").value = "";
  }

  sendText() {

    //obtention du texte
    var data = document.getElementById("textBoxInput").value;
    const socketMessage = new Message("onMessage", currentChannelId, data, "MAXIME", Date.now());
    console.log("Message sent to socket : \n" + JSON.stringify(socketMessage));
    this.connectHandlerObservable.webSocket.send(JSON.stringify(socketMessage));

    //reset du texte box
    document.getElementById("textBoxInput").value = "";

  }
  changeJoinStatus(channel, channelGeneral) {

    const self = this;

    if (channel.joinStatus) {

      channel.joinStatus = false;
      self.leaveChannel(channel.id, channelGeneral.id);

    } else {

      channel.joinStatus = true;
      self.joinNewChannel(channel.id);

    }


  }
  setChannelList() {

    var symbole;
    const self = this;
    for (var i = 0; i < channelList.length; i++) {

      var newDiv = document.createElement("div");
      var newContent = document.createTextNode(channelList[i].name);
      newDiv.appendChild(newContent);
      if (i % 2 == 1) {
        newDiv.style.backgroundColor = "#FFFFFF";
      }
      else {
        newDiv.style.backgroundColor = "#BBB";
      }
      newDiv.classList.add("channelItem");
      newDiv.setAttribute("id", channelList[i].id);
      document.getElementsByClassName("flex-channelList-container")[0].appendChild(newDiv);

      if (channelList[i].name == "Général") {
        symbole = "glyphicon-star";
      } else if (channelList[i].joinStatus) {
        symbole = "glyphicon-minus";
      } else if (!(channelList[i].joinStatus)) {
        symbole = "glyphicon-plus";
      }

      var symboleChannel = '<span class="pull-right channelBoutton">' +
        '<a href="#" class="btn btn-lg btn-primary">' +
        '<span class="glyphicon ' + symbole + '"></span>' +
        '</a>' +
        '</span>';

      $(newDiv).append(symboleChannel);

      var classnameButton = document.getElementsByClassName("channelBoutton");
      var classnameDiv = document.getElementsByClassName("channelItem");
      var classnameChannelItem = document.getElementsByClassName("channelItem");

      classnameButton[i].addEventListener('click', function () {



        for (var i = 0; i < channelList.length; i++) {

          if (channelList[i].id == event.currentTarget.parentElement.id) {
            if (!(channelList[i].name == "Général")) {
              self.changeJoinStatus(channelList[i], channelList[0]);
            }
            break;
          }

        }

      });


      classnameDiv[i].addEventListener('click', function () {

        if (event.target !== this) {
          return;
        }

        for (var i = 0; i < channelList.length; i++) {

          if (channelList[i].id == event.currentTarget.id) {
            if (channelList[i].joinStatus) {
              self.joinChannel(channelList[i].id);
            }
            break;
          }

        }


      });

    }
  }
  joinChannel(channelId) {
    const self = this
    const socketGetChannel = new Message("onGetChannel", channelId, "", nomUsername, Date.now());
    this.connectHandlerObservable.webSocket.send(JSON.stringify(socketGetChannel));
  }

  joinNewChannel(channelId) {
    const self = this;
    const socketJoinChannel = new Message("onJoinChannel", channelId, "", nomUsername, Date.now());
    this.connectHandlerObservable.webSocket.send(JSON.stringify(socketJoinChannel));
    self.joinChannel(channelId);


  }
  leaveChannel(channelId, channelGeneralId) {
    const self = this
    const socketLeaveChannel = new Message("onLeaveChannel", channelId, "", nomUsername, Date.now());
    this.connectHandlerObservable.webSocket.send(JSON.stringify(socketLeaveChannel));

    const socketGetChannel = new Message("onGetChannel", channelGeneralId, nomUsername, Date.now());
    this.connectHandlerObservable.webSocket.send(JSON.stringify(socketGetChannel));



  }
}
