const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const fs = require('fs');
const log = require('morgan');
const path = require("path");
const { config } = require('dotenv')
const surah = require("./db/quran.all.json")
const listsurah = require("./db/listsurah.json")
config()
const ROOT = path.join(__dirname, "public");
const VIEW_ROOT = path.join(__dirname, "views");
app.use(bodyParser());
app.set("json spaces", 2);
app.use(log('dev'));
app.use(express.static(ROOT));
app.set("view engine", "ejs");
app.set("views", VIEW_ROOT);

// Pages 
app.get('/', (req,res) => {
res.render('index')
})
app.get('/kebijakan-privasi', (req, res) => {
res.render('privasi')
})

app.get('/surah/:surah', (req, res, next) => {
let { surah:p } = req.params;
json = surah[p]
namasurah = listsurah[p]
res.render('result', { json, surah:p, namasurah })
})
app.use((req, res, next) => res.status(404).send(`<html>
<head><title>404 Not Found</title></head>
<body>
<center><h1>404 Not Found</h1></center>
<hr><center>nginx/1.18.0 (Ubuntu)</center>
</body>
</html>`))


const listener = app.listen(process.env.PORT || 8080)
console.log('App Running On PORT : '+ process.env.PORT || 8080)
