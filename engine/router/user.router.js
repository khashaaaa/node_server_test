const Router = require("express")
const {
	createUser,
	showUsers,
	deleteUser,
	editUser,
} = require("../controller/user.controller")

const UserRouter = Router()

UserRouter.get("/", showUsers)
UserRouter.post("/create", createUser)
UserRouter.put("/:id/update", editUser)
UserRouter.delete("/:id/delete", deleteUser)

module.exports = { UserRouter }