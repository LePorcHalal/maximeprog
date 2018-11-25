
/**
 * @description obeserver des messages
 * @author Vincent Tessier et Vincent Angell
 * @copyright Ecole Polytechnique de MontrÃ©al & Course LOG2420
 * @version 1.0.0
 */

class messagesObserver {

  /**
   * @constructor
   */
	constructor() {

		this.notifHandler = new NotificationHandler();

		var modal = document.getElementById('myModal');

		document.getElementById("btnAddChannel").addEventListener("click", function () {

			modal.style.display = "block";

		});
	}

/**
  * Permet de jouer un son
  */
	sonMessage() {
		audio.pause();
		audio.currentTime = 0;
		audio.play();
	}
  /**
   * Gère l'arrivé d'un message du webSocket
   * @param {JSON} messageData -event du webSocket (contenu du message)
   */
	handleMessageReceived(messageData) {

		const self = this;
		//insere le message dans le bon channel
		if (messageData.channelId == currentChannelId) {

			self.insertChat(messageData.sender, messageData.data, messageData.timeStamp);

		} else {

		}
	}
  /**
   * Insère le message dans le HTML
   * @param {string} sender -Personne qui a envoyé le message
   * @param {string} messageText -Contenu du message
   * @param {JSON} timeStamp -temps que le message a ete recu
   */
	insertChat(sender, messageText, timeStamp) {

		const you = "https://pbs.twimg.com/profile_images/918264641368629249/F78xAklG_400x400.jpg";
		const me = "https://image-store.slidesharecdn.com/33be41bd-29a2-44d4-8b81-4805eac10600-original.jpeg";
		const self = this;

		if (timeStamp === undefined) {
			timeStamp = 0;
		}
		var control = "";
		var date = self.formatAMPM(new Date());

		if (sender == nomUsername) {
			control =
				'<li style="width:85%;">' +
				'<div class="msj-rta macro">' +
				'<div class="text text-r">' +
				'<p>' + messageText + '</p>' +
				'<p><small>' + date + '</small></p>' +
				'</div>' +
				'<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:60%;" src="' + you + '" /></div>' +
				'</li>';

		} else if (sender == "Admin") {

			control = '<li style="width:100%">' +
				'<div id="groupJoinId">' + messageText + '</div>' +
				'</li>';

		} else {

			control = '<li style="width:85%">' +
				'<div id="nomSenderId">' + sender + '</div>' +
				'<div class="msj macro">' +
				'<div class="avatar"><img class="img-circle" style="width:60%;" src="' + me + '" /></div>' +
				'<div class="text text-l">' +
				'<p>' + messageText + '</p>' +
				'<p><small>' + date + '</small></p>' +
				'</div>' +
				'</div>' +
				'</li>';

		}

		$("ul").append(control).scrollTop($("ul").prop('scrollHeight'));

	}
  /**
   * Format la date
   * @param {Date} date -Date du message
   */
	formatAMPM(date) {
		var jourPossible = ["DIM", "LUN","MAR", "MER", "JEU", "VEN", "SAM"];
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var jour = jourPossible[date.getDay()];
		var dateAuj = date.getDate();
		var ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0' + minutes : minutes;
		var strTime = jour + ' ' + dateAuj+ ', ' + hours + ':' + minutes + ' ' + ampm;
		return strTime;
	}
  /**
   * Insère le message dans le HTML
   * @param {JSON} e -evenement du WebSocket
   */
	verifProvenanceMessage(e) {
		const self = this;
		var checkbox = document.getElementById('sonId');

		if (checkbox.checked && e.sender != nomUsername && e.sender != "Admin") {
			self.sonMessage();
		}
		if (e.channelId != currentChannelId && e.sender != "Admin") {
			this.notifHandler.addNotifChannel(e.channelId);
			this.notifHandler.updateNombreNotif()
		}
	}
  /**
   * Update visuel de la vue
   * @param {JSON} e -evenement du WebSocket
   */
	refreshView(e) {
		const self = this;
		var listeDesMessagesDuChannel = e.data.messages;

		currentChannelId = e.channelId;

		this.notifHandler.removeNotifChannel(e.channelId);
		this.notifHandler.updateNombreNotif()
		self.resetChat();

		for (var i = 0; i < listeDesMessagesDuChannel.length; i++) {

			self.handleMessageReceived(listeDesMessagesDuChannel[i]);

		}
	}
  /**
   * Reset de la boite avec tous les messages
   */
	resetChat() {
		$("ul").empty();
	}
  /**
   * Update (quand l'observer se fait notify pas un observable)
   * @param {JSON} e -evenement du WebSocket
   */
	update(e) {

		const self = this;

		if (e.eventType == "onGetChannel") {

			self.refreshView(e);

		} else {
			self.verifProvenanceMessage(e);
			console.log(e);
			self.handleMessageReceived(e);

		}
	}
}
