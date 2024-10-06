const request = require("supertest");
const app = require("../../app");
const taskRepository = require("../infrastructure/repositories/taskRepository");

jest.mock("../infrastructure/repositories/taskRepository");

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

describe("Task API", () => {
  it("should insert tasks successfully", async () => {
    taskRepository.insertTasks.mockResolvedValue();

    const response = await request(app)
      .post("/api/insert-tasks")
      .send([
        { description: "Test Task", responsable: "Test", status: "todo" },
      ]);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Tasks inserted successfully");
  });

  it("should return 400 if tasks array is invalid", async () => {
    const response = await request(app)
      .post("/api/insert-tasks")
      .send({ description: "Invalid task" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid input: tasks must be an array");
  });

  it("should get tasks successfully", async () => {
    taskRepository.getTasks.mockResolvedValue([
      {
        id: "1",
        description: "Test Task",
        responsable: "Test",
        status: "todo",
      },
    ]);

    const response = await request(app).get("/api/get-tasks");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
  });

  it("should handle internal server errors gracefully", async () => {
    taskRepository.getTasks.mockRejectedValue(new Error("Firestore is down"));

    const response = await request(app).get("/api/get-tasks");
    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Firestore is down");
  });

  it("should filter tasks by description and status", async () => {
    taskRepository.getTasks.mockResolvedValue([
      {
        id: "1",
        description: "Test Task",
        responsable: "Test",
        status: "todo",
        computer: "macbook-pro",
      },
    ]);

    const response = await request(app).get(
      "/get-tasks?description=Test Task&status=todo"
    );
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].description).toBe("Test Task");
    expect(response.body[0].status).toBe("todo");
  });
});
