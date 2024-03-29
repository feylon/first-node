const express = require('express');
const serverless = require("serverless-http");
const cors = require("cors");
let todos = require("../todos");
const app = express()
app.use(cors());
app.use(express.json());
app.use(express.static("./public"));
const router = express.Router();

router.get("/todo",(req,res)=>{
    let data = [];
    todos.forEach((i,j)=>{
        data.push(
            {
                id:j,
                content: i.content,
                active:  i.active
            }
        )
    })
    res.status(200).send((data));
});

router.post('/todo_add',(req,res)=>{
    let data = [];
todos.unshift(req.body);
todos.forEach((i,j)=>{
    data.push(
        {
            id:j,
            content: i.content,
            active:  i.active
        }
    )
})
res.status(201).send((data));
});

router.delete("/delete/:id",(req,res)=>{
todos.splice(req.params.id,1);
res.status(200).send({
    active:true
});
})



router.patch("/active/:id",(req,res)=>{
todos.splice(req.params.id,todos[req.params.id]);
todos[todos[req.params.id]] = !todos[todos[req.params.id]];
res.status(201).send({
    hammasi:"yaxshi"
});
})
// app.listen(3000, ()=>{
app.use("./netlify/functions/api",router)
module.exports.handler = serverless(app);