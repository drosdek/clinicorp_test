const taskRepository = require("../../infrastructure/repositories/taskRepository");

class TaskService {
  async insertTasks(tasks) {
    if (!Array.isArray(tasks)) {
      throw new Error("Invalid input: tasks must be an array");
    }

    await taskRepository.insertTasks(tasks);
  }

  async getTasks(filters = {}) {
    const { status, description, responsable, computer } = filters;
    const query = {};
    if (status) {
      query.status = status;
    }
    if (description) {
      query.description = description;
    }
    if (responsable) {
      query.responsable = responsable;
    }
    if (computer) {
      query.computer = computer;
    }

    const tasks = await taskRepository.getTasks(query);
    return tasks;
  }

  async updateTask(id, updates) {
    if (!id) {
      throw new Error("Task ID is required");
    }

    return await taskRepository.updateTask(id, updates);
  }
}

module.exports = new TaskService();
