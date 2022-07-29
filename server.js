const express = require('express')
const router = require('./router.js')
const app = express()
app.use(express.json())
app.use("/api", router)
const port = 3000
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})