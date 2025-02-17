const { sequelize } = require("../config/connector")

const User = sequelize.define(
	"user",
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
			type: DataTypes.STRING,
			unique: true,
		}
	},
	{
		tableName: "user",
	}
)

module.exports = { User }