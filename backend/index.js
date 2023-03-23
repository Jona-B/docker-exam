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
  try {
    const todos = await db.select("*").from("todos");
    res.send(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.sendStatus(500);
  }
});

app.post("/todos", async (req, res) => {
  const { name, description } = req.body;
  try {
    const [id] = await db("todos").insert({ name, description });
    res.send({ id, name, description });
  } catch (error) {
    console.error("Error inserting todo:", error);
    res.sendStatus(500);
  }
});

app.delete("/todos/:todoId", async (req, res) => {
  const { todoId } = req.params;
  try {
    await db("todos").where("id", todoId).del();
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
