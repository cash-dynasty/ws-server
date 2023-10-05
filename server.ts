// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import express from "express";
import {Server} from "socket.io";
import cors from 'cors'

const app = express();

// const origin = "https://cashdynasty.pl"
const origin = "*"

app.use(cors())
// app.use(express.json())


app.get("/", (req, res) => {
    res.send("<h1>Hello world</h1>");
});


app.listen(3001, () => {
    console.log(`server running at port 3001`);
});


const io = new Server(serwerek, {
    cors: {
        origin: ['https://cashdynasty.pl', 'http://localhost:3000'],
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("a user connected", socket.client.id);

    socket.on("chat", async (props) => {
        console.log("message: " + JSON.stringify(props));

        // await axios
        //     .post("https://cashdynasty.pl/api/chat", {
        //       message: props.message,
        //       userId: props.userId,
        //       conversation: props.conversation,
        //     })
        //     .then((res) => {
        io.emit("chat", props.message);
        // });
    });
});