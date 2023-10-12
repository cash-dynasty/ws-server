import express, { Express, Request, Response } from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import axios from 'axios'
import dotenv from 'dotenv'

const app: Express = express()
const server = createServer(app)
dotenv.config()
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Hello world</h1>')
})

const onlineUsers = new Map()

io.on('connection', (socket) => {
  console.log('connect', socket.id)
  socket.on('userConnected', (userId) => {
    onlineUsers.set(socket.id, userId)
    io.emit('onlineUsers', onlineUsers.size)
  })

  socket.on('sendChatMessage', async (data) => {
    const incommingMessage = await axios.post(
      `${process.env.BE_BASE_URL}/api/chat`,
      {
        message: data.message,
        fromId: data.userId,
        conversation: data.conversation,
      },
      { headers: { wsToken: process.env.WS_AUTH_TOKEN } },
    )
    // const sendToSocket = onlineUsers.get('53cb11d7-48b0-4958-a722-5bfc3f8e3d72')
    if (incommingMessage.data.data.id) {
      io.emit('chat', incommingMessage.data.data)
    }
  })

  socket.on('check', (data) => {
    console.log('socketID', socket.id, data)
    console.log('onlineUsersSize', onlineUsers.size)
    console.log('onlineUsers', [...onlineUsers.entries()])
    // const user = [...onlineUsers.entries()].find(([key, val]) => val === socket.id)
  })

  socket.on('disconnect', () => {
    console.log('disconnect', socket.id)
    onlineUsers.delete(socket.id)
    io.emit('onlineUsers', onlineUsers.size)
  })
})

server.listen(3001, () => {
  console.log('server running at port 3001')
})
