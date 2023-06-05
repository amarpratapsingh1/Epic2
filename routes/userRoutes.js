const express = require('express');
const routes = express.Router();
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/login', userController.login);
router.get('/task/:id',userController.getById);
router.post("/task", userController.createTask);
router.post("/task/:id", userController.updateTask);
router.delete("/task/:id", userController.deleteTask);
router.get("/tasks", userController.getAll);

module.exports = router;
