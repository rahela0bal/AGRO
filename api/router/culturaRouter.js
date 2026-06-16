import { Router } from "express";
import { Cultura } from "../database/entities/cultura.model.js";
import { Proprietate } from "../database/entities/proprietate.model.js";

const router = Router();

const culturi = [];

router.get("/get-all", async (req, res) => {
  culturi.length = 0;
  const rows = await Cultura.findAll({
    include: [Proprietate],
  });
  rows.forEach((row) => {
    culturi.push({
      id: row.dataValues.id,
      nume: row.dataValues.nume,
      anPlantare: row.dataValues.anPlantare,
      recoltata: Boolean(row.dataValues.recoltata),
      ProprietateId: row.dataValues.ProprietateId,
      proprietateNume: row.Proprietate ? row.Proprietate.dataValues.nume : "",
    });
  });
  res.send(culturi);
});

router.post("/add", async (req, res) => {
  const nume = req.body.nume;
  const anPlantare = req.body.anPlantare;
  const ProprietateId = req.body.ProprietateId;
  const row = await Cultura.create({
    nume,
    anPlantare,
    ProprietateId,
    recoltata: false,
  });
  const p = await Proprietate.findByPk(ProprietateId);
  const flat = {
    id: row.dataValues.id,
    nume: row.dataValues.nume,
    anPlantare: row.dataValues.anPlantare,
    recoltata: Boolean(row.dataValues.recoltata),
    ProprietateId: row.dataValues.ProprietateId,
    proprietateNume: p ? p.dataValues.nume : "",
  };
  culturi.push(flat);
  res.send(flat);
});

router.delete("/delete", async (req, res) => {
  const id = req.body.id;
  await Cultura.destroy({ where: { id } });
  culturi.splice(
    culturi.findIndex((c) => c.id === id),
    1
  );
  res.send({ success: true });
});

router.put("/update-nume", async (req, res) => {
  const id = req.body.id;
  const newNume = req.body.newNume;
  await Cultura.update({ nume: newNume }, { where: { id } });
  const index = culturi.findIndex((c) => c.id === id);
  culturi[index].nume = newNume;
  res.send({ success: true });
});

router.put("/update-anPlantare", async (req, res) => {
  const id = req.body.id;
  const newAnPlantare = req.body.newAnPlantare;
  await Cultura.update({ anPlantare: newAnPlantare }, { where: { id } });
  const index = culturi.findIndex((c) => c.id === id);
  culturi[index].anPlantare = newAnPlantare;
  res.send({ success: true });
});

router.put("/update-recoltata", async (req, res) => {
  const id = req.body.id;
  const index = culturi.findIndex((c) => c.id === id);
  await Cultura.update({ recoltata: !culturi[index].recoltata }, { where: { id } });
  culturi[index].recoltata = !culturi[index].recoltata;
  res.send({ success: true });
});

export default router;
