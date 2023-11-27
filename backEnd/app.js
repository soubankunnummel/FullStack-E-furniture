require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express")
const app = express()
const PORT = 7000
const userRouter = require("./routes/userRouter")
const adminRoute = require("./routes/adminRouter")
const ErroHandler = require("./middelwares/ErrorHandler")
const bodyParser = require("body-parser")
const cors = require("cors")

// data base connection

mongoose.connect("mongodb://localhost:27017/FullStack-E-comers", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(ErroHandler)
app.use(express.json())





app.use(cors())
app.use("/api/users", userRouter )
app.use("/api/admin", adminRoute)




app.listen(PORT, () => {
    console.log("server runnign on port ",PORT);
})