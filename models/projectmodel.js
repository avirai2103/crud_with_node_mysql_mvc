const express = require('express')
const cors = require('cors')
const multer = require('multer')

const sql = require("./db.js");

// constructor
const Project = function(project) {
  this.title=project.title;
  this.descrip=project.descrip;
  this.course=project.course;
  this.category=project.category;
  this.price=project.price;
  this.phone=project.phone;
  this.file = project.filename;

};
const app = express()
app.use(cors())

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, "./public/images")
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
})
const upload = multer({storage})


Project.create = (newProject, result) => {
  sql.query("INSERT INTO project SET ?", newProject, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created course: ", { id: res.insertId, ...newProject });
    result(null, { id: res.insertId, ...newProject });
  });
};

Project.findById = (projectId, result) => {
  sql.query(`SELECT * FROM project WHERE id = ${projectId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found course: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found project with the id
    result({ kind: "not_found" }, null);
  });
};


Project.getAll = result => {
  sql.query("SELECT * FROM project", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Course: ", res);
    result(null, res);
  });
};

Project.updateById = (id, project, result) => {
  sql.query(
    "UPDATE project SET title = ?, descrip = ?,course = ?,category = ?,price = ?,phone = ? WHERE id = ?",
    [project.title, project.descrip,project.course,project.category,project.price,project.phone, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found project with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated course: ", { id: id, ...project });
      result(null, { id: id, ...project });
    }
  );
};

Project.remove = (id, result) => {
  sql.query("DELETE FROM project WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found employee with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted course with id: ", id);
    result(null, res);
  });
};

Project.removeAll = result => {
  sql.query("DELETE FROM project", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} course`);
    result(null, res);
  });
};

module.exports = Project;