const Joi = require("joi");

const taskSchema = Joi.object({
  description: Joi.string().min(5).max(255).required(),
  responsable: Joi.string().min(3).max(50).required(),
  status: Joi.string().valid("todo", "doing", "done").required(),
});

module.exports = taskSchema;
