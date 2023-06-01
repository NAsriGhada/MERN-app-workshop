const Post = require("../models/postSchema");

// i changed id to _id in everything in case you forgot
const getPosts = async (req, res) => {
  const posts = await Post.find({ user: req.user._id });
  console.log('this is req.user',req.user, 'and its postss',posts)

  res.status(200).json(posts);
};

const setPosts = async (req, res) => {
  if (!req.body.description || !req.body.title) {
    res.status(400);
    console.log("Please add a text field");
  }

  const post = await Post.create({
    title: req.body.title,
    description: req.body.description,
    user: req.user._id,
  });
  console.log('this is the post', post)

  res.status(200).json(post);
};

module.exports = {
  getPosts,
  setPosts,
};
