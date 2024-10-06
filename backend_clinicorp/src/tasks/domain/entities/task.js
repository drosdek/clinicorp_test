class Task {
  constructor({ id, description, responsable, status, computer }) {
    if (!description || !responsable || !status) {
      throw new Error("Description, responsable, and status are required.");
    }

    this.id = id;
    this.description = description;
    this.responsable = responsable;
    this.status = status;
    this.computer = computer;
  }
}

module.exports = Task;
