const Notification = require("../models/Notification.model");
const Post = require("../models/Post.model");
const User = require("../models/User.model");

// Create post
exports.createPost = async (req, res) => {
  const { imageURL, caption } = req.body;
  const authorId = req.user.userId; // Access userId from the request object after authentication

  try {
    const newPost = new Post({ imageURL, caption, author: authorId });
    await newPost.save();

    const user = await User.findById(authorId);
    user.posts.push(newPost); 
    await user.save();

    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name")
      .populate("comments.author", "name");
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all posts by user
exports.getAllPostsByUser = async (req, res) => {
  const userId = req.params.id; 
  try {
    const posts = await Post.find({ author: userId })
      .populate("author", "name")
      .populate("comments.author", "name");
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete post by ID
exports.deletePostById = async (req, res) => {
  const postId = req.params.id;

  try {
    await Post.findByIdAndDelete(postId);

    await User.updateOne({ posts: postId }, { $pull: { posts: postId } });

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get post by ID
exports.getPostById = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId)
      .populate("author", "name")
      .populate("comments.author", "name");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Like a Post
exports.likePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.userId; 
  const { username } = req.body;

  try {
    const post = await Post.findById(postId).populate('author');

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: "Post already liked by the user" });
    }
    console.log("post", post)
    post.likes.push(userId);
    await post.save();

    const notification = new Notification({
      user: post.author._id,
      type: 'like',
      content: `${username} liked your post`,
      postData: {
        imageURL: post.imageURL,
        _id: post._id
      },
      read: false
    });
    console.log("notification>>",notification)
    await notification.save();

    res.json({ message: "Post liked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Unlike a Post
exports.unlikePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.userId; 

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!post.likes.includes(userId)) {
      return res.status(400).json({ message: "Post not liked by the user" });
    }

    // Remove the user's ID from the likes array
    post.likes = post.likes.filter((like) => like.toString() !== userId);
    await post.save();

    res.json({ message: "Post unliked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Add a Comment
exports.addComment = async (req, res) => {
  const postId = req.params.id;
  const { text, username } = req.body;
  const userId = req.user.userId; 

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Add the comment to the comments array
    post.comments.push({ text, author: userId });
    await post.save();

    // Create a notification for the post author
    const notification = new Notification({
      user: post.author,
      type: 'comment',
      content: `${username} commented on your post`,
      postId: postId,
      authorId: userId,
      read: false
    });
    await notification.save();

    res.json({ message: "Comment added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get posts from users the current user follows
exports.getPostsFromFollowing = async (req, res) => {
  const userId = req.user.userId; 

  try {
    const user = await User.findById(userId);
    const followingIds = user.following; // Assuming following is an array of user IDs

    const postsFromFollowing = await Post.find({ author: { $in: followingIds } })
      .populate({
        path: 'author',
        select: 'name username profileImg', 
      })
      .populate('comments.author', 'name');

    res.json(postsFromFollowing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
