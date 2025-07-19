const Post = require("../models/Post");

// GET /posts
exports.getAllPosts = async(req, res) => {
    const posts = await Post.find();
    res.json(posts);
};

// GET /posts/:id
exports.getPostById = async(req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post não encontrado" });
    res.json(post);
};

// POST /posts
exports.createPost = async(req, res) => {
    const { title, content, author } = req.body;
    const post = new Post({ title, content, author });
    await post.save();
    res.status(201).json(post);
};

// PUT /posts/:id
exports.updatePost = async(req, res) => {
    const { title, content, author } = req.body;
    const post = await Post.findByIdAndUpdate(
        req.params.id, { title, content, author, updatedAt: new Date() }, { new: true }
    );
    if (!post) return res.status(404).json({ error: "Post não encontrado" });
    res.json(post);
};

// DELETE /posts/:id
exports.deletePost = async(req, res) => {
    const result = await Post.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: "Post não encontrado" });
    res.json({ message: "Post deletado com sucesso" });
};

// GET /posts/search?q=termo
exports.searchPosts = async(req, res) => {
    const query = req.query.q;
    const posts = await Post.find({
        $or: [
            { title: { $regex: query, $options: "i" } },
            { content: { $regex: query, $options: "i" } }
        ]
    });
    res.json(posts);
};