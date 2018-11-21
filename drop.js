const { Client } = require('pg');
const client = new Client({
     user: 'manishy',
     database: 'manishy',
     port: 5432,
     host: 'localhost',
     password: null,
     binary: false,
     ssl: false,
     client_encoding: '',
     replication: undefined,
     isDomainSocket: false,
     application_name: undefined,
     fallback_application_name: undefined,
     statement_timeout: false }
   );
client.connect();

const dropQuery ={
  text:
  "DROP SCHEMA IF EXISTS step_library cascade;"
}

client.query(dropQuery, (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    console.log(res);
  }
  client.end();
})
