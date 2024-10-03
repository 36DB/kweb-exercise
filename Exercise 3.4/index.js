const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index'));

app.post('/login', (req, res) => res.send(Object.keys(req.body).map(k => `${k}: ${req.body[k]}`).join('<br/>')));

app.listen(port, () => console.log(`Server listening on port ${port}!`));