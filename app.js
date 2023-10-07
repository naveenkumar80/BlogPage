//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');

const homeStartingContent = "We are thrilled to extend a heartfelt welcome to all the passionate bloggers who have found their way to our virtual haven of creativity, information, and inspiration. Whether you're a seasoned wordsmith or just dipping your toes into the exciting world of blogging, you're in the right place!";
const aboutContent = "";
const contactContent = "";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
let posts = [];
app.get("/",function(req,res){
  res.render('home',{
    startingContent : homeStartingContent,
    posts : posts,

  })
});
app.get("/about",function(req,res){
  res.render('about',{
    aboutContent : aboutContent
  })
});
app.get("/contact",function(req,res){
  res.render('contact',{
    contactContent : contactContent
  })
});
app.get("/compose",function(req,res){
  res.render('compose',{
  })
});
app.post("/compose",function(req,res){
  const post = {
    postTitle : req.body.postTitle,
    postBody : req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});


app.get("/post/:postName", function(req,res){
  const requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.postTitle)
    if(storedTitle === requestedTitle){
      res.render("post",{
        postTitle : post.postTitle,
        postBody : post.postBody
      });
    }
  })
  
})










app.listen(3000, function() {
  console.log("Server started on port 3000");
});
