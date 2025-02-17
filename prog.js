require("dotenv").config()
const express = require("express")
const prog = express()
const cors = require("cors")
const { PostgresConnect } = require("./engine/config/connector")
const { UserRouter } = require("./engine/router/user.router")
const { User } = require("./engine/model/user.model")

prog.use(cors())
prog.use(express.json({ limit: "100mb" }))
prog.use(express.urlencoded({
    extended: true,
    limit: "100mb",
    parameterLimit: 100000
}))

prog.use("/users", UserRouter)

const startServer = async () => {

    try {
        const { PROG_PORT, PROG_HOST } = process.env
		if (!PROG_PORT || !PROG_HOST) {
			throw new Error(
				"Missing required environment variables: PROG_PORT or PROG_HOST"
			)
		}

		await PostgresConnect()

		const mode = {
			force: false,
			alter: false,
		}

		await User.sync(mode)

        prog.listen(PROG_PORT, () => {
			console.log(
				`Application started on http://${PROG_HOST}:${PROG_PORT}`
			)
		})

    } catch(error) {
        console.error("Server startup failed:", error.message)
		process.exit(1)
    }
}

startServer()