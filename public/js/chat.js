var app = {
	socket: {},
	initialize: function(){

		_.bindAll(this,"onMessage","sendMessage","keyupHandler");
		
		this.socket = io.connect("http://localhost:3700");
		this.field = $("#field");
		this.sendButton = $("#send");
		this.content = $("#content");
		this.name = $("#name");

		this.socket.on("message",this.onMessage,this);

		this.sendButton.click(this.sendMessage);
		this.field.keyup(this.keyupHandler);
		
	},
	keyupHandler: function(e){
		if(e.keyCode == 13){
				this.sendMessage();
		}
	},
	sendMessage: function(){

		var username = this.name.val();
		if(username == ""){
			alert("Please input your name!");
		} else {
			var text = this.field.val();

			this.socket.emit("send",{message: text,username: username});
			this.field.val("");
		}
	},
	onMessage: function(data){

		if(data.message){
			
			var html = "";
			
			html += "<b>"+(data.username?data.username:"server")+":</b>";
			html += data.message + "<br />";

			
			this.content.append(html);
			this.content.scrollTop(this.content.height());
		} else {
			console.log("there is an error happen:",data);
		}
	}
}

$(function(){
	app.initialize();
});