
/**
 * @description l'observer des channels
 * @author Vincent Tessier et Vincent Angell
 * @copyright Ecole Polytechnique de MontrÃ©al & Course LOG2420
 * @version 1.0.0
 */

class channelsObserver {

  /**
   * @constructor
   * @param {Main} main -permet au channelsObesrver de créer des eventListener permettant d'envoyer des messages au WebSocket (onJoinChannel,onLeaveChannel)
   */
	constructor(main) {
		this.main = main;
	}

  /**
   * Permet de filter dans le bon ordre la liste des channels
   */
	filtrer() {
		var listeFiltrer = channelList.filter(channel => channel.joinStatus == true);
		for (var i = 0; i < channelList.length; i++) {
			if (channelList[i].joinStatus == false) {
				listeFiltrer.push(channelList[i]);
			}
		}
		return listeFiltrer
	}
  /**
   * Permet d'initialiser la liste des messages
   * @param {JSON} e -evenement du WebSocket
   */
	setInitChannelList(e) {
		const self = this;
		channelList = [];

		currentChannelId = e.data[0].id

		for (var i = 0; i < e.data.length; i++) {
			var messageList = []
			var channel = new Channel(e.data[i].id, e.data[i].name, e.data[i].joinStatus, messageList, e.data[i].numberOfUsers);
			channelList.push(channel);
		}
		channelList = self.filtrer();
	}
  /**
   * Permet de mettre à jour l'affichage des channels
   * @param {JSON} e -evenement du WebSocket
   */
	update(e) {
		const self = this;

		if (e.eventType == "updateChannelsList") {

			if (this.premiereConnection) {
				currentChannelId = e.data[0].id
				document.getElementById("groupeActifId").innerHTML = e.data[0].name;
				this.premiereConnection = false;
			}

			document.getElementsByClassName("flex-channelList-container")[0].innerHTML = "";
			self.setInitChannelList(e);
			this.main.setChannelList(e);

		}
	}
}
