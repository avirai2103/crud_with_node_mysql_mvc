const express = require('express')
const cors = require('cors')
const multer = require('multer')
const project = require('../models/projectmodel');


module.exports = app => {
    // const employees = require("../controllers/employee.controller.js");
//   const course = require("../controllers/coursecontroller");



const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, "./public/images")
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
})
const upload = multer({storage})




  const project = require("../controllers/projectcontroller");
    // Create a new project
    app.post("/project",upload.single('file'), project.create);
  
    // Retrieve all project
    app.get("/project", project.findAll);
    // Retrieve a single project with projectId
    app.get("/project/:projectId", project.findOne);
  
    // Update a project with projectId
    app.put("/project/:projectId", project.update);
  
    // Delete a project with projectId
    app.delete("/project/:projectId", project.delete);
  
    // Create a new project
    app.delete("/project", project.deleteAll);
  };