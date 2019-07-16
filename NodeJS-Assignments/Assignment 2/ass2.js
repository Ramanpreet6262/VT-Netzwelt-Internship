const express = require('express');

const app = express();

// app.use((req, res, next) => {
//     console.log("In middleware 1");
//     next();
// });

// app.use((req, res, next) => {
//     console.log("In middleware 2");
//     res.send('<h1>kiddan pher!!!</h1>');
// });

app.use('/users', (req, res, next) => {
    console.log("In middleware users");
    res.send('<h1>Users page!!!!</h1>')
});

app.use('/', (req, res, next) => {
    console.log("In middleware default");
    res.send('<h1>default</h1>');
});

app.listen(8080);