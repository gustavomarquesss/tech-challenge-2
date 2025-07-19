const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json())
const port = 3000;

app.use(express.json());

const Blog = mongoose.model("Blog", {
    title: String,
    content: String,
    createdAt: Date,
    updatedAt: Date,
});

app.get("/", async(req, res) => {
    const blogs = await Blog.find()
    res.send(blogs);
});

app.post("/", async(req, res) => {
    const blog = new Blog({
        title: req.body.title,
        content: req.body.content,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
    });

    await blog.save();
    res.send(blog);
});

app.listen(port, () => {
    mongoose.connect(
        "mongodb+srv://techchallenge:MXjPGiPwDto4oLum@tech-challenge-2.ycsoxeu.mongodb.net/?retryWrites=true&w=majority&appName=tech-challenge-2"
    );
    console.log("App running");
});