const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Notification = require("../models/Notification.model");

// Register user
exports.registerUser = async (req, res) => {
  const { email, password, name, username } = req.body;

  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // creating a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      username,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, "seyagubzade123");

    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete user
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude password 
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get user by id
exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).select("-password"); // Exclude password 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get profile info of authenticated user
exports.getProfileInfo = async (req, res) => {
  try {
    const userId = req.user.id; // user by ID from the authenticated user's token
    const user = await User.findById(userId);
    console.log(user, userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  const userId = req.user.userId; // Extract userId from the token
  const { name, username, profileImg } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.username = username;
    user.profileImg = profileImg;

    await user.save();

    res.json({ message: "User profile updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Follow a user
exports.followUser = async (req, res) => {
  const { userIdToFollow } = req.body;
  const userId = req.user.userId;

  try {
    // Check if the user is already following the target user
    const user = await User.findById(userId);
    if (user.following.includes(userIdToFollow)) {
      return res
        .status(400)
        .json({ message: "You are already following this user" });
    }

    user.following.push(userIdToFollow);
    await user.save();

    const userToFollow = await User.findById(userIdToFollow);
    userToFollow.followers.push(userId);
    await userToFollow.save();

    // Create notification for the user being followed
    const userWhoFollowed = await User.findById(userId);
    const notification = new Notification({
      user: {
        id: userIdToFollow,
        username: userToFollow.username,
        profileImg: userToFollow.profileImg
      },
      byWhom: {
        id: userId,
        username: userWhoFollowed.username,
        profileImg: userWhoFollowed.profileImg
      },
      type: 'follow',
      content: 'started following you',
      post: {
        id: null, 
        imageURL: null 
      },
      read: false
    });
    await notification.save();

    res.json({ message: "User followed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Unfollow a user
exports.unfollowUser = async (req, res) => {
  const { userIdToUnfollow } = req.body;
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId);
    const followingIndex = user.following.indexOf(userIdToUnfollow);
    if (followingIndex === -1) {
      return res
        .status(400)
        .json({ message: "You are not following this user" });
    }

    // Remove the target user from the following list
    user.following.splice(followingIndex, 1);
    await user.save();

    const userToUnfollow = await User.findById(userIdToUnfollow);
    const followerIndex = userToUnfollow.followers.indexOf(userId);
    userToUnfollow.followers.splice(followerIndex, 1);
    await userToUnfollow.save();

    res.json({ message: "User unfollowed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Search users by username
exports.searchUserByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    // Search users by username (case-insensitive)
    const users = await User.find({
      username: { $regex: username, $options: "i" },
    }).select("-password");

    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found with that username" });
    }

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
