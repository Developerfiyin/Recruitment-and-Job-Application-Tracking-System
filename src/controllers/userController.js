const express = require('express'); 
const moongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = require('../models/User');

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const existingEmail = await userSchema.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 40);

    const newUser = await userSchema.create({ name, email, password: hashedPassword, role });
    if (!newUser) {
      return res.status(500).json({ message: 'Failed to create user' });
    }

    res.status(201).json({ message: 'User created successfully'});



  } catch (error) {
    next(error)
    res.status(500).json({ message: 'An error occurred while creating the user' });
  }
};

// exports.getAllUsers = async (req, res, next) => {
//   try {
//     const users = await userSchema.find();
//     res.json(users);
//   } catch (error) {
//     next(error);
//   }
// };