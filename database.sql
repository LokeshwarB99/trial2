create database employeedatabase;

create table employees(
    serial_id serial primary key,
    emp_id varchar(20),
    name varchar(30),
    dob varchar(15),
    address varchar(255),
    salary varchar(10)
);