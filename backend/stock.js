const express = require('express');
const app = express();
var cors = require('cors');
const bodyParser = require('body-parser');
const router = express.Router();
const PORT =90;

let stocks = {
    list : [
        {id:1,name:"glass",type:"Use",price:2.57},
        {id:2,name:"bag",type:"Use",price:3.79}
    ]
    
}
app.use(cors());
app.use('/api',bodyParser.json(),router);
app.use('/api',bodyParser.urlencoded({extended:false}),router);


router.route('/stocks')
 .get ((req,res)=>{
     res.json(stocks);
 })

 .post ((req,res)=>{
    let id = (stocks.list.length)?stocks.list[stocks.list.length-1].id+1:1
     let name = req.body.name
     let major = req.body.major
     let gpa = req.body.gpa
     stocks.list = [...stocks.list,{id,name,major,gpa}]
     res.json(stocks);
 })

 router.route('/stocks/:std_id')
  .get((req,res)=>{
    let id = stocks.list.findIndex((item) => (item.id === +req.params.std_id))
    res.json(stocks.list[id]);
  })

  .put((req,res)=>{
      let id = stocks.list.findIndex((item) => (item.id === +req.params.std_id))
      stocks.list[id].name = req.body.name
      stocks.list[id].major = req.body.major
      stocks.list[id].gpa = req.body.gpa
      res.json(stocks)
  })

  .delete((req,res)=>{
    stocks.list = stocks.list.filter((item) => item.id !== +req.params.std_id)
      res.json(stocks);
  })


 app.listen(PORT,()=> console.log('Server running on  ',PORT))