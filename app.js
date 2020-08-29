const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

mongoose.connect('mongodb://localhost:27017/AttendanceManager', {useNewUrlParser: true, useUnifiedTopology: true});

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

app.get("/addSubject", function(req, res){
  res.render("form");
});

app.post("/addSubject", function(req, res){
  const newSubject = new Subject({
    subjectName: req.body.subjectName,
    present: 0,
    total: 0
  });

  newSubject.save();
  res.redirect("/");
});

app.post("/deleteSubject", function(req, res){
  Subject.deleteOne({subjectName: req.body.subject}, function(err){
    if(err){
      console.log(err);
    }
  });

  res.redirect("/");
});

app.post("/present", function(req, res){
  let subjectID = req.body.button;

  Subject.findById(subjectID, function(err, result){
    if(err){
      console.log(err);
    }else{
      result.present += 1;
      result.total += 1;

      result.save();
      res.redirect("/");
    }
  });
});

app.post("/absent", function(req, res){
  let subjectID = req.body.button;

  Subject.findById(subjectID, function(err, result){
    if(err){
      console.log(err);
    }else{
      result.total += 1;

      result.save();
      res.redirect("/");
    }
  });
});

app.listen(3000, function(){
  console.log("server is up and running");
});
