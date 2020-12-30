// 引入mongoose模块
const mongoose = require('mongoose');
// 创建任务集合规则
const memberSchema = new mongoose.Schema({
    username: { type: String, required: true },
    sex: { type: String, required: true },
    nation: { type: String, required: true },
    idNumber: { type: String, required: true },
    birthDate: { type: String, required: true },
    school: { type: String, required: true },
    background: { type: String, required: true },
    category: { type: String, required: true },
    branch: { type: String, required: true },
    enterDate: { type: String, required: true },
    probationDate: { type: String, required: true },
    normal: { type: String, required: true },
    filesPlace: { type: String },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    introduce1: { type: String },
    introduce2: { type: String },
    nowDate: { type: Date, required: true },
    url: ""
}, { versionKey: false });
// 创建member集合
const Member = mongoose.model('member', memberSchema);


// 将集合构造函数作为模块成员进行导出
module.exports = Member;