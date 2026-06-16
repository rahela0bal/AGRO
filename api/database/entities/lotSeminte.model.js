import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const LotSeminte = sequelize.define(
  "LotSeminte",
  {
    numeSoi: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    cantitateKg: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    bio: {
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
