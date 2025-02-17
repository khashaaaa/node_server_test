require("dotenv").config()
const express = require("express")
const prog = express()
const cors = require("cors")
const { UserRouter } = require("./engine/route/user.route")

prog.use(cors())
prog.use(express.json({ limit: "100mb" }))
prog.use(express.urlencoded({
    extended: true,
    limit: "100mb",
    parameterLimit: 100000
}))

prog.use("/user", UserRouter)

const startServer = async () => {

    try {
        const { PROG_PORT, PROG_HOST } = process.env
		if (!PROG_PORT || !PROG_HOST) {
			throw new Error(
				"Missing required environment variables: PROG_PORT or PROG_HOST"
			)
		}

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