var currentChannelId;
var channelList = [];

var nomUsername;
var audio = new Audio("ding.wav");

class Main {

	constructor() {
		const self = this;
		self.initMain();
	}

	initMain() {

		const self = this;

		this.channelsObs = new channelsObserver(this);

		this.messagesObs = new messagesObserver();

		this.connectHandlerObservable = new connectionHandler();

		this.connectHandlerObservable.addChannelsObserver(this.channelsObs);
		this.connectHandlerObservable.addMessagesObserver(this.messagesObs);

		document.getElementById("myModalNouveauUtilisateur").style.display = "block";

		document.getElementById("btnNomUtilisteur").addEventListener("click", function () {

			self.initUtilisateur()

		});

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
				if (document.getElementById("myModalNouveauUtilisateur").style.display != "none") {

					self.initUtilisateur();

				}
      else if(document.getElementById("myModal").style.display == "block"){

          self.addChannel();

        }
        else {
					self.sendText();
				}
			}

		}, false);
		//Event boutonAjouterChannel

		document.getElementById("btnNouveauChannel").addEventListener("click", function () {

			self.addChannel();

		});
		//event pour fermer la fenetre
		document.getElementById("closes").addEventListener("click", function () {
			document.getElementById("myModal").style.display = "none";
			document.getElementById("nomNouveauChannelID").value = "";
			document.getElementById("nomNouveauChannelID").style.border = "";
		});
	}

	addChannel() {
		if (document.getElementById("nomNouveauChannelID").value.length < 5 || document.getElementById("nomNouveauChannelID").value.length > 20) {
			document.getElementById("nomNouveauChannelID").style.border = "thick solid red";
		} else {
			const socketChannel = new Message("onCreateChannel", "", document.getElementById("nomNouveauChannelID").value, nomUsername, Date.now());
			this.connectHandlerObservable.webSocket.send(JSON.stringify(socketChannel));
			document.getElementById("nomNouveauChannelID").value = "";
			document.getElementById("myModal").style.display = "none";
		}
	}

	initUtilisateur() {
		if (document.getElementById("nomNouveauUtilisateur").value.length < 3 || document.getElementById("nomNouveauUtilisateur").value.length > 15 ||
			document.getElementById("nomNouveauUtilisateur").value == "Admin") {
			document.getElementById("nomNouveauUtilisateur").style.border = "thick solid red";
		} else {
			nomUsername = document.getElementById("nomNouveauUtilisateur").value;
			document.getElementById("btnUser").innerHTML = '<i class="fa fa-user"></i> ' + nomUsername;
			this.connectHandlerObservable.connection(nomUsername);
			document.getElementById("nomNouveauUtilisateur").value = "";
			document.getElementById("myModalNouveauUtilisateur").style.display = "none";

		}
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
			document.getElementById("groupeActifId").innerHTML = channelGeneral.name;
		} else {

			channel.joinStatus = true;
			self.joinNewChannel(channel.id);
			document.getElementById("groupeActifId").innerHTML = channel.name;
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
				newDiv.style.backgroundColor = "#f2f2f2";
			} else {
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
							document.getElementById("groupeActifId").innerHTML = channelList[i].name;
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
		const socketGetChannel = new Message("onGetChannel", channelGeneralId, nomUsername, Date.now());

		this.connectHandlerObservable.webSocket.send(JSON.stringify(socketLeaveChannel));
		this.connectHandlerObservable.webSocket.send(JSON.stringify(socketGetChannel));
	}
}

class NotificationHandler {


	constructor() {
		this.notifParChannel = {};
		this.nombreDeNotif = 0;
	}

	updateNombreNotif() {
		if (this.nombreDeNotif <= 0) {
			document.getElementById("notifId").innerHTML = "";
			this.nombreDeNotif = 0;
		} else {
			document.getElementById("notifId").innerHTML = this.nombreDeNotif;
		}
	}

	addNotifChannel(channelId) {
		if (isNaN(this.notifParChannel[channelId])) {
			this.notifParChannel[channelId] = 0;
		}
		this.notifParChannel[channelId] = this.notifParChannel[channelId] + 1;
		this.nombreDeNotif++;
	}
	removeNotifChannel(channelId) {
		if (isNaN(this.notifParChannel[channelId]) == false) {
			this.nombreDeNotif = this.notifParChannel[channelId] - this.nombreDeNotif;
			this.notifParChannel[channelId] = 0;
		}

	}
}

function popUpOpen() {
	var popup = document.getElementById("myPopup");
	popup.classList.toggle("show");
}
