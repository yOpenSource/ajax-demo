let express = require('express');
let bodyParser = require('body-parser');



let app = express();
app.use(express.static(__dirname));
app.use(bodyParser.json());

let PORT = process.env.PORT || 3000;


let products=[
  {
    id : 1,
    name : "mobile"
  },
  {
    id : 2,
    name :"drill"
  },
  {
    id : 3,
    name : "treamer"
  }
];
let currentId = 3;



app.listen(PORT,function(){
  console.log("Hey yog this is your server running on port "+PORT);
});

app.get('/products',function(req,res){
  res.send({products:products});
});

app.post('/products',function(req,res){
  let productName = req.body.name;
  currentId++;
  products.push({
    id : currentId,
    name : productName
  });
  res.send("created product");
});


app.put('/products/:id',function(req,res){
  let id = req.params.id;
  let newName = req.body.newName;
  products.forEach(function(product,index){
    if(product.id == Number(id)){
      product.name=newName;
    }
  });
  res.send("product added successfully");
});


app.delete('/products/:id',function(req,res){
  let id = req.params.id;
  products.forEach(function(product,index){
    if(product.id == Number(id)){
      products.splice(index,1);
    }
  });
  res.send('product with id : '+id+' deleted successfully');

});
