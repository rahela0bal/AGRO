import { Router } from "express";
import { Reminder } from "../database/entities/reminder.model.js";
import { Categorie } from "../database/entities/categorie.model.js";

const router = Router();

Reminder.hasOne(Categorie);
Categorie.belongsTo(Reminder);

router.get("/get-all", async (req, res) => {
  const reminders = await Reminder.findAll({
    include: [Categorie]
  });
  res.send(reminders);
});

router.post("/add", async (req, res) => {
  const { title, date, priority } = req.body;
  const reminder = await Reminder.create({ title, date, priority });
  res.send(reminder);
});

router.post("/add-categorie", async (req, res) => {
  const { reminderId, nume, culoare } = req.body;
  const categorie = await Categorie.create({ nume, culoare, ReminderId: reminderId });
  res.send(categorie);
});

router.delete("/delete", async (req, res) => {
  const id = req.body.id;
  await Reminder.destroy({ where: { id } });
  res.send({ success: true });
});

router.put("/update-done", async (req, res) => {
  const id = req.body.id;
  const reminder = await Reminder.findOne({ where: { id } });
  await Reminder.update({ done: !reminder.done }, { where: { id } });
  res.send({ success: true });
});

router.get("/get-categorii", async (req, res) => {
  const categorii = await Categorie.findAll({
    include: [Reminder],
  });
  res.send(categorii);
});

export default router;
