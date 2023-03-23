const express = require("express");
const config = require("./db.config");

const db = require("knex")({
  client: "mysql2",
  connection: {
    host: config.HOST,
    port: config.PORT,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE,
  },
});

const cors = require("cors");
const app = express();

const port = process.env.PORT || 4001;
app.use(express.json());
app.use(cors());

app.get("/todos", async (req, res) => {
  const todos = await db.select("*").from("todos");
  res.send(todos);
});

app.post("/todos", async (req, res) => {
  const { title } = req.body;
  const [insertedTodo] = await db("todos").insert({ title }).returning("*");
  res.send(insertedTodo);
});

app.delete("/todos/:todoId", async (req, res) => {
  const { todoId } = req.params;
  await db("todos").where("id", todoId).delete();
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
