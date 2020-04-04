let io 
module.exports = {
    init: (server)=>{
        io = require('socket.io')(server)
        console.log("socket server found")
        return io
    },
    getIO: () => {
        if (!io){
            throw new Error('socket.io not initiat=lized!')
        }
        return io
    }
}