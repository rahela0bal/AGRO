import { Router } from "express";
import { Depozit } from "../database/entities/depozit.model.js";
import { LotSeminte } from "../database/entities/lotSeminte.model.js";
import { sequelize } from "../database/db.js";

const router = Router();

const depozite = [];

router.get("/get-all", async (req, res) => {
  depozite.length = 0;
  const rows = await Depozit.findAll();
  rows.forEach((row) => {
    depozite.push({
      id: row.dataValues.id,
      nume: row.dataValues.nume,
      locatie: row.dataValues.locatie,
      inchis: Boolean(row.dataValues.inchis),
    });
  });
  res.send(depozite);
});

router.post("/add", async (req, res) => {
  const nume = req.body.nume;
  const locatie = req.body.locatie;
  const row = await Depozit.create({ nume, locatie, inchis: false });
  const flat = {
    id: row.dataValues.id,
    nume: row.dataValues.nume,
    locatie: row.dataValues.locatie,
    inchis: Boolean(row.dataValues.inchis),
  };
  depozite.push(flat);
  res.send(flat);
});

router.post("/add-cu-lot", async (req, res) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const dep = await Depozit.create(
        {
          nume: req.body.nume,
          locatie: req.body.locatie,
          inchis: false,
        },
        { transaction: t }
      );
      await LotSeminte.create(
        {
          numeSoi: req.body.numeSoi,
          cantitateKg: req.body.cantitateKg,
          bio: Boolean(req.body.bio),
          DepozitId: dep.id,
        },
        { transaction: t }
      );
      return dep;
    });
    const flat = {
      id: result.dataValues.id,
      nume: result.dataValues.nume,
      locatie: result.dataValues.locatie,
      inchis: Boolean(result.dataValues.inchis),
    };
    depozite.push(flat);
    res.send(flat);
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

router.delete("/delete", async (req, res) => {
  const id = req.body.id;
  await Depozit.destroy({ where: { id } });
  depozite.splice(
    depozite.findIndex((d) => d.id === id),
    1
  );
  res.send({ success: true });
});

router.put("/update-nume", async (req, res) => {
  const id = req.body.id;
  const newNume = req.body.newNume;
  await Depozit.update({ nume: newNume }, { where: { id } });
  const index = depozite.findIndex((d) => d.id === id);
  depozite[index].nume = newNume;
  res.send({ success: true });
});

router.put("/update-locatie", async (req, res) => {
  const id = req.body.id;
  const newLocatie = req.body.newLocatie;
  await Depozit.update({ locatie: newLocatie }, { where: { id } });
  const index = depozite.findIndex((d) => d.id === id);
  depozite[index].locatie = newLocatie;
  res.send({ success: true });
});

router.put("/update-inchis", async (req, res) => {
  const id = req.body.id;
  const index = depozite.findIndex((d) => d.id === id);
  await Depozit.update({ inchis: !depozite[index].inchis }, { where: { id } });
  depozite[index].inchis = !depozite[index].inchis;
  res.send({ success: true });
});

export default router;
