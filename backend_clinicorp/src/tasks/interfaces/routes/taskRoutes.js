const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - description
 *         - responsable
 *         - status
 *       properties:
 *         description:
 *           type: string
 *           description: Descrição da tarefa
 *         responsable:
 *           type: string
 *           description: Nome do responsável pela tarefa
 *         status:
 *           type: string
 *           description: Status da tarefa (todo, doing, done)
 */

/**
 * @swagger
 * /api/insert-tasks:
 *   post:
 *     summary: Insere novas tarefas
 *     description: Permite a inserção de uma lista de tarefas no sistema.
 *     tags:
 *       - Tarefas
 *     requestBody:
 *       description: Array de tarefas que serão inseridas no sistema.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 description:
 *                   type: string
 *                   description: Descrição da tarefa
 *                   example: Criar tela de login
 *                 responsable:
 *                   type: string
 *                   description: Nome do responsável pela tarefa
 *                   example: Bruno
 *                 status:
 *                   type: string
 *                   description: Status da tarefa (todo, doing, done)
 *                   example: todo
 *     responses:
 *       201:
 *         description: Tarefas inseridas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tasks inserted successfully"
 *       400:
 *         description: Input inválido (caso o array de tarefas esteja incorreto)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input: tasks must be an array"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */

router.post("/insert-tasks", taskController.insertTasks);

/**
 * @swagger
 * /api/get-tasks:
 *   get:
 *     summary: Retorna todas as tarefas ou tarefas filtradas
 *     description: Busca todas as tarefas cadastradas no sistema, com possibilidade de filtragem por status, description, responsable, e computer.
 *     tags:
 *       - Tarefas
 *     parameters:
 *       - name: status
 *         in: query
 *         description: Filtra as tarefas pelo status (todo, doing, done)
 *         schema:
 *           type: string
 *       - name: description
 *         in: query
 *         description: Filtra as tarefas pela descrição
 *         schema:
 *           type: string
 *       - name: responsable
 *         in: query
 *         description: Filtra as tarefas pelo responsável
 *         schema:
 *           type: string
 *       - name: computer
 *         in: query
 *         description: Filtra as tarefas pelo nome do computador
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retorna uma lista de tarefas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID da tarefa
 *                     example: 1
 *                   description:
 *                     type: string
 *                     description: Descrição da tarefa
 *                     example: Criar tela de login
 *                   responsable:
 *                     type: string
 *                     description: Nome do responsável pela tarefa
 *                     example: Bruno
 *                   status:
 *                     type: string
 *                     description: Status da tarefa
 *                     example: todo
 *                   computer:
 *                     type: string
 *                     description: Nome do computador que fez o insert
 *                     example: macbook-pro
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.get("/get-tasks", taskController.getTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Atualiza uma tarefa existente
 *     description: Atualiza uma tarefa com os dados fornecidos (status, descrição ou responsável).
 *     tags:
 *       - Tarefas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa que será atualizada
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Dados que serão atualizados
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Descrição da tarefa
 *               responsable:
 *                 type: string
 *                 description: Nome do responsável pela tarefa
 *               status:
 *                 type: string
 *                 description: Status da tarefa (todo, doing, done)
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task updated successfully"
 *                 updatedTask:
 *                   $ref: '#/components/schemas/Task'
 *       400:
 *         description: Input inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input: missing fields to update"
 *       404:
 *         description: Tarefa não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task not found"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.put("/tasks/:id", taskController.updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Remove uma tarefa existente
 *     description: Remove uma tarefa pelo ID.
 *     tags:
 *       - Tarefas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa a ser removida
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarefa removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task deleted successfully"
 *       404:
 *         description: Tarefa não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task not found"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.delete("/tasks/:id", taskController.deleteTask);

module.exports = router;
