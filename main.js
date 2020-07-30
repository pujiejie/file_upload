const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const formidable = require("formidable")
const path = require("path")
const fs = require("fs")
const port = 3000;
const jwt = require("jsonwebtoken");

let token = jwt.sign({
    username: "admin",
    password: 123456
}, "asdasdasdrandom", {
    expiresIn: 60 * 60 * 24
})
let token1 = jwt.sign({
    username: "admins",
    password: 1234567
}, "asdasdasdrandom", {
    expiresIn: 60 * 60 * 24
})
console.log(token);

let auto = jwt.verify(token1, "asdasdasdrandom", (a, b) => {
    console.log(a, b)
});

app.use(cors())
app.use(morgan("dev"))

app.post(`/upload`, (req, res) => {
    console.log('接收到请求')
    // 创建实例对象
    var form = new formidable.IncomingForm()
    // 设置上传文件存放目录
    form.uploadDir = path.resolve(__dirname, "upload")
    // 是否保留文件后缀名
    form.keepExtensions = true;
    // 解析表单数据
    form.parse(req, (err, fields, files) => {
        // console.log(files)
    })
    form.on("end", () => {
        res.end("0")
    })
})


app.listen(port, () => {
    console.log(`server is running at port:${port}`)
})