const express = require('express');
const app = express();
const port = 3000;

app.get('/board/page/:page', (req, res) => res.send(`This is page #${req.params.page}`));

app.listen(port, () => console.log(`Server listening on port ${port}!`));