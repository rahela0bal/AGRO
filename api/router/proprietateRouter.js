import { Router } from "express";
import { Proprietate } from "../database/entities/proprietate.model.js";
import { ProprietateDetalii } from "../database/entities/proprietateDetalii.model.js";
import { sequelize } from "../database/db.js";

const router = Router();

const proprietati = [];

router.get("/get-all", async (req, res) => {
  proprietati.length = 0;
  const rows = await Proprietate.findAll();
  rows.forEach((row) => {
    proprietati.push({
      id: row.dataValues.id,
      nume: row.dataValues.nume,
      localitate: row.dataValues.localitate,
      activ: Boolean(row.dataValues.activ),
    });
  });
  res.send(proprietati);
});

router.post("/add", async (req, res) => {
  const nume = req.body.nume;
  const localitate = req.body.localitate;
  const row = await Proprietate.create({ nume, localitate, activ: true });
  const flat = {
    id: row.dataValues.id,
    nume: row.dataValues.nume,
    localitate: row.dataValues.localitate,
    activ: Boolean(row.dataValues.activ),
  };
  proprietati.push(flat);
  res.send(flat);
});

router.post("/add-cu-detalii", async (req, res) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const p = await Proprietate.create(
        {
          nume: req.body.nume,
          localitate: req.body.localitate,
          activ: true,
        },
        { transaction: t }
      );
      await ProprietateDetalii.create(
        {
          suprafataHa: req.body.suprafataHa,
          irigata: Boolean(req.body.irigata),
          comentariu: req.body.comentariu ?? "",
          ProprietateId: p.id,
        },
        { transaction: t }
      );
      return p;
    });
    const flat = {
      id: result.dataValues.id,
      nume: result.dataValues.nume,
      localitate: result.dataValues.localitate,
      activ: Boolean(result.dataValues.activ),
    };
    proprietati.push(flat);
    res.send(flat);
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

router.delete("/delete", async (req, res) => {
  const id = req.body.id;
  await Proprietate.destroy({ where: { id } });
  proprietati.splice(
    proprietati.findIndex((p) => p.id === id),
    1
  );
  res.send({ success: true });
});

router.put("/update-nume", async (req, res) => {
  const id = req.body.id;
  const newNume = req.body.newNume;
  await Proprietate.update({ nume: newNume }, { where: { id } });
  const index = proprietati.findIndex((p) => p.id === id);
  proprietati[index].nume = newNume;
  res.send({ success: true });
});

router.put("/update-localitate", async (req, res) => {
  const id = req.body.id;
  const newLocalitate = req.body.newLocalitate;
  await Proprietate.update({ localitate: newLocalitate }, { where: { id } });
  const index = proprietati.findIndex((p) => p.id === id);
  proprietati[index].localitate = newLocalitate;
  res.send({ success: true });
});

router.put("/update-activ", async (req, res) => {
  const id = req.body.id;
  const index = proprietati.findIndex((p) => p.id === id);
  await Proprietate.update({ activ: !proprietati[index].activ }, { where: { id } });
  proprietati[index].activ = !proprietati[index].activ;
  res.send({ success: true });
});

export default router;
