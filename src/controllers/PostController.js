const Post = require("../models/Post");

// GET /posts
exports.getAllPosts = async(req, res, next) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        next(err);
    }
};

// GET /posts/:id
exports.getPostById = async(req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            const error = new Error("Post não encontrado");
            error.statusCode = 404;
            return next(error);
        }
        res.json(post);
    } catch (err) {
        next(err);
    }
};

// POST /posts
exports.createPost = async(req, res, next) => {
    try {
        const { title, content, author } = req.body;

        if (!title || !content || !author) {
            const error = new Error("Campos obrigatórios ausentes");
            error.statusCode = 400;
            return next(error);
        }

        const post = new Post({ title, content, author });
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        next(err);
    }
};

// PUT /posts/:id
exports.updatePost = async(req, res, next) => {
    try {
        const { title, content, author } = req.body;
        const post = await Post.findByIdAndUpdate(
            req.params.id, { title, content, author, updatedAt: new Date() }, { new: true }
        );

        if (!post) {
            const error = new Error("Post não encontrado");
            error.statusCode = 404;
            return next(error);
        }

        res.json(post);
    } catch (err) {
        next(err);
    }
};

// DELETE /posts/:id
exports.deletePost = async(req, res, next) => {
    try {
        const result = await Post.findByIdAndDelete(req.params.id);
        if (!result) {
            const error = new Error("Post não encontrado");
            error.statusCode = 404;
            return next(error);
        }

        res.json({ message: "Post deletado com sucesso" });
    } catch (err) {
        next(err);
    }
};

// GET /posts/search?q=termo
exports.searchPosts = async(req, res, next) => {
    try {
        const query = req.query.q;

        if (!query) {
            const error = new Error("Parâmetro de busca 'q' é obrigatório");
            error.statusCode = 400;
            return next(error);
        }

        const posts = await Post.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { content: { $regex: query, $options: "i" } }
            ]
        });

        res.json(posts);
    } catch (err) {
        next(err);
    }
};