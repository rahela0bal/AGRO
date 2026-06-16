import { Router } from "express";
import { Todo } from "../database/entities/todo.model.js";
import { sequelize } from "../database/db.js";

const router = Router();

router.get("/get-all", async (req, res) => {
  const todos = await Todo.findAll();
  res.send(todos);
});

router.get("/get-by-date/:date", async (req, res) => {
  const date = req.params.date;
  const todos = await Todo.findAll({ where: { date } });
  res.send(todos);
});

router.post("/add", async (req, res) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const todo = await Todo.create(
        {
          title: req.body.title,
          date: req.body.date,
          done: false,
        },
        { transaction: t }
      );
      return todo;
    });
    res.send(result);
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

router.post("/add-many", async (req, res) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const todos = await Promise.all(
        req.body.todos.map((todo) =>
          Todo.create({ title: todo.title, date: todo.date, done: false }, { transaction: t })
        )
      );
      return todos;
    });
    res.send(result);
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

router.put("/update-done", async (req, res) => {
  const id = req.body.id;
  const todo = await Todo.findOne({ where: { id } });
  await Todo.update({ done: !todo.done }, { where: { id } });
  res.send({ success: true });
});

router.put("/update-title", async (req, res) => {
  const id = req.body.id;
  const newTitle = req.body.newTitle;
  await Todo.update({ title: newTitle }, { where: { id } });
  res.send({ success: true });
});

router.put("/update-date", async (req, res) => {
  const id = req.body.id;
  const date = req.body.date;
  await Todo.update({ date }, { where: { id } });
  res.send({ success: true });
});

router.delete("/delete", async (req, res) => {
  const id = req.body.id;
  await Todo.destroy({ where: { id } });
  res.send({ success: true });
});

router.delete("/delete-all-done", async (req, res) => {
  await Todo.destroy({ where: { done: true } });
  res.send({ success: true });
});

export default router;
