const express = require("express");
const bodyParser = require("body-parser");
var dotenv=require('dotenv');
const app = express();
var path=require("path");
var router=require("./routes/index");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dotenv.config();
app.use(express.static(path.join(__dirname, 'views')));
app.use('/api',router);
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
})
app.get('/home',(req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
})
app.get('/user',(req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'user.html'));
})
app.get('/attend',(req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'attend.html'));
})
app.get('/newUser',(req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'newUser.html'));
})
// app.set('view engine',"ejs");
// app.set("views",path.resolve("./views"))

// app.get('/view', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });
app.listen(8080, () => console.log("Server started at port 8080"));