import { Router } from "express";
import { LotSeminte } from "../database/entities/lotSeminte.model.js";
import { Depozit } from "../database/entities/depozit.model.js";

const router = Router();

const loturi = [];

router.get("/get-all", async (req, res) => {
  loturi.length = 0;
  const rows = await LotSeminte.findAll({
    include: [Depozit],
  });
  rows.forEach((row) => {
    loturi.push({
      id: row.dataValues.id,
      numeSoi: row.dataValues.numeSoi,
      cantitateKg: row.dataValues.cantitateKg,
      bio: Boolean(row.dataValues.bio),
      DepozitId: row.dataValues.DepozitId,
      depozitNume: row.Depozit ? row.Depozit.dataValues.nume : "",
    });
  });
  res.send(loturi);
});

router.post("/add", async (req, res) => {
  const numeSoi = req.body.numeSoi;
  const cantitateKg = req.body.cantitateKg;
  const DepozitId = req.body.DepozitId;
  const row = await LotSeminte.create({
    numeSoi,
    cantitateKg,
    DepozitId,
    bio: false,
  });
  const dep = await Depozit.findByPk(DepozitId);
  const flat = {
    id: row.dataValues.id,
    numeSoi: row.dataValues.numeSoi,
    cantitateKg: row.dataValues.cantitateKg,
    bio: Boolean(row.dataValues.bio),
    DepozitId: row.dataValues.DepozitId,
    depozitNume: dep ? dep.dataValues.nume : "",
  };
  loturi.push(flat);
  res.send(flat);
});

router.delete("/delete", async (req, res) => {
  const id = req.body.id;
  await LotSeminte.destroy({ where: { id } });
  loturi.splice(
    loturi.findIndex((l) => l.id === id),
    1
  );
  res.send({ success: true });
});

router.put("/update-numeSoi", async (req, res) => {
  const id = req.body.id;
  const newNumeSoi = req.body.newNumeSoi;
  await LotSeminte.update({ numeSoi: newNumeSoi }, { where: { id } });
  const index = loturi.findIndex((l) => l.id === id);
  loturi[index].numeSoi = newNumeSoi;
  res.send({ success: true });
});

router.put("/update-cantitateKg", async (req, res) => {
  const id = req.body.id;
  const newCantitateKg = req.body.newCantitateKg;
  await LotSeminte.update({ cantitateKg: newCantitateKg }, { where: { id } });
  const index = loturi.findIndex((l) => l.id === id);
  loturi[index].cantitateKg = newCantitateKg;
  res.send({ success: true });
});

router.put("/update-bio", async (req, res) => {
  const id = req.body.id;
  const index = loturi.findIndex((l) => l.id === id);
  await LotSeminte.update({ bio: !loturi[index].bio }, { where: { id } });
  loturi[index].bio = !loturi[index].bio;
  res.send({ success: true });
});

export default router;
