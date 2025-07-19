const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("./routes/posts");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const port = 3000;

app.use(express.json());
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
    res.send("API Blogging - Tech Challenge 🚀");
});

app.use(errorHandler);

mongoose.connect(
    "mongodb+srv://techchallenge:MXjPGiPwDto4oLum@tech-challenge-2.ycsoxeu.mongodb.net/?retryWrites=true&w=majority&appName=tech-challenge-2"
).then(() => {
    console.log("MongoDB conectado com sucesso.");
    app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));
}).catch((err) => {
    console.error("Erro ao conectar no MongoDB", err);
});