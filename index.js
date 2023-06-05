const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/data', (req, res) => {
    fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (e, data) => {
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  });
});

app.post('/data', async (req, res) => {
  const {time, country, language } = req.body;
  res.render('the_template', [{ time: req.body.time, country: req.body.country, language: req.body.language,}]);

  const jsonData = await fs.readFileSync('data.json', 'utf8');
  const data = JSON.parse(jsonData);
  data.push({ time, country, language });

  fs.writeFileSync('data.json', JSON.stringify(data));

  res.redirect('/')
});

app.listen(3000, ()=>console.log(")"));