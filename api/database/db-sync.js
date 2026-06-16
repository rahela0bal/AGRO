import { Reminder } from "./entities/reminder.model.js";
import { Fermier } from "./entities/fermier.model.js";
import { Animal } from "./entities/animal.model.js";
import { Categorie } from "./entities/categorie.model.js";
import { Proprietate } from "./entities/proprietate.model.js";
import { ProprietateDetalii } from "./entities/proprietateDetalii.model.js";
import { Cultura } from "./entities/cultura.model.js";
import { Depozit } from "./entities/depozit.model.js";
import { LotSeminte } from "./entities/lotSeminte.model.js";
import { Task } from "./entities/task.model.js";
import { Todo } from "./entities/todo.model.js";
import { User } from "./entities/user.model.js";
import { sequelize } from "./db.js";

// One-To-Many: Fermier are multe Animale
Fermier.hasMany(Animal);
Animal.belongsTo(Fermier);

// One-To-One: Reminder are o Categorie
Reminder.hasOne(Categorie);
Categorie.belongsTo(Reminder);

// One-To-One: Proprietate are un singur rand ProprietateDetalii
Proprietate.hasOne(ProprietateDetalii, { foreignKey: { unique: true } });
ProprietateDetalii.belongsTo(Proprietate, { foreignKey: { unique: true } });

// Many-To-One: multe Culturi pe o Proprietate
Proprietate.hasMany(Cultura);
Cultura.belongsTo(Proprietate);

// Many-To-One: multe LoturiSeminte intr-un Depozit
Depozit.hasMany(LotSeminte);
LotSeminte.belongsTo(Depozit);

sequelize.sync({ alter: true }).then(async () => {
  console.log("FINISHED SUCCESS");

  const bcrypt = await import('bcryptjs');
  const hash = await bcrypt.hash('admin', 10);
  await User.findOrCreate({ where: { username: 'admin' }, defaults: { password: hash } });
  console.log("Admin user ensured.");

  process.exit(0);
});
