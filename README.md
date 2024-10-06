# Clinicorp - Gerenciamento de Tarefas

Este repositório contém uma aplicação completa para gerenciamento de tarefas, com frontend desenvolvido em React e backend em Node.js com Express. A aplicação permite criar, listar, mover (usando drag and drop) e atualizar o status das tarefas.

## Funcionalidades

- **Dashboard de Tarefas**: Exibe as tarefas separadas por colunas: `todo`, `doing`, e `done`.
- **Drag and Drop**: Permite mover as tarefas entre as colunas.
- **Criação de Tarefas**: Adicione novas tarefas usando o modal de criação.
- **Persistência de Dados**: Backend desenvolvido com Node.js e integração com Firebase.

## Tecnologias Utilizadas

- **Frontend**: React.js, Material-UI
- **Backend**: Node.js, Express.js, Firebase
- **Docker**: Contêineres Docker para o frontend e backend

## Pré-requisitos

- **Docker**: Certifique-se de ter o Docker e Docker Compose instalados e configurados corretamente. Consulte a [documentação oficial](https://docs.docker.com/get-docker/) para instruções.
- **Docker Compose**: O Docker Compose deve estar instalado para facilitar o gerenciamento dos serviços de frontend e backend.

## Configuração do Projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/drosdek/clinicorp_test.git
   cd clinicorp
   ```

## Rodando a Aplicação com Docker

1. Construa e inicie os contêineres usando o Docker Compose:

   ```bash
   docker-compose up --build
   ```

2. Acesse a aplicação:

   - Frontend: Abra o navegador e acesse <code>http://localhost:3000</code>
   - Backend: O backend estará disponível em <code>http://localhost:8085/api</code>

## Estrutura do Projeto

- frontend/: Diretório contendo o código do frontend.
- backend/: Diretório contendo o código do backend.
- docker-compose.yml: Arquivo de configuração do Docker Compose para rodar os serviços do frontend e backend.

## Endpoints da API

Listar Tarefas

<code>GET /api/get-tasks</code>

Retorna uma lista de todas as tarefas.

Criar Tarefa

<code>POST /api/insert-tasks</code>

Body:

```json
{
  "description": "Descrição da tarefa",
  "responsable": "Nome do responsável",
  "status": "todo"
}
```

## Atualizar Status da Tarefa

<code>PUT /api/tasks/:id</code>

Body:

```json
{
  "status": "doing"
}
```

## Testando Localmente

Se você deseja testar os projetos individualmente, sem o Docker, siga as instruções abaixo:

**Backend**

1. Navegue até o diretório do backend:

```bash
cd backend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor:

```bash
npm run dev
```

O backend estará rodando em <code>http://localhost:8085.</code>

**Frontend**

Navegue até o diretório do frontend:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O frontend estará disponível em <code>http://localhost:3000.</code>

## Autor

Desenvolvido por Josnei Drosdek.
