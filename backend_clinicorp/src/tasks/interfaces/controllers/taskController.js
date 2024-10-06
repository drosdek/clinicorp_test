const taskService = require("../../application/services/taskService");
const taskSchema = require("../../validation/taskvalidation");

exports.insertTasks = async (req, res, next) => {
  try {
    const tasks = req.body;
    if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
      const error = new Error("Invalid input: tasks must be an array");
      error.statusCode = 400;
      throw error;
    }

    for (const task of tasks) {
      const { error } = taskSchema.validate(task);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
    }

    await taskService.insertTasks(tasks);
    res.status(201).json({ message: "Tasks inserted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    const { status, description, responsable, computer } = req.query;
    const tasks = await taskService.getTasks({
      status,
      description,
      responsable,
      computer,
    });

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, description, responsable } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Invalid input: missing task ID" });
    }

    const { error } = taskSchema.validate({
      status,
      description,
      responsable,
    });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedTask = await taskService.updateTask(id, {
      status,
      description,
      responsable,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Invalid input: missing task ID" });
    }

    const deletedTask = await taskService.deleteTask(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};
