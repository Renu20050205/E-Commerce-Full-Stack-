const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const app = express();
const route = require("./Routes/routes")


app.use(cors())
app.use(express.json());
app.use("/", route)


mongoose.connect("mongodb+srv://renubatham2002:cZusCJXeS0CwJztC@cluster0.usyv06o.mongodb.net/E-Commerce-Website")
.then(()=>console.log("Mongo Db is Connected"))
.catch(()=>console.log("Db Connection Failed"))

//server Creation

app.get("/",(req,res)=>{
    res.send("Hello From Express js");
});

const PORT = 4000;
app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log(`Server is  Running At Port ${PORT}`);
    }
});