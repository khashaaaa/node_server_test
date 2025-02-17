const { User } = require("../model/user.model");

module.exports = {
	createUser: async (req, res) => {
		try {
			const { name, email } = req.body;

			await User.create({ name, email });

			return res.status(201).json({ response: "User created successfully" });
		} catch (error) {
			res.status(500).json({ response: error.message });
		}
	},

	showUsers: async (req, res) => {
		try {
			const users = await User.findAll({ attributes: ["name", "email"] });

			return res.status(200).json({ response: users });
		} catch (error) {
			res.status(500).json({ response: error.message });
		}
	},

	editUser: async (req, res) => {
		try {
			const { id, name, email } = req.body;

			await User.update({ name, email }, { where: { id } });

			return res.status(200).json({ response: "User updated successfully" });
		} catch (error) {
			res.status(500).json({ response: error.message });
		}
	},

	deleteUser: async (req, res) => {
		try {
			const { id } = req.params;

			await User.destroy({ where: { id } });

			return res.status(200).json({ response: "User deleted successfully" });
		} catch (error) {
			res.status(500).json({ response: error.message });
		}
	},
};
