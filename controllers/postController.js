const Post = require("../models/posts");
const { successHandler, errorHandler } = require('../service/responseHandler.js');

const posts = {
    async getPosts(req, res) {
        try {
            const allPosts = await Post.find();
            successHandler(res, allPosts);
        } catch (error) {
            errorHandler(res, error);
        }
    },
    async createPost(req, res) {
        
        try {
            const { body } = req;
            const newPost = await Post.create({
                name: body.name,
                content: body.content,
                tags: body.tags,
                type: body.type,
            })
            successHandler(res, newPost);
        } catch (error) {
            errorHandler(res, error);
        }
    },
    async deleteAllPosts(req, res) {
        try {
            const deletePosts = await Post.deleteMany();
            const allPosts = await Post.find();
            successHandler(res, allPosts)
        } catch (error) {
            errorHandler(res, error);
        }
    },
    async deletePost(req, res) {
        const id = req.params.id;
        if (id === null) errorHandler(res, { message: '沒有填寫ID' });
        try {
            const deletePost = await Post.findByIdAndDelete(id);
            if (deletePost === null) throw { message: "查無ID" }
            const allPosts = await Post.find();
            successHandler(res, allPosts);
        } catch (error) {
            console.log(error);
            errorHandler(res, error)
        }
    },
    async updatePost(req, res) {
        const id = req.params.id;
        if (id === null) errorHandler(res, { message: '沒有填寫ID' });
        try {
            const postData = req.body;
            if (!postData.content) throw { message: "未填寫內容" }
            const updatePost = await Post.findByIdAndUpdate(id, postData, { runValidators: true });
            if (updatePost === null) throw { message: "查無ID" };
            const allPosts = await Post.find();
            successHandler(res, allPosts);
        }
        catch (error) {
            errorHandler(res, error)
        }
    },
}

module.exports = posts;