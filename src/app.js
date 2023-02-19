import express from "express"

const app = express();

app.get('/products',(req, res)=>{
    res.send("Hellow World");

})

app.listen(8080,()=>{
    console.log("Server on Port 8080")
})