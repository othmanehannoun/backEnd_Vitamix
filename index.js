const express = require('express')
const mongoose = require('mongoose')
const expressValidator = require('express-validator')
const helmet = require("helmet")
var cors = require('cors')
var cookieParser = require('cookie-parser')

// Import route
const usersRouter = require('./routes/users')
const emailRouter = require('./routes/mail')
const categoryRouter = require('./routes/category')
const productRouter = require('./routes/product')
const subcategoryRouter = require('./routes/subCategory')
const orderRouter = require('./routes/order')


// config app
require('dotenv').config()
const app = express()
const http = require('http')

// socket
const socketIO = require('socket.io')
const server = require('http').createServer(app)
const io = socketIO(server)


app.use(cors())

// connection to database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    tlsAllowInvalidHostnames: true,
    tlsAllowInvalidCertificates: true,
})
.then(() => console.log('connected to database'))
.catch(() => console.log('database is not connected'))

// test app
app.get('/', (req, res) => {
    res.send("welcome to vitamix server api")
})

// middllwares
app.use('/public', express.static('./public'));
app.use(express.json())
app.use(expressValidator())
app.use(cookieParser())

// secret your app
app.use(helmet());

// routes middllwares
app.use('/api/user', usersRouter)
app.use('/api/emails', emailRouter)
app.use('/api/category', categoryRouter)
app.use('/api/product', productRouter)
app.use('/api/subcategory', subcategoryRouter)
app.use('/api/order', orderRouter)

// const port = process.env.PORT || 3000
// const server = app.listen(port, () => console.log(`app is now listening at port ${port}`));


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`app is now listening at port ${PORT}`))

io.on("connection", socket => {
 
   socket.on('joinNotificationRoom', (id) =>{
       socket.join(id);
      
   });

   socket.on('sendFriendReques', (data)=>{

    console.log("DATA EMIT", data)
    io.to(data.userId).emit('newFriendRequest', {name: data.userNameFrom, id: data.userIdFROM})

    //    sendFriendRequest(data).then(()=>{
    //        socket.emit('requestSend')
    //        io.to(data.friendId).emit('newFriendRequest', {name: data.myName, id: data.myId})
    //    }).catch(err=>{
    //        console.og('Error:', err)
    //        socket.emit('requestFailed');
    //    })
   })





}); 


  
//   io.on("connection", (socket) => {
//     // console.log("Connected to socket.io");

//     socket.on('testApp', (userData)=>{
//         socket.join(userData)
//         // console.log()
//     })
//     // socket.on("setup", (userData) => {
//     //   socket.join(userData._id);
//     //   socket.emit("connected");
//     // });

//     socket.on("new message", (newMessageRecieved) => {
//         var chat = newMessageRecieved.chat;
    
//         if (!chat.users) return console.log("chat.users not defined");
    
//         chat.users.forEach((user) => {
//           if (user._id == newMessageRecieved.sender._id) return;
    
//           socket.in(user._id).emit("message recieved", newMessageRecieved);
//         });
//       });
  
//   });
