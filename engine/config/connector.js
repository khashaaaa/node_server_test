const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: "localhost",
		dialect: "postgres",
		logging: false,
	}
);

const PostgresConnect = async () => {
	try {
		await sequelize.authenticate();
		console.log("PostgreSQL is connected...");
	} catch (err) {
		console.error("PostgreSQL connection error: ", err);
	}
};

module.exports = {
	sequelize,
	PostgresConnect,
};
