const express = require('express'); 
const moongoose = require('mongoose');

const userSchema = require('../models/User');

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = await userSchema.create({ name, email, password, role });
    res.status(201).json(newUser);
    } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userSchema.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
};