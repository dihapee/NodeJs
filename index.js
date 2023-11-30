const express = require('express')//import express fw
const app = express()//spusteni expresu
const port = 80//definovani portu
const path = require('path');//pro manipulaci s cestami, ať už se jedná o absolutní cesty, relativní cesty
const bodyParser = require('body-parser');//imort bodyParseru
app.use(bodyParser.urlencoded({ extended: false }));//dekoduje data poslana pres POST



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "192.168.1.161",
  user: "sasa.palkyn",
  password: "erigo_32/",
  database: "sasa.palkyn",
  port: 3001 // This should be removed from here and specified in the host string
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/newuser', (req, res) => {

  res.render('newuser');

})


app.post('/createuser', function (request, response, next) {
  console.log(request.body)
    // SQL dotaz pro vložení dat do databáze
    var sql = `INSERT INTO new_table (fname, lname, age) VALUES ('${request.body.fname}', '${request.body.lname}', '${request.body.age}')`;
   
    con.query(sql, (error, results, fields) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(results);
    })
    response.send(`Uživatele byli vloženi do DB`)
   
  })

  app.post('/deleteuser', function (request, response, next) { 
    console.log("log"+request.body.userID); 
    const userId = request.body.userID; 
    const sql = `DELETE FROM new_table WHERE ID='${userId}'`; 
  
    con.query(sql, (error, results, fields) => { 
       if (error) { 
          console.error(error); 
          return; 
       } 
  
       if (results.affectedRows > 0) { 
          console.log(`User with ID ${userId} deleted`); 
          response.redirect('http://localhost/?'); 
       } else { 
          console.error(`User with ID ${userId} not found`); 
          response.status(404).send(`Uživatel nenalezen`); 
       } 
    }); 
 });




app.get('/', (req, res) => {//home routa

    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM new_table", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          res.render('index', { result });
        });
      });

})

app.listen(port, () => {//spustni serveru
  console.log(`Example app listening on port ${port}`)
})

