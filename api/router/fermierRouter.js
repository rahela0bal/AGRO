import { Router } from "express";
import { Fermier } from "../database/entities/fermier.model.js";
import { Animal } from "../database/entities/animal.model.js";
import { sequelize } from "../database/db.js";

const router = Router();

Fermier.hasMany(Animal);
Animal.belongsTo(Fermier);

router.get("/get-all", async (req, res) => {
  const fermieri = await Fermier.findAll({
    include: [Animal]
  });
  res.send(fermieri);
});

router.post("/add", async (req, res) => {
  const { nume, email } = req.body;
  const fermier = await Fermier.create({ nume, email });
  res.send(fermier);
});

router.post("/add-animal", async (req, res) => {
  const { fermierId, nume, specie, varsta } = req.body;
  const animal = await Animal.create({ nume, specie, varsta, FermierId: fermierId });
  res.send(animal);
});

router.post("/add-cu-animal", async (req, res) => {
  const { nume, email, animal } = req.body;
  try {
    const result = await sequelize.transaction(async (t) => {
      const fermier = await Fermier.create(
        { nume, email },
        { transaction: t }
      );
      const animalNou = await Animal.create(
        {
          nume: animal.nume,
          specie: animal.specie,
          varsta: animal.varsta,
          FermierId: fermier.id
        },
        { transaction: t }
      );
      return { fermier, animal: animalNou };
    });
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


router.delete("/delete", async (req, res) => {
  const id = req.body.id;
  await Fermier.destroy({ where: { id } });
  res.send({ success: true });
});

router.put("/update-nume", async (req, res) => {
  const { id, newNume } = req.body;
  await Fermier.update({ nume: newNume }, { where: { id } });
  res.send({ success: true });
});

router.put("/update-email", async (req, res) => {
  const { id, newEmail } = req.body;
  await Fermier.update({ email: newEmail }, { where: { id } });
  res.send({ success: true });
});

export default router;
