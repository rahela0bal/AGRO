import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const ProprietateDetalii = sequelize.define(
  "ProprietateDetalii",
  {
    suprafataHa: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    irigata: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    comentariu: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    paranoid: true,
  }
);
