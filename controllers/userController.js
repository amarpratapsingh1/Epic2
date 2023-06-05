const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');
const Task=require("../models/task")
const express = require('express');

const login = async (req, res) => {
  const { email, otp } = req.body;

  // Validate the email and OTP here
  if (!email || !otp) {
    return res.status(400).json({ success: false, reason: 'Email and OTP are required' });
  }
  // Additional validation logic...

  try {
    const sessionID = uuidv4();

    const user = await User.create({
      email,
      otp,
      sessionID,
    });

    return res.json({ success: true, userID: user.id, sessionID });
  } catch (error) {
    console.error('Failed to create user:', error);
    return res.status(500).json({ success: false, reason: 'Internal Server Error' });
  }
};

const getById= async (req, res) => {
  try {
    const id = req.params.id;
    const findTask = await Task.findOne({
      where: {
        id: id
      }
    });

    if (!findTask) {
      res.status(400).send({
        success: false,
        message: "Task not found",
        result: []
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Task found",
        result: findTask
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Failed to get task",
      result: error.message
    });
  }
}

const createTask= async (req, res) => {
  try {
    const session_id = uuidv4();
    const created_at = Date.now();
    const updated_at = Date.now();
    const { task,completed } = req.body;

    const createTask = Task.create({
      task,
      completed,
      created_at,
      updated_at,
      session_id
    });
    res.status(200).send({
      success: true,
      message: "Task created successfully",
      result: createTask
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Failed to create task",
      result: error.message
    });
  }
}


const getAll = async (req, res) => {
  try {
    const allTasks = await Task.findAll();

    if (!allTasks || allTasks.length === 0) {
      res.status(404).send({
        success: false,
        message: "No tasks found",
        result: []
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Tasks found",
        result: allTasks
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to get tasks",
      result: error.message
    });
  }
};


const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const numDeletedRows = await Task.destroy({
      where: {
        id: id
      }
    });

    if (numDeletedRows === 0) {
      res.status(404).send({
        success: false,
        message: "Task not found or not deleted",
        result: []
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Task deleted successfully",
        result: numDeletedRows
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Failed to delete task",
      result: error.message
    });
  }
};

const updateTask= async (req, res) => {
  try {
    const id = req.params.id;
    const { task, completed } = req.body;

    const updateTask = await Task.update(
      {
        task,
        completed
      },
      { where: { id: id } }
    );

    if (updateTask[0] === 0) {
      res.status(400).send({
        success: false,
        message: "Task not found or not updated",
        result: []
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Task updated successfully",
        result: updateTask
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Failed to update task",
      result: error.message
    });
  }
}
module.exports = {
  login,
  getById,
  createTask,
  getAll,
  deleteTask,
  updateTask,
};

// console.log('Logging the output of the login function:');
// login(
//   { body: { email: 'example@example.com', otp: '123456' } },
//   { json: console.log }
// );

// getById(
// );
