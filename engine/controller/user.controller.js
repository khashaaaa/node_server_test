const { User } = require("../model/user.model");

module.exports = {
	createUser: async (req, res) => {
		try {
			const { name, email } = req.body;

			if (!name || !email) {
				return res.status(400).json({ response: "Name and email are required" });
			}

			await User.create({ name, email });

			return res.status(201).json({ response: "User created successfully" });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ response: "Internal server error" });
		}
	},

	showUsers: async (req, res) => {
		try {
			const users = await User.findAll({ attributes: ["id", "name", "email"] });

			if (users.length === 0) {
				return res.status(404).json({ response: "No users found" });
			}

			return res.status(200).json({ response: users });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ response: "Internal server error" });
		}
	},

	editUser: async (req, res) => {
		try {
			const { id, name, email } = req.body;

			if (!id || !name || !email) {
				return res.status(400).json({ response: "ID, name, and email are required" });
			}

			const [updated] = await User.update({ name, email }, { where: { id } });

			if (updated === 0) {
				return res.status(404).json({ response: "User not found" });
			}

			return res.status(200).json({ response: "User updated successfully" });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ response: "Internal server error" });
		}
	},

	deleteUser: async (req, res) => {
		try {
			const { id } = req.params;

			if (!id) {
				return res.status(400).json({ response: "User ID is required" });
			}

			const deleted = await User.destroy({ where: { id } });

			if (deleted === 0) {
				return res.status(404).json({ response: "User not found" });
			}

			return res.status(200).json({ response: "User deleted successfully" });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ response: "Internal server error" });
		}
	},
};
