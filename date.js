exports.getDate = function() {

  const today = new Date();

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  return today.toLocaleDateString("en-US", options);

};

exports.getDay = function () {

  const today = new Date();

  const options = {
    weekday: "long"
  };

  return today.toLocaleDateString("en-US", options);

};




// //jshint esversion:6

// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const _ = require("lodash");

// const app = express();

// app.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static("public"));

// mongoose.connect("mongodb://localhost:27017/toDB");

// const itemsSchema = {
//   name: String
// };

// const Item = mongoose.model("Item", itemsSchema);


// const item1 = new Item({
//   name: "Welcome to your todolist!"
// });

// const item2 = new Item({
//   name: "Hit the + button to add a new item."
// });

// const item3 = new Item({
//   name: "<-- Hit this to delete an item."
// });

// const defaultItems = [item1, item2, item3];

// const listSchema = {
//   name: String,
//   items: [itemsSchema]
// };

// const List = mongoose.model("List", listSchema);


// app.get("/", function(req, res) {

//   Item.find({}).then(function(foundItems){

//     if (foundItems.length === 0) {
//       Item.insertMany(defaultItems);
//       res.redirect("/");
//     } else {
//       res.render("list", {listTitle: "Today", newListItems: foundItems});
//     }
//   });

// });


// app.post("/", function(req, res){

//   const itemName = req.body.newItem;
//   const listName = req.body.list;

//   const item = new Item({
//     name: itemName
//   });

//   item.save();
//   res.redirect("/");

// });

// app.post("/delete", function(req, res){
//   const checkedItemId = req.body.checkbox;
//     Item.findByIdAndDelete({_id:checkedItemId}).then(function(){
//       res.redirect("/");
//     });
    
//   });

// app.get("/:paramName", function(req, res){
//     console.log(req.params.paramName);
// })

// app.get("/about", function(req, res){
//   res.render("about");
// });

// app.listen(3000, function() {
//   console.log("Server started on port 3000");
// });
