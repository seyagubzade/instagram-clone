const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register user
exports.registerUser = async (req, res) => {
  const { email, password, name, username } = req.body;

  try {
    // Check if the email is already in use
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Check if the username is already in use
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      username,
    });
    await newUser.save();

    // Respond with success message
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
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, "seyagubzade123");

    // Respond with token and user details
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
    // Find the user by ID and delete it
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with success message
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find({}, '-password'); // Exclude password field from the response
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
    // Find the user by ID
    const user = await User.findById(userId).select('-password'); // Exclude password field from the response

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
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's profile information
    user.name = name;
    user.username = username;
    user.profileImg = profileImg;

    // Save the updated user profile
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

    // Update the following list for the current user
    user.following.push(userIdToFollow);
    await user.save();

    // Update the followers list for the target user
    const userToFollow = await User.findById(userIdToFollow);
    userToFollow.followers.push(userId);
    await userToFollow.save();

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
    // Check if the user is following the target user
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

    // Remove the current user from the followers list of the target user
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
    const users = await User.find({ username: { $regex: username, $options: 'i' } }).select('-password');

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found with that username' });
    }

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};