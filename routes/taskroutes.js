const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.post("/task", taskController.create);
router.get("/task/:id", taskController.getById);
router.post("/task/:id", taskController.update);
router.delete("/task/:id", taskController.delete);
router.get("/tasks", taskController.getAll);

module.exports = router;
