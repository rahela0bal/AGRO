import express from "express";
import bodyParser from "body-parser";
import { WebSocketServer } from "ws";
import authRouter from "./router/authRouter.js";
import taskRouter from "./router/taskRouter.js";
import universityRouter from "./router/universityRouter.js";
import reminderRouter from "./router/reminderRouter.js";
import fermierRouter from "./router/fermierRouter.js";
import todoRouter from "./router/todoRouter.js";
import proprietateRouter from "./router/proprietateRouter.js";
import proprietateDetaliiRouter from "./router/proprietateDetaliiRouter.js";
import culturaRouter from "./router/culturaRouter.js";
import depozitRouter from "./router/depozitRouter.js";
import lotSeminteRouter from "./router/lotSeminteRouter.js";
import authMiddleware from "./middleware/authMiddleware.js";

const api = express();
const port = 3000;

api.use(bodyParser.json());

api.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type,authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

api.use("/auth", authRouter);
api.use("/task", authMiddleware, taskRouter);
api.use("/university", authMiddleware, universityRouter);
api.use("/reminder", authMiddleware, reminderRouter);
api.use("/fermier", authMiddleware, fermierRouter);
api.use("/todo", authMiddleware, todoRouter);
api.use("/proprietate", authMiddleware, proprietateRouter);
api.use("/proprietate-detalii", authMiddleware, proprietateDetaliiRouter);
api.use("/cultura", authMiddleware, culturaRouter);
api.use("/depozit", authMiddleware, depozitRouter);
api.use("/lot-seminte", authMiddleware, lotSeminteRouter);

api.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const wss = new WebSocketServer({ port: 7878 });

const clients = [];

wss.on("connection", (ws) => {
  clients.push(ws);

  ws.on("message", (message) => {
    clients.forEach((client) => {
      client.send(message.toString());
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
