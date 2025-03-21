import express from "express";
import cors from "cors";
import {IData} from "./types";

const app = express();
const port = 8000;
const Vigenere = require('caesar-salad').Vigenere;
let data: IData | null = null;
let encodeMessage = "";

app.use(express.json());
app.use(cors());

app.post("/encode", async (req, res) => {

    if (req.body.password.trim() === "") {
        res.status(400).send({error: "Password not entered"});
        return;
    }

    if (req.body.message.trim() === "") {
        res.status(400).send({error: "Message not entered"});
        return;
    }

    data = {
        password: req.body.password,
        message: req.body.message.toLowerCase(),
    };

    encodeMessage = await Vigenere.Cipher(data.password).crypt(data.message);
    res.send({encoded: encodeMessage});
});

app.post("/decode", async (req, res) => {

    if (!data) {
        res.status(400).send({error: "Invalid Credentials"});
        return;
    }

    if (req.body.password.trim() === "" || req.body.message.trim() === "") {
        res.status(400).send({error: "Data not entered"});
        return;
    }

    if (req.body.message !== encodeMessage && req.body.password !== data.password) {
        res.status(400).send({error: "incorrect data"});
        return;
    }

    const decodeMessage = await Vigenere.Decipher(data.password).crypt(req.body.message);
    res.send({decoded: decodeMessage});

});

const run = async () => {
    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    })
};

run().catch(console.error);