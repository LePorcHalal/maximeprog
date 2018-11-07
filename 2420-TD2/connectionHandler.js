class connectionHandler {

   constructor(username) {
     this.username = username;

   }

   connection() {
     this.webSocket =  new WebSocket("ws://log2420-nginx.info.polymtl.ca/chatservice");
             const self  = this; //Because this refers to the context, it will change in the function

             this.webSocket.onmessage = function(e){
               eventHandler(e);
               console.log(e.data);
             };

   }

   eventHandler(e){

     if(e.eventType=="onMessage"){
       messageData = JSON.parse(e.data);
       handleMessageReceived (messageData);
     }

     if(e.eventType=="updateChannelsList"){
       jsonChannelId = JSON.parse(e.data);
       setInitChannelList();
       setChannelList();
       premiereConnection = false;
       console.log(jsonChannelId);
     }
   }


}
