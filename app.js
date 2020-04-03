const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('./socketIo').init(http)

// const websocketServer = require('ws').Server;

const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const compression = require('compression')
const packageRoute = require('./Routes/packageRoute')
const bookingRoute = require('./Routes/bookingRoute')

// Connect Database
connectDB()

// Init Middleware
app.use(cors())
//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Defined Routes
app.get('/', (req, res, next)=> {
    res.send('home page')
})
app.use('/api/package', packageRoute)
app.use('/api/booking', bookingRoute)

// Page Not-found Route
app.use('*', (req, res, next)=> {
    res.status(500).json({msg: "Page not found"})
})

app.use(helmet());
app.use(compression())

const PORT = process.env.PORT || 3040

http.listen(PORT, ()=> console.log(`app listen at port ${PORT}`)) 

// open connection with IO
io.on('connection', function(socket){
    console.log('user connected')

    socket.on('disconnect', function(){
        console.log('user disconnected')
    })
})

// WebSocket connection failed but will look into in later

// const wss = new websocketServer({port: http})
// wss.on('connnection', function(ws) {
    
//     console.log('client connnected')
//     ws.on('message', function(message) {
//         console.log('Received: ' +message)
//         wss.clients.forEach((client)=>{
//             if(client != ws) client.send(message)
//         })
//     })
//     ws.send('hey i am from the server')
    
//     ws.on('close', function(){
//         console.log('i lost a client')
//     })
//     console.log('client connected')
// })