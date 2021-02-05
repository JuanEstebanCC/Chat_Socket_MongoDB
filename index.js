const express = require("express");
const path = require("path");
var ioImage = require("socket.io")(http);
const app = express();
var http = require("http").Server(app);

/* //image
app.use("/static",express.static(__dirname+"/static"));

app.set("views",__dirname+"/views");
app.set("view engine","jade");

app.get("/",function(req,res){
    res.render("index")
}); */

ioImage.sockets.on("connection",function(socket){
    socket.on("user image", function(image){
        io.sockets.emit("addimage","Imagen Compartida",image)
    })
})

//chat

app.set("port", 4500);
app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});

//WebSockets
const SocketID = require("socket.io");
const io = SocketID(server);

io.on("connection", (socket) => {
    console.log("Se ha conectado alguien", socket.id);

    socket.on("chat:message",(data)=>{
        io.sockets.emit("chat:message",data);
    });

    socket.on("chat:typing", (data)=>{
        socket.broadcast.emit("chat:typing", data);
    });
});