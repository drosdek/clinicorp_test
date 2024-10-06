const { db } = require("../../../../config/firebase");
const os = require("os");
const Task = require("../../domain/entities/task");

class TaskRepository {
  async insertTasks(tasks) {
    const batch = db.batch();
    const computerName = os.hostname();

    tasks.forEach((taskData) => {
      const task = new Task({ ...taskData, computer: computerName });
      const docRef = db.collection("tasks").doc();
      batch.set(docRef, {
        description: task.description,
        responsable: task.responsable,
        status: task.status,
        computer: task.computer,
      });
    });

    await batch.commit();
  }

  async getTasks(query) {
    let taskCollection = db.collection("tasks");

    if (query.status) {
      taskCollection = taskCollection.where("status", "==", query.status);
    }

    if (query.description) {
      taskCollection = taskCollection.where(
        "description",
        "==",
        query.description
      );
    }

    if (query.responsable) {
      taskCollection = taskCollection.where(
        "responsable",
        "==",
        query.responsable
      );
    }

    if (query.computer) {
      taskCollection = taskCollection.where("computer", "==", query.computer);
    }

    const snapshot = await taskCollection.get();
    const tasks = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      const task = new Task({ id: doc.id, ...data });
      tasks.push(task);
    });

    return tasks;
  }

  async updateTask(id, updates) {
    const taskRef = db.collection("tasks").doc(id);
    const doc = await taskRef.get();

    if (!doc.exists) {
      return null;
    }

    await taskRef.update(updates);

    const updatedDoc = await taskRef.get();
    return updatedDoc.data();
  }

  async deleteTask(id) {
    const taskRef = db.collection("tasks").doc(id);
    const doc = await taskRef.get();

    if (!doc.exists) {
      return null;
    }

    await taskRef.delete();
    return true;
  }
}

module.exports = new TaskRepository();
