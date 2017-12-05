const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')
const http =require('http')
const socket = require('socket.io')
const model = require('./model')
const Chat = model.getModel('chat')

const app = express()
const server = http.Server(app)
const io = socket(server)

io.on('connection',(socket) => {
    socket.on('sendmsg',(data) => {
        const {from,to,msg} = data 
        console.log(data)
        const chatid = [from,to].sort().join('_')
        Chat.create({chatid,from,to,content:msg},(err,doc) => {
            io.emit('recvmsg',Object.assign({},doc._doc))
        })
        // io.emit('recvmsg',data)
    })
})



app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)

server.listen(8080,function(){
    console.log('app start at port 8080')
})






app.get('/data',(req,res) => {
    res.json({
        user:'xiaoyuan',
        isAuth:false
    })
})

