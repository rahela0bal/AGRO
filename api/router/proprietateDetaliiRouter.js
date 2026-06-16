import { Router } from "express";
import { ProprietateDetalii } from "../database/entities/proprietateDetalii.model.js";
import { Proprietate } from "../database/entities/proprietate.model.js";

const router = Router();

const detalii = [];

router.get("/get-all", async (req, res) => {
  detalii.length = 0;
  const rows = await ProprietateDetalii.findAll({
    include: [Proprietate],
  });
  rows.forEach((row) => {
    detalii.push({
      id: row.dataValues.id,
      suprafataHa: row.dataValues.suprafataHa,
      irigata: Boolean(row.dataValues.irigata),
      comentariu: row.dataValues.comentariu,
      ProprietateId: row.dataValues.ProprietateId,
      proprietateNume: row.Proprietate ? row.Proprietate.dataValues.nume : "",
    });
  });
  res.send(detalii);
});

router.post("/add", async (req, res) => {
  const row = await ProprietateDetalii.create({
    suprafataHa: req.body.suprafataHa,
    irigata: req.body.irigata ?? false,
    comentariu: req.body.comentariu ?? "",
    ProprietateId: req.body.ProprietateId,
  });
  const p = await Proprietate.findByPk(req.body.ProprietateId);
  const flat = {
    id: row.dataValues.id,
    suprafataHa: row.dataValues.suprafataHa,
    irigata: Boolean(row.dataValues.irigata),
    comentariu: row.dataValues.comentariu,
    ProprietateId: row.dataValues.ProprietateId,
    proprietateNume: p ? p.dataValues.nume : "",
  };
  detalii.push(flat);
  res.send(flat);
});

router.delete("/delete", async (req, res) => {
  const id = req.body.id;
  await ProprietateDetalii.destroy({ where: { id } });
  detalii.splice(
    detalii.findIndex((d) => d.id === id),
    1
  );
  res.send({ success: true });
});

router.put("/update-suprafataHa", async (req, res) => {
  const id = req.body.id;
  const newSuprafataHa = req.body.newSuprafataHa;
  await ProprietateDetalii.update({ suprafataHa: newSuprafataHa }, { where: { id } });
  const index = detalii.findIndex((d) => d.id === id);
  detalii[index].suprafataHa = newSuprafataHa;
  res.send({ success: true });
});

router.put("/update-irigata", async (req, res) => {
  const id = req.body.id;
  const index = detalii.findIndex((d) => d.id === id);
  await ProprietateDetalii.update({ irigata: !detalii[index].irigata }, { where: { id } });
  detalii[index].irigata = !detalii[index].irigata;
  res.send({ success: true });
});

router.put("/update-comentariu", async (req, res) => {
  const id = req.body.id;
  const newComentariu = req.body.newComentariu;
  await ProprietateDetalii.update({ comentariu: newComentariu }, { where: { id } });
  const index = detalii.findIndex((d) => d.id === id);
  detalii[index].comentariu = newComentariu;
  res.send({ success: true });
});

export default router;
