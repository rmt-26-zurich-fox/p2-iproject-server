//* init express
const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const cors = require("cors")

//* init body parse + json + cors
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//* init middlewares & routes
const routes = require("./routes/index")
const errorHandler = require("./middlewares/errorHandler")

//! for testing
const { Patchnote } = require("./models")
const { Op } = require("sequelize")
const sequelize = require("sequelize")

//* init use for routes & error handler
// app.use(routes)
// app.use(errorHandler)

app.get("/", async (req, res) => {
	try {
		let data = await Patchnote.findAll({
			attributes: {
				//* make the date datatype timestamp -> string
				include: [[sequelize.cast(sequelize.col("date"), "varchar"), "date"]],
			},
			//TODO: TEST
			where: sequelize.where(sequelize.cast(sequelize.col("date"), "varchar"), { [Op.iLike]: "%2014%" }),
			// name: { [Op.iLike]: "%hotfix%" },
		})

		res.status(200).json({ data })
	} catch (error) {
		console.log(error)
		res.status(500).json({ error })
	}
})

//* listen
app.listen(port, () => {
	console.log("alive and kickin' at", port)
})
