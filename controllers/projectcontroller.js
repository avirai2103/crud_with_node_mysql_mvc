const Project = require("../models/projectmodel");


// Create and Save a new project
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    // Create a project
    const project = new Project({
        title: req.body.title,
        descrip: req.body.descrip,
        course: req.body.course,
        category: req.body.category,
        price: req.body.price,
        phone: req.body.phone,
        file: req.file.filename
        
    });

    // Save Employee in the database
    Project.create(project, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the project."
        });
        else res.send(data);
    });
};

// Retrieve all employees from the database.
exports.findAll = (req, res) => {
    Project.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving project."
          });
        else res.send(data);
    });
};

// Find a single employee with a employeeId
exports.findOne = (req, res) => {
    Project.findById(req.params.projectId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found project with id ${req.params.projectId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving project with id " + req.params.projectId
            });
          }
        } else res.send(data);
    });
};

// Update an employee identified by the employeeId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }

    Project.updateById(
        req.params.projectId,
        new Project(req.body),
        (err, data) => {
            if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                message: `Not found project with id ${req.params.projectId}.`
                });
            } else {
                res.status(500).send({
                message: "Error updating project with id " + req.params.projectId
                });
            }
            } else res.send(data);
        }
    );
};

// Delete an employee with the specified employeeId in the request
exports.delete = (req, res) => {
    Project.remove(req.params.projectId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found project with id ${req.params.projectId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete project with id " + req.params.projectId
            });
          }
        } else res.send({ message: `project was deleted successfully!` });
    });
};

// Delete all employees from the database.
exports.deleteAll = (req, res) => {
    Project.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all project."
          });
        else res.send({ message: `All project were deleted successfully!` });
    });

};