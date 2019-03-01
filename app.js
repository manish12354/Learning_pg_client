const express = require("express");
const cookieParser = require('cookie-parser');
const Transaction = require('pg-transaction')
const { Client } = require('pg')
const app = express();
app.use(express.urlencoded({
  extended: false
}));
const serveIndexPage = function(req, res) {
  res.redirect("./index.html");
}

const getQuery = function(tableName){
  return `SELECT * FROM ${tableName};`;
}

const kill = function(err){
  // tx.rollback();
  // throw new Error();
  console.log("Fat gya...");
}

const showTable = function(req,res){
  const defaultCs = 'postgres://localhost:5432/manishy';
  const connectionString = process.env.DATABASE_URL||defaultCs;
  const client = new Client({connectionString});

var tx = new Transaction(client);
tx.on('error', kill);

  let query = {
    text:
    "SET search_path to step_library;"
    +getQuery(req.body.tableName)
  };

  client.connect();
  client.query(query, (err, response) => {
    tx.begin();
    let selectQueryResult;
    if (err) {
      tx.rollback();
      res.send("Invalid Data")
      console.log(err.stack)
    } else {
      selectQueryResult = response.filter((element)=>{
        return element.command=="SELECT";
      }).map((element=>{return element.rows}));
      let responseToSend="<br>==================================================<br>";
      for (var i = 0; i < selectQueryResult.length; i++) {
        let element = selectQueryResult[i];
        for (var i1 = 0; i1 < element.length; i1++) {
          responseToSend+=JSON.stringify(element[i1],null,2);
          responseToSend+="<br>==================================================<br>";
        }
      }
      res.send(responseToSend);
    }
    client.end();
  })
}
app.post("/getTable", showTable);

app.use(express.json());
app.use(cookieParser());
app.use(express.static('.'));
module.exports = app;
