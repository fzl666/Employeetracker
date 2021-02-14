var mysql = require("mysql");
var express = require("express");
const cTable = require("console.table");
var inquirer = require("inquirer");
const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: "localhost",
  post: "3306",
  password: "songluwenxi",
  database: "EmployeesDB",
  user: "root",
});
start();
function start() {
  var ask1 = inquirer
    .prompt([
      {
        name: "do",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View all Departments",
          "View all Employees",
          "View all roles",
          "Add Employee",
          "Remove employee",
,
        ],
      },
    ])
    .then((answer) => {
      switch (answer.do) {
        case "View all Departments":
          connection.query(
            "SELECT * FROM department",
            function (err, response) {
              var table = cTable.getTable(response);
              console.log(table);
              start();
            }
          );
          break;
        case "View all Employees":
          connection.query("SELECT * FROM employee", 
          function (err, response) {
            var table = cTable.getTable(response);
            console.log(table);
            start();
          });
          break;
          case "View all roles":
          connection.query("SELECT * FROM role", 
          function (err, response) {
            console.log(response)
            var table = cTable.getTable(response);
            console.log(table);
            start();
          });
          break;
        case "Add Employee":
          var roles = [];
          var employees = [];
          connection.query("SELECT * FROM employee", function (err, response) {
            connection.query("SELECT * FROM role", function (err, res) {
              console.log(res);
              console.log(response);
              for (i = 0; i < res.length; i++) {
                roles.push({ name: res[i].title, value: res[i].id });
              }
              for (i = 0; i < response.length; i++) {
                employees.push({
                  name: response[i].first_name+response[i].last_name,
                  value: response[i].id,
                });
              }
              var addq = inquirer.prompt([
                {
                  name: "first_name",
                  type: "text",
                  message: "First name?",
                },
                {
                  name: "last_name",
                  type: "text",
                  message: "Last name?",
                },
                {
                  name:'Role',
                  type:'list',
                  message:"Employee's role?",
                  choices:roles
                },
                { 
                name:'Manager',
                type:'list',
                message:"Employee's Manager?",
                choices: employees
            }
              ]).then((answer) => {
                  console.log(answer)

                 connection.query("INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)", [answer.first_name,answer.last_name,answer.Role,answer.Manager],function (err, response) {
              //var table = cTable.getTable(response);
              console.log(response);
            start();
              });  }); 
            });
          });
          break;
          case "Remove employee":
            var employees =[]
            connection.query("SELECT * FROM employee", function (err, res) {
                for (i = 0; i < res.length; i++) {
                    employees.push({
                      name: res[i].first_name+res[i].last_name,
                      value: res[i].id,
                    })
                    
                  }
                rm = inquirer.prompt([
                {
                name: "remove",
                type: "list",
                message: "Choose employee to remove:",
                choices: employees,
                 },
            ]).then((answer)=>{
                console.log(answer.remove)
               connection.query('DELETE FROM employee WHERE id = ?',answer.remove,function (err, response) {
                   console.log(response);
                  start()});
            })
                })
                  

            break;



      }
    });
  
}
