const express = require("express");
const ejs = require("ejs");
const bodyparser = require("body-parser");
const _ = require("lodash");
const date = require(__dirname+"/date.js")
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://<username>:<password>@cluster0.hbkdpsr.mongodb.net/todolistDB")

const app = express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

const listSchema = {
    name:String
}

const List = mongoose.model("List", listSchema);

const list1 = new List({
  name:"Welcome to your todo list"
});

const list2 = new List({
  name:"hit + to add new item"
});

const list3 = new List({
  name:"<-- hit this to delete item"
})

const  defaultItem=[list1, list2, list3];

let routeSchema = {
    name:String,
    defaultList: [listSchema]
}

let Route = mongoose.model("Route", routeSchema);

app.get("/", function(req, res){
  List.find({}).then(function(data){
    if(data.length===0){defaultItem
         List.insertMany(defaultItem).then(function(){
           res.redirect("/");
         });      
    }
    else{
      res.render("list", {today:date.getDate(), addInput:data});
    } 
  });  
});

app.post("/", function(req, res){
     const input = req.body.newItem;
     const title = req.body.list;

     const addedlist = new List({
        name: input
     })

     if(title===date.getDate()){
        addedlist.save().then(function(){
           res.redirect("/");
        });
     }
     else{
      Route.findOne({name:title}).then(function(data){
          data.defaultList.push(addedlist);
          data.save().then(function(){
             res.redirect("/"+title);
          });
      })
     }
})

app.get("/:parametername", function(req, res){
    const customRout = _.capitalize(req.params.parametername);
    Route.findOne({name:customRout}).then(function(data){
       if(!data){
         const newRoute = new Route({
            name: customRout,
            defaultList: defaultItem
         })
         newRoute.save().then(function(){
            res.redirect("/"+customRout);
         });
       }
       else{
          res.render("list", {today:customRout, addInput:data.defaultList});
       }
    });

});

app.post("/delete", function(req,res){
    const deleteItem = req.body.checkbox;
    const listName = req.body.hiddename;

    if(listName==date.getDate()){
      List.findByIdAndDelete(deleteItem).then(function(){
        res.redirect("/");
     })
    }

    else{
      Route.findOneAndUpdate({name:listName},{$pull:{defaultList:{_id:deleteItem}}}).then(function(){
        res.redirect("/"+listName);
      })
    }

});

app.listen(process.env.PORT || 3000, function(){
  console.log("server is running on port 3000");
})
