const Task = require("../models/task");

const taskController = {
  create: async (req, res) => {
    try {
      const { task, completed } = req.body;

      const createTask = await Task.create({
        task,
        completed
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
  },

  getById: async (req, res) => {
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
  },

  getAll: async (req, res) => {
    try {
      const allTasks = await Task.findAll();

      if (!allTasks || allTasks.length === 0) {
        res.status(400).send({
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
      res.status(400).send({
        success: false,
        message: "Failed to get tasks",
        result: error.message
      });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const deleteTask = await Task.destroy({
        where: {
          id: id
        }
      });

      if (!deleteTask) {
        res.status(400).send({
          success: false,
          message: "Failed to delete task",
          result: []
        });
      } else {
        res.status(200).send({
          success: true,
          message: "Task deleted successfully",
          result: deleteTask
        });
      }
    } catch (error) {
      res.status(400).send({
        success: false,
        message: "Failed to delete task",
        result: error.message
      });
    }
  },

  update: async (req, res) => {
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
};

module.exports = taskController;
