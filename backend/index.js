require('dotenv').config();
const { connection } = require('./db/db');
const { userRouter } = require('./routes/user.routes')

const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    return res.status(200).send({
        "message": "Welcome to User Management Dashboard Backend Server.💖",
        "status": 200,
        "data": null
    })
})

// all user routes will be redirected from here

app.use("/api/users", userRouter);

app.all("*", (req, res) => {
    return res.status(404).send({
        "message": "Invalid URL Detected",
        "status": 404
    })
})


app.listen(process.env.PORT, async () => {

    try {

        await connection;
        console.log(`Connected to Database Successfully. Server Listening at port : ${process.env.PORT}.`);
    } catch (error) {
        console.log(error.message);
    }
})
