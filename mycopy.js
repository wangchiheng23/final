const http = require('http');
const fs=require('fs');
const url=require('url');
const express=require('express')
const app=express()
const querystring = require("querystring");
const insertDB=require('./MongodbLib')
var name=''
var password=''
var submit=''
//const path=require('path')
//app.set('views', path.join(__dirname, 'views'));   //设置模板文件夹的路径
//app.set('view engine', 'html');   //设置视图模板为ejs
//app.engine('html',require('ejs').renderFile);
app.set("view engine","ejs")
app.set("views","/views")
app.use(express.static(__dirname+'/public'))
var a=''
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myMongoose',{useNewUrlParser:true,useUnifiedTopology: true});
var Schema = mongoose.Schema;
var logSchema = new Schema({
    name:String,
    password:String
});
const logOBj = mongoose.model('Login', logSchema);//model的建立
//const kitty = new Cat({ name: 'huahua1',age:2,color:"花" });
//写入
//kitty.save().then(() => console.log('meow'));
//查找全部文档
//Cat.find({},(err,docs)=>{for (i in docs) console.log(docs[i]._doc.name)});
//doc={}
app.get('/input',(req,res,next)=>{
  //loginData=new logOBj({name:name,password:password})
  name=req.query.name
  password=req.query.password
  //doc[name]=password
  //console.log(doc)
  submit=req.query.submit1
  //res.send('Hello World')
  a="This is a next() test"
  //res.send=("The first.")
  if(name.length!=0&&password.length!=0)
  next()
  else
  res.render(__dirname+"/views/demo.ejs",{message:'用户名和密码都不能为空，请输入：'})
  //res.send('用户名和密码都不能为空，请输入：')
})
app.get('/input',(req,res,next)=>{
  if(submit=='注册'){
  loginData=new logOBj({name:name,password:password});
  logOBj.find({name:name},(err,docs)=>{if(!err){
    if(docs.length!=0) nameInDB=100;
    else nameInDB=0;
    next();
  }});
  }
  else{
    loginData=new logOBj({name:name,password:password});
    logOBj.find({name:name,password:password},(err,docs)=>{if(!err){
        if(docs.length!=0) nameInDB=100;
        else nameInDB=0;
        next();
  }
})
  }
})
app.get('/input',(req,res,next)=>{
  if(submit=='注册'){
    console.log(name)
    //insertDB.myinsert('mydb','mycollection',[{name:name,password:password}]);
    /*insertDB.myfind('mydb','login',{name:name},(docs)=>{
      if(docs.length==0)
      {   
          //console.log("注册失败");
          insertDB.myinsert('mydb','login',[{name:name,password:password}]);
          res.send("注册成功")//有问题,不应该写在这里
      }
      else 
      {
          loginFlag=100;
          console.log("注册失败");
          res.render(__dirname+"iews/demo.ejs",{message:'注册失败，该用户名已经存在，请重新注册：'})
          //res.send("注册失败")
      }
  });*/
    if(nameInDB==0) loginData.save((err)=>{res.send("注册成功，欢迎您，"+name)})
    else  res.render(__dirname+"views/demo.ejs",{message:'注册失败，该用户名已经存在，请重新注册：'})
  }
  else if(submit=='登录')
      {
        console.log(name)
        //insertDB.myinsert('mydb','mycollection',[{name:name,password:password}]);
        /*insertDB.myfind('mydb','login',{name:name,password:password},(docs)=>{
          if(docs.length!=0)
          {   
              //console.log("注册失败");
              //insertDB.myinsert('mydb','login',[{name:name,password:password}]);
              res.send("登录成功，欢迎您，"+name)
              //res.render(__dirname+"iews/case2.ejs",{message2:[{dao:'登录成功，欢迎您，',name:name}]})
              //res.send("登录成功")//有问题,不应该写在这里
          }
          else 
          {
              loginFlag=100;
              console.log("登录失败");
              res.render(__dirname+"iews/demo.ejs",{message:'登录失败，密码或者用户名错误'})
              //res.send("登录失败")
          }
      });*/
        if(nameInDB==100) res.send("登录成功，欢迎您，"+name)
        else res.render(__dirname+"views/demo.ejs",{message:'登录失败，密码或者用户名错误'})
      }
  //res.send(a)
})
app.listen(3000)