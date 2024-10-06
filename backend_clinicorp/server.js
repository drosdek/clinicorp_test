const app = require("./src/app");

const PORT = process.env.PORT || 8085;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
