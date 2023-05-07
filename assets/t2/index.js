const path = require("path")
const express = require("express")
require("dotenv").config()
const color = require("colors")
const cors = require("cors")
const connectDB = require("./config/db")
const { errorHandler } = require("./middleware/errorMiddleware")

connectDB()

const port = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.use('/api/goal', require("./routes/goalRoutes"))
app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/assets", require("./routes/assetRoutes"))
app.use("/api/events", require("./routes/eventRoutes"))
app.use("/api/clients", require("./routes/clientRoutes"))
app.use("/api/home", require("./routes/homeRoutes"))

// server frontend
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")))
//   app.use(express.static('/'))

//   app.use((req, res) =>
//     res.sendFile(path.join(__dirname, "../", "frontend", "dist", "index.html"))

//   )
// } else {
//   app.get("/", (req, res) => res.send("please setup production server before"))
// }

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
