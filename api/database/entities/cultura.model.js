import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Cultura = sequelize.define(
  "Cultura",
  {
    nume: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    anPlantare: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    recoltata: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    paranoid: true,
  }
);
