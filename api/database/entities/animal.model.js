import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Animal = sequelize.define(
  "Animal",
  {
    nume: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    specie: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    varsta: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    paranoid: true,
  },
);
