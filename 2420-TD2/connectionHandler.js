
class connectionHandler {

   constructor(username) {
      this.arrayObserver = [];
      this.username=username;
   }

   addMessagesObserver(observer){
     this.messagesObserver = observer;
   }
   addChannelsObserver(observer){
     this.channelsObserver = observer;
   }

   getUsername(){
     return this.username;

   }
   connection() {
      var user = "?username=" + this.username;
     this.webSocket = new WebSocket("ws://log2420-nginx.info.polymtl.ca/chatservice" + user);
        const self = this; //Because this refers to the context, it will change in the function

             this.webSocket.onmessage = function(e){
               var messageData = JSON.parse(e.data);
               self.eventHandler(messageData);


             };

   }
   
   eventHandler(e){

     const self  = this;
     if(e.eventType=="onError"){

       console.log("Erreur WebSocket");
      // handleMessageReceived(messageData);
     }
     if(e.eventType=="onMessage" || e.eventType=="onGetChannel"){

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
