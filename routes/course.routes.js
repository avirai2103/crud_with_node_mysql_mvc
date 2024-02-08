module.exports = app => {
    // const employees = require("../controllers/employee.controller.js");
  const course = require("../controllers/coursecontroller");
    // Create a new course
    app.post("/course", course.create);
  
    // Retrieve all course
    app.get("/course", course.findAll);
  
    // Retrieve a single coursewith courseId
    app.get("/course/:courseId", course.findOne);
  
    // Update acourse with courseId
    app.put("/course/:courseId", course.update);
  
    // Delete a course with courseId
    app.delete("/course/:courseId", course.delete);
  
    // Create a new course
    app.delete("/course", course.deleteAll);
  };