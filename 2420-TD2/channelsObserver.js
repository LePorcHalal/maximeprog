class channelsObserver {

	constructor(main) {
		this.main = main;
	}

	filtrer() {
		var listeFiltrer = channelList.filter(channel => channel.joinStatus == true);
		for (var i = 0; i < channelList.length; i++) {
			if (channelList[i].joinStatus == false) {
				listeFiltrer.push(channelList[i]);
			}
		}
		return listeFiltrer
	}
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
