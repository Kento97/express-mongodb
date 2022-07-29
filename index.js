const express = require('express')
const app = express()
app.use(express.json())
const port = 3000
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/express-test")
const Product = mongoose.model("Product", new mongoose.Schema({
    id: { type: Number },
    title: { type: String, }
}))
// Product.insertMany([
//     { id: 1, title: "产品1" },
//     { id: 2, title: "产品2" },
//     { id: 3, title: "产品3" }
// ])

app.use(require('cors')())

app.get("/products", async (req, res) => {
    // const products = await Product.find().skip(1).limit(2)
    const products = await Product.find().sort({
        id: 1
    })
    res.send(products)
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params
    const products = await Product.find({
        id
    })
    res.send(products)
})

app.post('/products', async (req, res) => {
    const data = req.body
    const product = await Product.create(data)
    res.send(data)
})

app.put('/products/:id', async (req, res) => {
    await Product.updateOne({ id: req.params.id }, { title: req.body.title })
    const targetProduct = await Product.find({ id: req.params.id })
    res.send(targetProduct)
})

app.delete("/products/:id", async (req, res) => {
    await Product.deleteOne({ id: req.params.id })
    // const targetProduct = await Product.find({ id: req.params.id })
    res.send({ success: true, message: "删除成功" })
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})