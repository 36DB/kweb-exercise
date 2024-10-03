const express = require('express');
const app = express();
const port = 3000;

const factorial = number =>{
    let answer = 1;
    for(let i = 1; i <= number; i++) {
        answer *= i;
    }
    return answer;
};

app.get('/factorial', (req, res) => res.redirect('/factorial/' + req.query.number.toString()));

app.get('/factorial/:number', (req, res) => res.send(factorial(req.params.number).toString()));

app.listen(port, () => console.log(`Server listening on port ${port}!`));