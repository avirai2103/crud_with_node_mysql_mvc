const Course = require("../models/course.model");

// Create and Save a new course
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    // Create a course
    const course = new Course({
        coursecode: req.body.coursecode,
        coursename: req.body.coursename
    });

    // Save coursein the database
    Course.create(course, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the course."
        });
        else res.send(data);
    });
};

// Retrieve all course from the database.
exports.findAll = (req, res) => {
    Course.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving course."
          });
        else res.send(data);
    });
};

// Find a single course with a courseId
exports.findOne = (req, res) => {
    Course.findById(req.params.courseId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found course with id ${req.params.courseId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving course with id " + req.params.courseId
            });
          }
        } else res.send(data);
    });
};

// Update an course identified by the courseId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }

    Course.updateById(
        req.params.courseId,
        new Course(req.body),
        (err, data) => {
            if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                message: `Not found course with id ${req.params.courseId}.`
                });
            } else {
                res.status(500).send({
                message: "Error updating course with id " + req.params.courseId
                });
            }
            } else res.send(data);
        }
    );
};

// Delete an course with the specified courseId in the request
exports.delete = (req, res) => {
    Course.remove(req.params.courseId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found course with id ${req.params.courseId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete course with id " + req.params.courseId
            });
          }
        } else res.send({ message: `course was deleted successfully!` });
    });
};

// Delete all course from the database.
exports.deleteAll = (req, res) => {
    Course.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all course."
          });
        else res.send({ message: `All course were deleted successfully!` });
    });

};