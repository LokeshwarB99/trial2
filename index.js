const express = require("express");
const app = express();
const cors = require("cors");
// const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body
//ROUTES//
const { Client } = require("pg");

// Retrieve these values from Render's dashboard after setting up your PostgreSQL database
const connectionString =
  "postgres://employeedatabase_hgzl_user:Hjd9oTKygozWimWFc9LkoZn2i8S8ESSe@dpg-cls77djip8as73a4eaog-a.oregon-postgres.render.com/employeedatabase_hgzl"; // Replace with your database URL
const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false }, // For self-signed certificates on Render; adjust for production
});

async function createTable() {
  try {
    await client.connect();

    // SQL query to create a 'users' table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS employees (
        serial_id serial primary key,
        emp_id varchar(20),
        name varchar(30),
        dob varchar(15),
        address varchar(255),
        salary varchar(10)
      );
    `;

    await client.query(createTableQuery);

    console.log('Table "employees" created successfully.');
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

createTable();

app.get("/testfunc", async (req, res) => {
  try {
    res.send("got response from server");
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/test", (req, res) => {
  res.send("welcome");
});

app.get("/testfunc", async (req, res) => {
  try {
    res.send("got response from server");
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/employees", async (req, res) => {
  try {
    const { emp_id, name, dob, address, salary } = req.body;
    const newEmployee = await client.query(
      "insert into employees(emp_id,name,dob,address,salary) values ($1,$2,$3,$4,$5);",
      [emp_id, name, dob, address, salary]
    );
    console.log("Insertion Success");
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/employees", async (req, res) => {
  try {
    const allEmployees = await client.query("SELECT * FROM employees");
    res.json(allEmployees.rows);
    console.log(allEmployees.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await client.query(
      "SELECT * FROM employees WHERE serial_id = $1",
      [id]
    );

    res.json(employee.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { emp_id, name, dob, address, salary } = req.body;
    const updateEmployee = await client.query(
      "UPDATE employees SET emp_id = $1,name = $2, dob = $3, address = $4, salary = $5 WHERE serial_id = $6",
      [emp_id, name, dob, address, salary, id]
    );
    console.log("Updation Success");
    res.json("Employee was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteEmployee = await client.query(
      "DELETE FROM employees WHERE serial_id = $1",
      [id]
    );
    console.log("Deletion Success");
    res.json("Employee was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});
app.listen(5000, () => {
  console.log("server has started on port 5000");
});
