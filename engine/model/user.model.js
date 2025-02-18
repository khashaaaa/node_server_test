const { DataTypes } = require("sequelize")
const { sequelize } = require("../config/connector")

const User = sequelize.define(
	"users",
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING
		}
	},
	{
		tableName: "users",
	}
)

module.exports = { User }