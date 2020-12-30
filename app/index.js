const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()
const app = express()
const path = require('path');
const bodyParser = require('body-parser');
const Member = require('./model/member');
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }))


mongoose.connect('mongodb://localhost:27017/partysystem', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('数据库连接成功'))
    .catch(err => console.log(err, '数据库连接失败'));
app.get('/getMember', async(req, res) => {
    const member = await Member.find();
    res.send(member);
})
app.post('/getlimitMember', async(req, res) => {
    const { receiveBranch, name } = req.body
    var member
    if (receiveBranch !== "" && name !== "") {
        member = await Member.find({ branch: receiveBranch, username: new RegExp(name) })
    } else if (receiveBranch !== "" && name == "") {
        member = await Member.find({ branch: receiveBranch })
    } else if (receiveBranch == "" && name !== "") {
        member = await Member.find({ username: new RegExp(name) })
    }
    res.send(member)
})
app.post('/isExite', async(req, res) => {
    const { idNumber } = req.body
    const isHas = await Member.findOne({ idNumber: idNumber })
    if (isHas) {
        res.send('该用户已存在')
    } else {
        res.send("");
    }
})
app.post('/getInfo', async(req, res) => {
    const { idNumber } = req.body
    const member = await Member.findOne({ idNumber: idNumber })
    res.send(member)
})
app.post('/addMember', async(req, res) => {
    const {
        username,
        sex,
        nation,
        idNumber,
        birthDate,
        school,
        background,
        category,
        branch,
        enterDate,
        probationDate,
        normal,
        filesPlace,
        phone,
        address,
        introduce1,
        introduce2,
        url
    } = req.body
    const member = new Member({
        username: username,
        sex: sex,
        nation: nation,
        idNumber: idNumber,
        birthDate: birthDate,
        school: school,
        background: background,
        category: category,
        branch: branch,
        enterDate: enterDate,
        probationDate: probationDate,
        normal: normal,
        filesPlace: filesPlace,
        phone: phone,
        address: address,
        introduce1: introduce1,
        introduce2: introduce2,
        nowDate: new Date(),
        picture: "",
        url: url
    })
    await member.save();
    res.send("");
})
app.listen(3000);
console.log('服务器启动成功');