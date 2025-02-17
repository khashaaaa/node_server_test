const Router = require("express")
const {
	createUser,
	showUsers,
	deleteUser,
} = require("../controller/user.controller")

const UserRouter = Router()

UserRouter.post("/login", login)
UserRouter.get("/list", showUsers)
UserRouter.post("/create", createUser)
UserRouter.delete("/delete/:id", deleteUser)

module.exports = { UserRouter }