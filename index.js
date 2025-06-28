// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// API de timestamp
app.get("/api/:date?", (req, res) => {
  let dateString = req.params.date;
  let date;

  // Lógica para lidar com diferentes inputs
  if (!dateString) {
    // Testes 7 e 8: Nenhum parâmetro de data fornecido (data atual)
    date = new Date();
  } else {
    // Testes 2, 3, 4, 5, 6: Parâmetro de data fornecido
    // Tenta converter a string para número para verificar se é um timestamp Unix
    if (!isNaN(dateString) && !isNaN(parseFloat(dateString))) {
      date = new Date(parseInt(dateString));
    } else {
      date = new Date(dateString);
    }
  }

  // Verifica se a data é válida
  if (date.toString() === "Invalid Date") {
    // Teste 6: Data inválida
    res.json({ error: "Invalid Date" });
  } else {
    // Testes 2, 3, 4, 5: Data válida
    res.json({
      unix: date.getTime(), // Retorna o timestamp Unix em milissegundos (tipo Number)
      utc: date.toUTCString(), // Retorna a data no formato GMT string
    });
  }
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
