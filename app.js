const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

mongoose.connect('mongodb://localhost:27017/AttendanceManager', {useNewUrlParser: true});

const subjectsSchema = {
  subjectName: String,
  present: Number,
  total: Number
};

const Subject = mongoose.model("subject", subjectsSchema);

// const defaultSubject = new Subject({
//   subjectName: "Software Engineering",
//   present: 9,
//   total: 10
// });
//
// defaultSubject.save();

app.get("/", function(req, res){
  Subject.find({}, function(err, results){
    if(err){
      console.log(err)
    }else{
      res.render("home", {subjectList: results});
    }
  });
});

app.post("/", function(req, res){
  console.log(req.body.button)
});

app.listen(3000, function(){
  console.log("server is up and running");
});
