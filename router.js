const express = require('express');
const router = express.Router();
const { User } = require('./models.js')
const jwt = require("jsonwebtoken")

const SECRET = "1145141919810" //应该写在特殊文件里面，不应该传到git上

router.get("/users", async (req, res) => {
    const users = await User.find()
    res.send(users)
})

router.post('/register', async (req, res) => {
    const user = await User.create({
        username: req.body.username,
        password: req.body.password
    })
    res.send(user)
})

router.post("/login", async (req, res) => {
    const user = await User.findOne({
        username: req.body.username,
        // password: req.body.password
    })
    if (!user) {
        return res.status(422).send({
            message: '用户名不存在'
        })
    }
    const isPasswordValid = require("bcrypt").compareSync(req.body.password, user.password ?? "")
    if (!isPasswordValid) {
        return res.status(422).send({
            message: '密码无效'
        })
    }
    //生成token
    const token = jwt.sign({
        id: String(user._id),
    }, SECRET)
    res.send({
        user,
        token
    })
})

router.get('/profile', async (req, res) => {
    console.log();
    const raw = `${req.headers.authorization}`.split(" ").pop()
    const tokenData = jwt.verify(raw ?? "", SECRET)
    // @ts-ignore
    const user = await User.findById(tokenData.id)
    res.send(user)
})
module.exports = router