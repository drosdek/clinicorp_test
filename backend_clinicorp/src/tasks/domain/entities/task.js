class Task {
  constructor({ id, description, responsable, status, computer, createdAt }) {
    if (!description || !responsable || !status) {
      throw new Error("Description, responsable, and status are required.");
    }

    this.id = id;
    this.description = description;
    this.responsable = responsable;
    this.status = status;
    this.computer = computer;
    this.createdAt = createdAt || new Date().toISOString();
  }
}

module.exports = Task;
