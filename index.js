const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body
//ROUTES//

app.get('/test', (req, res) => {
  res.send('welcome')
})

app.post("/employees", async (req, res) => {
  try {
    const { emp_id, name, dob, address, salary } = req.body;
    const newEmployee = await pool.query(
      "insert into employees(emp_id,name,dob,address,salary) values ($1,$2,$3,$4,$5);",
      [emp_id, name, dob, address, salary]
    );

  } catch (err) {
    console.error(err.message);
  }
});


app.get("/employees", async (req, res) => {
  try {
    const allEmployees = await pool.query("SELECT * FROM employees");
    res.json(allEmployees.rows);
  } catch (err) {
    console.error(err.message);
  }
});


app.get("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await pool.query("SELECT * FROM employees WHERE serial_id = $1", [
      id,
    ]);

    res.json(employee.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { emp_id, name, dob, address, salary } = req.body;
    const updateEmployee = await pool.query(
      "UPDATE employees SET emp_id = $1,name = $2, dob = $3, address = $4, salary = $5 WHERE serial_id = $6",
      [emp_id, name, dob, address, salary, id]
    );

    res.json("Employee was updated!");
  } catch (err) {
    console.error(err.message);
  }
});


app.delete("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteEmployee = await pool.query(
      "DELETE FROM employees WHERE serial_id = $1",
      [id]
    );
    res.json("Employee was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});
app.listen(5000, () => {
  console.log("server has started on port 5000");
});
