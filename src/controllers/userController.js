const express = require("express");
const moongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = require("../models/User");

exports.createUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  try {
    const existingEmail = await userSchema.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userSchema.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json({ message: "User created successfully" });

    if (!newUser) {
      return res.status(500).json({ message: "Failed to create user" });
    }
  } catch (error) {
    next(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the user" });
    console.error("Error creating user:", error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userSchema.find().sort({ name: 1 });
    res.status(200).json({ message: "Users fetched successfully", users });
  } catch (error) {
    next(error);
    res.status(500).json({
      message: "An error occurred while fetching all users",
      data: error,
    });
    console.error("Error fetching all users:", error);
  }
};

exports.getUserById = async (req, res, next) => {
  const id = req.params;
  try {
    const user = await userSchema.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    next(error);
    res.status(500).json({
      message: "An error occurred while fetching the user by ID",
      data: error,
    });
    console.error("Error fetching user by ID:", error);
  }
};

exports.updateUserById = async (req, res, next) => {
  const id = req.params;
  const { name, email, password, role } = req.body;
  try {
    const updatedUser = await userSchema.findByIdAndUpdate(
      id,
      { name, email, password: hashedPassword, role },
     // { new: true },
    );
    res.status(200).json({ message: "User updated successfully", updatedUser });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
    res.status(500).json({
      message: "An error occurred while updating the user",
      data: error,
    });
    console.error("Error updating user:", error);
  }
};

exports.deleteUserById = async (req, res, next) => {
  const id = req.params;
  try {
    const user = await userSchema.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
    res.status(500).json({
      message: "An error occurred while deleting the user",
      data: error,
    });
    console.error("Error deleting user:", error);
  }
};
