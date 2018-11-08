
class connectionHandler {

   constructor() {
      this.arrayObserver = [];
   }

   addMessagesObserver(observer){
     this.messagesObserver = observer;
   }
   addChannelsObserver(observer){
     this.channelsObserver = observer;
   }

   connection() {
     
     this.webSocket = new WebSocket("ws://log2420-nginx.info.polymtl.ca/chatservice");
        const self = this; //Because this refers to the context, it will change in the function

             this.webSocket.onmessage = function(e){
               var messageData = JSON.parse(e.data);
               self.eventHandler(messageData);

               console.log(e.data);
             };

   }

   sendText() {
     // Construct a msg object containing the data the server needs to process the message from the chat client.

   //obtention du texte
      var data = document.getElementById("textBoxInput").value;
      const socketMessage = new Message("onMessage", currentChannelId, data,"MAXIME", Date.now());
       console.log("Message sent to socket : \n" + JSON.stringify(socketMessage));
       this.webSocket.send(JSON.stringify(socketMessage));
       //reset du texte
       document.getElementById("textBoxInput").value = "";

     }

   eventHandler(e){

     const self  = this;
     if(e.eventType=="onMessage"){
       self.notify_messageObserver(e);
      // handleMessageReceived(messageData);
     }
     else{
       self.notify_channelObserver(e);
     }

   }

   notify_messageObserver(e) {
      const self = this;
      self.messagesObserver.update(e);
   }
   notify_channelObserver(e) {
      const self = this;
      self.channelsObserver.update(e);
   }


}
