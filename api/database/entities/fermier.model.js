import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Fermier = sequelize.define(
  "Fermier",
  {
    nume: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
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
