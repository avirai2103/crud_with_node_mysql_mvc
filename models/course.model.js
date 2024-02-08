const sql = require("./db.js");

// constructor
const Course = function(course) {
  this.coursecode = course.coursecode;
  this.coursename = course.coursename;
};

Course.create = (newCourse, result) => {
  sql.query("INSERT INTO course SET ?", newCourse, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created course: ", { id: res.insertId, ...newCourse });
    result(null, { id: res.insertId, ...newCourse });
  });
};

Course.findById = (courseId, result) => {
  sql.query(`SELECT * FROM course WHERE id = ${courseId}`, (err, res) => {
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

    // not found course with the id
    result({ kind: "not_found" }, null);
  });
};


Course.getAll = result => {
  sql.query("SELECT * FROM course", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Course: ", res);
    result(null, res);
  });
};

Course.updateById = (id, course, result) => {
  sql.query(
    "UPDATE course SET coursecode = ?, coursename = ? WHERE id = ?",
    [course.coursecode, course.coursename, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found course with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated course: ", { id: id, ...course });
      result(null, { id: id, ...course });
    }
  );
};

Course.remove = (id, result) => {
  sql.query("DELETE FROM course WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found course with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted course with id: ", id);
    result(null, res);
  });
};

Course.removeAll = result => {
  sql.query("DELETE FROM course", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} course`);
    result(null, res);
  });
};

module.exports = Course;