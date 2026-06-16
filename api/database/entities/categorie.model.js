import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Categorie = sequelize.define(
  "Categorie",
  {
    nume: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    culoare: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    paranoid: true,
  },
);
