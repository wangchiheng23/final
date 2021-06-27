const http = require('http');
const fs=require('fs');
const url=require('url');
const express=require('express')
const app=express()
const querystring = require("querystring");
const insertDB=require('./MongodbLib')
const bodyParser = require('body-parser');
var name=''
var password=''
var submit=''
var submitName=''
var submit1=''
var submit2=''
var user=''
var shoesname=''
var shoesid=''
var id=''
var price=''
var note=''
var brand=''
var type=''
app.set("view engine","ejs")
app.set("views","/views")
app.use(express.static(__dirname+'/public'))
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myMongoose',{useNewUrlParser:true,useUnifiedTopology: true});
var Schema = mongoose.Schema;
var logSchema = new Schema({
    name:String,
    password:String
});
var Shoes = new Schema({
  shoesname:String,
  shoesid:String,
  price:String,
  note:String,
  brand:String
})
const logOBj = mongoose.model('Login', logSchema);//model的建立
const logUser=mongoose.model('LogUser',logSchema);
const BasketBallShoes=mongoose.model('BasketBallShoes',Shoes);
const SoccerShoes=mongoose.model('SoccerShoes',Shoes)
const TennisShoes=mongoose.model('TennisShoes',Shoes)
app.get('/input',(req,res,next)=>{
  name=req.query.name
  password=req.query.password
  submit=req.query.submitName
  user=req.query.user
  //submit1=req.query.submit2
  //shoesname=req.query.shoesname
  //id=req.query.id
  //price=req.query.price
  //note=req.query.note
  //brand=req.query.brand
  //type=req.query.type
  if(name.length!=0&&password.length!=0)
  next()
  else
  res.render(__dirname+"/views/reinput.ejs",{message:'用户名和密码都不能为空，请输入'})
})
app.get('/input',(req,res,next)=>{
  if(submit=='注册'){
    if(user=="user"){
      loginData=new logUser({name:name,password:password});
      logUser.find({name:name},(err,docs)=>{if(!err){
        if(docs.length!=0) nameInDB=100;
        else nameInDB=0;
        next();
    }});
  }
    else{ 
    loginData=new logOBj({name:name,password:password});
    logOBj.find({name:name},(err,docs)=>{if(!err){
      if(docs.length!=0) nameInDB=100;
      else nameInDB=0;
      next();
  }});
  }
}
  else{
    if(user=="user"){
    loginData=new logUser({name:name,password:password});
    logUser.find({name:name,password:password},(err,docs)=>{if(!err){
      if(docs.length!=0){ 
        nameInDB=100 
      }
      else nameInDB=0;
      next();
      }
    })
  }
    else{
    loginData=new logOBj({name:name,password:password});
    logOBj.find({name:name,password:password},(err,docs)=>{if(!err){
        if(docs.length!=0){ 
          nameInDB=100 
        }
        else nameInDB=0;
        next();
        }
      })
    }
  }
})
app.get('/input',(req,res,next)=>{
  if(submit=='注册'){
    console.log(name)
    if(nameInDB==0) loginData.save((err)=>{res.render(__dirname+"/views/reinput.ejs",{message:'注册成功，欢迎您'})})
    else  res.render(__dirname+"/views/reinput.ejs",{message:'注册失败，该用户名已经存在，请重新注册：'})
  }
  else if(submit=='登录')
      {
        console.log(name)
        if(nameInDB==100&&user=="user") res.render(__dirname+"/views/user.ejs")
        else if(nameInDB==100&&user=="admin") res.render(__dirname+"/views/admin.ejs")
        else res.render(__dirname+"/views/reinput.ejs",{message:'登录失败，密码或者用户名错误'})
      }
})
app.get('/admin',(req,res,next)=>{
  submit1=req.query.submit2
  shoesname=req.query.shoesname
  shoesid=req.query.shoesid
  price=req.query.price
  note=req.query.note
  brand=req.query.brand
  type=req.query.stype
  
  if(shoesname.length!=0&&shoesid.length!=0&&price.length!=0&&note.length!=0&&brand.length!=0)
  next();
  else{
    if(submit1=="查询/删除"){
      res.render(__dirname+"/views/search.ejs")
    }
    else
    res.render(__dirname+"/views/readmin.ejs",{message:'填入信息均不能为空'})

  }
})
app.get('/admin',(req,res,next)=>{
  if(submit1=='提交'){
    if(type=="篮球"){
      shoesData=new BasketBallShoes({shoesname:shoesname,shoesid:shoesid,price:price,note:note,brand:brand});
      BasketBallShoes.find({shoesname:shoesname},(err,docs)=>{if(!err){
        if(docs.length!=0) shoesInDB=100;
        else shoesInDB=0;
        next();
      }});
    }
    else if(type=='足球'){ 
      shoesData=new SoccerShoes({shoesname:shoesname,shoesid:shoesid,price:price,note:note,brand:brand});
      SoccerShoes.find({shoesname:shoesname},(err,docs)=>{if(!err){
      if(docs.length!=0) shoesInDB=100;
      else shoesInDB=0;
      next();
      }});
    }
    else if(type=='网球'){
      shoesData=new TennisShoes({shoesname:shoesname,shoesid:shoesid,price:price,note:note,brand:brand});
      TennisShoes.find({shoesname:shoesname},(err,docs)=>{if(!err){
        if(docs.length!=0) shoesInDB=100;
        else shoesInDB=0;
        next();
        }});
   }
  }
  else if(submit1=="查询/删除"){
    res.render(__dirname+"/views/search.ejs")
  }
})
app.get('/admin',(req,res,next)=>{
  if(submit1=='提交'){
    console.log(name)
    if(shoesInDB==0) shoesData.save((err)=>{res.render(__dirname+"/views/readmin.ejs",{message:'提交成功'})})
    else  res.render(__dirname+"/views/readmin.ejs",{message:'提交失败，该款球鞋信息已经存在，请提交新信息：'})
  }
  else if(submit1=='查询/删除')
      {
        res.render(__dirname+"/views/search.ejs")
      }
})
app.get('/search',(req,res,next)=>{
  submit1=req.query.submit2
  shoesname=req.query.shoesname
  shoesid=req.query.shoesid
  price=req.query.price
  note=req.query.note
  brand=req.query.brand
  type=req.query.stype
  submit2=req.query.submit3
  if(submit2=="查询"){
    if(type=="篮球"){
      if ((shoesid == "") && (shoesname != '')) {
        //var searchname = shoesname
        shoesData=new BasketBallShoes({shoesname:shoesname,shoesid:shoesid,price:price,note:note,brand:brand});
        BasketBallShoes.find({
          shoesname:shoesname
        },(err, data)=>{
            if (data != null) {
                res.render(__dirname+"/views/searchresult.ejs", {Data: data})
            }
        })
    }
    else if(shoesid!=''&&shoesname==''){
      BasketBallShoes.find({
            'shoesid': shoesid
        }, function (err, data) {
            if (data != null) {
                res.render(__dirname+"/views/searchresult.ejs", {Data: data})
            }
        })
    }
    //多条件查询
    else if ((shoesid != "") && (shoesname != '')) {
  
      shoesData=new BasketBallShoes({shoesname:shoesname,shoesid:shoesid,price:price,note:note,brand:brand});
        BasketBallShoes.find({
            $and: [
                {'shoesname': shoesname},
                {'shoesid': shoesid}
            ]
        }, function (err, data) {
            if (data != null) {
                res.render(__dirname+"/views/searchresult.ejs", {Data: data})
            }
        })
    }
    else{
      res.render(__dirname+"/views/searchnone.ejs", {message:"数据不能为空哦"})
    }
    }
    else if(type=="足球"){
      if ((shoesid == "") && (shoesname != '')) {
        //var searchname = shoesname
        shoesData=new SoccerShoes({shoesname:shoesname,shoesid:shoesid,price:price,note:note,brand:brand});
        SoccerShoes.find({
          shoesname:shoesname
        },(err, data)=>{
            if (data != null) {
                res.render(__dirname+"/views/searchresult.ejs", {Data: data})
            }
        })
    }
    else if(shoesid!=''&&shoesname==''){
      SoccerShoes.find({
            'shoesid': shoesid
        }, function (err, data) {
            if (data != null) {
                res.render(__dirname+"/views/searchresult.ejs", {Data: data})
            }
        })
    }
    //多条件查询
    else if ((shoesid != "") && (shoesname != '')) {
  
      shoesData=new SoccerShoes({shoesname:shoesname,shoesid:shoesid,price:price,note:note,brand:brand});
      SoccerShoes.find({
            $and:[
                {'shoesname': shoesname},
                {'shoesid': shoesid}
            ]
        }, function (err, data) {
            if (data != null) {
                res.render(__dirname+"/views/searchresult.ejs", {Data: data})
            }
        })
    }
    else{
      res.render(__dirname+"/views/searchnone.ejs", {message:"数据不能为空哦"})
    }
    }
    else if(type=="网球"){
      if ((shoesid == "") && (shoesname != '')) {
        //var searchname = shoesname
        shoesData=new TennisShoes({shoesname:shoesname,shoesid:shoesid,price:price,note:note,brand:brand});
        TennisShoes.find({
          shoesname:shoesname
        },(err, data)=>{
            if (data != null) {
                res.render(__dirname+"/views/searchresult.ejs", {Data: data})
            }
        })
    }
    else if(shoesid!=''&&shoesname==''){
      TennisShoes.find({
            'shoesid': shoesid
        }, function (err, data) {
            if (data != null) {
                res.render(__dirname+"/views/searchresult.ejs", {Data: data})
            }
        })
    }
    //多条件查询
    else if ((shoesid != "") && (shoesname != '')) {
  
      shoesData=new TennisShoes({shoesname:shoesname,shoesid:shoesid,price:price,note:note,brand:brand});
      TennisShoes.find({
            $and: [
                {'shoesname': shoesname},
                {'shoesid': shoesid}
            ]
        }, function (err, data) {
            if (data != null) {
                res.render(__dirname+"/views/searchresult.ejs", {Data: data})
            }
        })
    }
    else{
      res.render(__dirname+"/views/searchnone.ejs", {message:"数据不能为空哦"})
    }
    } 
  }
  else if(submit2=="返回"){
    res.render(__dirname+"/views/admin.ejs")
  }
  else if(submit2=="返回登录界面"){
    res.render(__dirname+"/views/index.ejs")
  }
  else if(submit2=="删除"){
    if(type=="篮球"){
      if ((shoesid == "") && (shoesname != '')) {
        //var searchname = shoesname
        shoesData=new BasketBallShoes({shoesname:shoesname,shoesid:shoesid,price:price,note:note,brand:brand});
        BasketBallShoes.deleteOne({
          shoesname:shoesname
        },(err, data)=>{
            if (data != null) {
                res.render(__dirname+"/views/searchresult.ejs", {Data: data})
            }
        })
    }
    else if(shoesid!=''&&shoesname==''){
      BasketBallShoes.deleteOne({
            'shoesid': shoesid
        }, function (err, data) {
            if (data != null) {
                res.render(__dirname+"/views/searchresult.ejs", {Data: data})
            }
        })
    }
    //多条件查询
    else if ((shoesid != "") && (shoesname != '')) {
  
      shoesData=new BasketBallShoes({shoesname:shoesname,shoesid:shoesid,price:price,note:note,brand:brand});
        BasketBallShoes.deleteOne({
            $and: [
                {'shoesname': shoesname},
                {'shoesid': shoesid}
            ]
        }, function (err, data) {
            if (data != null) {
                res.render(__dirname+"/views/searchresult.ejs", {Data: data})
            }
        })
    }
    else{
      res.render(__dirname+"/views/searchnone.ejs", {message:"数据不能为空哦"})
    }
    }
    else if(type=="足球"){
      if ((shoesid == "") && (shoesname != '')) {
        //var searchname = shoesname
        shoesData=new SoccerShoes({shoesname:shoesname,shoesid:shoesid,price:price,note:note,brand:brand});
        SoccerShoes.deleteOne({
          shoesname:shoesname
        },(err, data)=>{
            if (data != null) {
                res.render(__dirname+"/views/searchresult.ejs", {Data: data})
            }
        })
    }
    else if(shoesid!=''&&shoesname==''){
      SoccerShoes.deleteOne({
            'shoesid': shoesid
        }, function (err, data) {
            if (data != null) {
                res.render(__dirname+"/views/searchresult.ejs", {Data: data})
            }
        })
    }
    //多条件查询
    else if ((shoesid != "") && (shoesname != '')) {
  
      shoesData=new SoccerShoes({shoesname:shoesname,shoesid:shoesid,price:price,note:note,brand:brand});
      SoccerShoes.deleteOne({
            $and:[
                {'shoesname': shoesname},
                {'shoesid': shoesid}
            ]
        }, function (err, data) {
            if (data != null) {
                res.render(__dirname+"/views/searchresult.ejs", {Data: data})
            }
        })
    }
    else{
      res.render(__dirname+"/views/searchnone.ejs", {message:"数据不能为空哦"})
    }
    }
    else if(type=="网球"){
      if ((shoesid == "") && (shoesname != '')) {
        //var searchname = shoesname
        shoesData=new TennisShoes({shoesname:shoesname,shoesid:shoesid,price:price,note:note,brand:brand});
        TennisShoes.deleteOne({
          shoesname:shoesname
        },(err, data)=>{
            if (data != null) {
                res.render(__dirname+"/views/searchresult.ejs", {Data: data})
            }
        })
    }
    else if(shoesid!=''&&shoesname==''){
      TennisShoes.deleteOne({
            'shoesid': shoesid
        }, function (err, data) {
            if (data != null) {
                res.render(__dirname+"/views/searchresult.ejs", {Data: data})
            }
        })
    }
    //多条件查询
    else if ((shoesid != "") && (shoesname != '')) {
  
      shoesData=new TennisShoes({shoesname:shoesname,shoesid:shoesid,price:price,note:note,brand:brand});
      TennisShoes.deleteOne({
            $and: [
                {'shoesname': shoesname},
                {'shoesid': shoesid}
            ]
        }, function (err, data) {
            if (data != null) {
                res.render(__dirname+"/views/searchresult.ejs", {Data: data})
            }
        })
    }
    else{
      res.render(__dirname+"/views/searchnone.ejs", {message:"数据不能为空哦"})
    }
    }
  }
})
app.get('/usersearch',(req,res,next)=>{
  submit1=req.query.submit2
  shoesname=req.query.shoesname
  shoesid=req.query.shoesid
  price=req.query.price
  note=req.query.note
  brand=req.query.brand
  typeu=req.query.ntype
  submit2=req.query.submit3
  submit3=req.query.submit4
  if(submit3=="查询"){
    if(typeu=="篮球"){
      if ((shoesid == "") && (shoesname != '')) {
        //var searchname = shoesname
        shoesData=new BasketBallShoes({shoesname:shoesname,shoesid:shoesid,price:price,note:note,brand:brand});
        BasketBallShoes.find({
          shoesname:shoesname
        },(err, data)=>{
            if (data != null) {
                res.render(__dirname+"/views/userresult.ejs", {Data: data})
            }
        })
    }
    else if(shoesid!=''&&shoesname==''){
      BasketBallShoes.find({
            'shoesid': shoesid
        }, function (err, data) {
            if (data != null) {
                res.render(__dirname+"/views/userresult.ejs", {Data: data})
            }
        })
    }
    //多条件查询
    else if ((shoesid != "") && (shoesname != '')) {
  
      shoesData=new BasketBallShoes({shoesname:shoesname,shoesid:shoesid,price:price,note:note,brand:brand});
        BasketBallShoes.find({
            $and: [
                {'shoesname': shoesname},
                {'shoesid': shoesid}
            ]
        }, function (err, data) {
            if (data != null) {
                res.render(__dirname+"/views/userresult.ejs", {Data: data})
            }
        })
    }
    else{
      res.render(__dirname+"/views/usernone.ejs", {message:"数据不能为空哦"})
    }
    }
    else if(typeu=="足球"){
      if ((shoesid == "") && (shoesname != '')) {
        //var searchname = shoesname
        shoesData=new SoccerShoes({shoesname:shoesname,shoesid:shoesid,price:price,note:note,brand:brand});
        SoccerShoes.find({
          shoesname:shoesname
        },(err, data)=>{
            if (data != null) {
                res.render(__dirname+"/views/userresult.ejs", {Data: data})
            }
        })
    }
    else if(shoesid!=''&&shoesname==''){
      SoccerShoes.find({
            'shoesid': shoesid
        }, function (err, data) {
            if (data != null) {
                res.render(__dirname+"/views/userresult.ejs", {Data: data})
            }
        })
    }
    //多条件查询
    else if ((shoesid != "") && (shoesname != '')) {
  
      shoesData=new SoccerShoes({shoesname:shoesname,shoesid:shoesid,price:price,note:note,brand:brand});
      SoccerShoes.find({
            $and:[
                {'shoesname': shoesname},
                {'shoesid': shoesid}
            ]
        }, function (err, data) {
            if (data != null) {
                res.render(__dirname+"/views/userresult.ejs", {Data: data})
            }
        })
    }
    else{
      res.render(__dirname+"/views/usernone.ejs", {message:"数据不能为空哦"})
    }
    }
    else if(typeu=="网球"){
      if ((shoesid == "") && (shoesname != '')) {
        //var searchname = shoesname
        shoesData=new TennisShoes({shoesname:shoesname,shoesid:shoesid,price:price,note:note,brand:brand});
        TennisShoes.find({
          shoesname:shoesname
        },(err, data)=>{
            if (data != null) {
                res.render(__dirname+"/views/userresult.ejs", {Data: data})
            }
        })
    }
    else if(shoesid!=''&&shoesname==''){
      TennisShoes.find({
            'shoesid': shoesid
        }, function (err, data) {
            if (data != null) {
                res.render(__dirname+"/views/userresult.ejs", {Data: data})
            }
        })
    }
    //多条件查询
    else if ((shoesid != "") && (shoesname != '')) {
  
      shoesData=new TennisShoes({shoesname:shoesname,shoesid:shoesid,price:price,note:note,brand:brand});
      TennisShoes.find({
            $and: [
                {'shoesname': shoesname},
                {'shoesid': shoesid}
            ]
        }, function (err, data) {
            if (data != null) {
                res.render(__dirname+"/views/userresult.ejs", {Data: data})
            }
        })
    }
    else{
      res.render(__dirname+"/views/usernone.ejs", {message:"数据不能为空哦"})
    }
    } 
  }
  else if(submit3=="返回登录界面"){
    res.render(__dirname+"/views/index.ejs")
  }
})
app.get('',(req,res,next)=>{
  
})
app.get('',(req,res,next)=>{
  
})
app.get('',(req,res,next)=>{
  
})
app.get('',(req,res,next)=>{
  
})
app.get('',(req,res,next)=>{
  
})
app.get('',(req,res,next)=>{
  
})
app.get('',(req,res,next)=>{
  
})
app.listen(3000)