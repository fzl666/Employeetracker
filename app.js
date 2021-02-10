var mysql = require("mysql")
 var express = require('express')
 const cTable = require('console.table')
 
 const app = express()
 const port = 3000
 const connection = mysql.createConnection({
     host:'localhost',
     post:'3306',
     password:'songluwenxi',
     database:'EmployeesDB',
     user:'root'
 
 })
 
 connection.query("SELECT * FROM employee", function(err,response){
 var table=cTable.getTable(response)
 console.log(table)
 //id  first_name  last_name  title               department   salary   manager

})
