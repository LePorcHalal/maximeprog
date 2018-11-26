
/**
 * @description connection handler (Observable)
 * @author Vincent Tessier et Vincent Angell
 * @copyright Ecole Polytechnique de MontrÃ©al & Course LOG2420
 * @version 1.0.0
 */

class connectionHandler {
	/**
	 * @constructor
	 */
	constructor(username) {
		this.arrayObserver = [];
	}
	/**
	 * Ajout du messagesObserver à l'obeservable
	 * @param {object} observer - le messagesObserver
	 */
	addMessagesObserver(observer) {
		this.messagesObserver = observer;
	}
	/**
	 * Ajout du channelsObserver à l'obeservable
	 * @param {object} observer - le channelsObserver
	 */
	addChannelsObserver(observer) {
		this.channelsObserver = observer;
	}
	/**
	 * Permet de se connecter au WebSocket
	 * @param {string} nomUsername - le nom de l'usagé
	 */
	connection(nomUsername) {
		var user = "?username=" + nomUsername;
		this.webSocket = new WebSocket("ws://log2420-nginx.info.polymtl.ca/chatservice" + user);
		const self = this; //Because this refers to the context, it will change in the function

		this.webSocket.onmessage = function (e) {
			var messageData = JSON.parse(e.data);
			self.eventHandler(messageData);
		};
	}
	/**
	 * Gère les évenements provenant du WebSocket
	 * @param {JSON} e -event du webSocket (Message provenant du WebSocket)
	 */
	eventHandler(e) {

		const self = this;

		if (e.eventType == "onError") {
			console.log("Erreur WebSocket");
		}
		if (e.eventType == "onMessage" || e.eventType == "onGetChannel") {
			self.notify_messageObserver(e);
		} else {
			self.notify_channelObserver(e);
		}
	}
	/**
	 * Permet de notify le messagesObserver
	 * @param {JSON} messageData -event du webSocket (contenu du message)
	 */
	notify_messageObserver(e) {
		const self = this;
		self.messagesObserver.update(e);
	}
	/**
	 * Permet de notify le channelsObserver
	 * @param {JSON} messageData -event du webSocket (contenu du message)
	 */
	notify_channelObserver(e) {
		const self = this;
		self.channelsObserver.update(e);
	}
}
