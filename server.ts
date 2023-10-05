// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {Server} from "socket.io";

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("a user connected", socket.client.id, 'elo' );
//
//   socket.on("chat", async (props) => {
//     console.log("message: " + JSON.stringify(props));
//
//     await axios
//         .post("https://cashdynasty.pl/api/chat", {
//           message: props.message,
//           userId: props.userId,
//           conversation: props.conversation,
//         })
//         .then((res) => {
//           io.emit("chat", props.message);
//         });
//   });
// });

const io = new Server(3001)

io.on('connection', (socket) => {
        socket.emit('hello', 'world'
        )
        socket.on('howdy', (arg) => {
            console.log(arg)
        })
    }
)