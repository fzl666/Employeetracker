DROP DATABASE IF EXISTS EmployeesDB;

CREATE DATABASE EmployeesDB;

USE EmployeesDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
  );
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL(10,2),
  department_id INT,
  PRIMARY KEY (id)
  );
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT NULL,
  PRIMARY KEY (id)
  );
  
SELECT employee.role_id, employee.first_name, employee.last_name,manager_id,role.title,role.salary,role.department_id
FROM employee
INNER JOIN role ON employee.role_id=role.id;



