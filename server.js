var express = require("express");
var config = require("./config/index");
var port = process.env.PORT || config.build.port;

var app = express();

// var router = express.Router();
// router.get('/',function(req,res){
//     res.location("/index.html");
// });
// app.use(router);

var data = require("./data.json");
var seller = data.seller;
var goods = data.goods;
var ratings = data.ratings;
var apirouter = express.Router();
apirouter.get("/seller",function(req,res){
  res.json({
    errno:0,
    seller:seller
  });
});
apirouter.get("/goods",function(req,res){
  res.json({
    errno:0,
    goods:goods
  });
});
apirouter.get("/ratings",function(req,res){
  res.json({
    errno:0,
    ratings:ratings
  });
});
app.use("/api",apirouter);
app.use(express.static("./dist"));
var server = app.listen(port,function(){
    console.log("app start on http://localhost:"+port);
});