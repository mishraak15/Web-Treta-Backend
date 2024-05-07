const express = require("express");
const Employee = require("../model/employe");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let allEmployees = await Employee.find({});
    res.render("home.ejs", { allEmployees });
  } catch (err) {
    console.log(err);
    res.render("error.ejs");
  }
});

router.post("/sortbyname", async (req, res) => {
  try {
    let allEmployees = await Employee.find({}).sort({ employee_name: 1 });
    res.render("home.ejs", { allEmployees });
  } catch (err) {
    console.log(err);
    res.render("error.ejs");
  }
});

router.post("/sortbylastname", async (req, res) => {
  try {
    let allEmployees = await Employee.find({});

    allEmployees.sort((a, b) => {
      if (a.employee_name.split(" ")[1] < b.employee_name.split(" ")[1])
        return -1;
      if (a.employee_name.split(" ")[1] > b.employee_name.split(" ")[1])
        return 1;
      return 0;
    });

    res.render("home.ejs", { allEmployees });
  } catch (err) {
    console.log(err);
    res.render("error.ejs");
  }
});

router.post("/sortbysalary", async (req, res) => {
  try {
    let allEmployees = await Employee.find({}).sort({ employee_salary: 1 });
    res.render("home.ejs", { allEmployees });
  } catch (err) {
    console.log(err);
    res.render("error.ejs");
  }
});

router.post("/sortbyage", async (req, res) => {
  try {
    let allEmployees = await Employee.find({}).sort({ employee_age: 1 });
    res.render("home.ejs", { allEmployees });
  } catch (err) {
    console.log(err);
    res.render("error.ejs");
  }
});

router.post("/deleteemployee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Employee.findByIdAndDelete(id);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.render("error.ejs");
  }
});

router.get("/addemployee", (req, res) => {
  res.render("new.ejs");
});

router.post("/addemployee", async (req, res) => {
  try {
    const { employee_name, employee_age, employee_salary } = req.body;

    let newEmp = new Employee({ employee_name, employee_age, employee_salary });
    await newEmp.save();
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.render("error.ejs");
  }
});

router.post("/search", async (req, res) => {
  try {
    let { search } = req.body;

    search = search.trim();
    let x = search[0].toUpperCase();
    search[0] = x;

    let allEmployees = await Employee.find({employee_name: search });
    res.render("home.ejs", { allEmployees });
  } catch (err) {
    console.log(err);
    res.render("error.ejs");
  }
});

module.exports = router;
