const express = require('express')
const app = express()
const port = 5000

//one of the endPoint
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//defacto for handaling next middleware 40: 7     allowing cross origin    local host has been blocked by 
// CORS polycy
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

//app.use is a middleware for Express(routes)
app.use(express.json())
app.use('/api', require("./Routes/CreateUser"))
app.use('/api', require("./Routes/DisplayData"))

app.use('/api', require("./Routes/OrderData"))
// app.use('/api', require("./Routes/OrderData"))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const mongoDB = require("./db")
mongoDB()