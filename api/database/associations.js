import { Fermier } from "./entities/fermier.model.js";
import { Animal } from "./entities/animal.model.js";
import { Reminder } from "./entities/reminder.model.js";

// One-To-Many: Fermier are multe Animale
Fermier.hasMany(Animal);
Animal.belongsTo(Fermier);

export { Fermier, Animal, Reminder };
