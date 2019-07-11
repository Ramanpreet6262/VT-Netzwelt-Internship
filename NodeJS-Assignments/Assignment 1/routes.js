const requestHandler = (req, res) => {
    const url = req.url;

    if (url === "/") {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>1 Ass</title></head>');
        res.write('<body><h1>Hello All!</h1>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Submit</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === "/users") {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>1 Ass</title></head>');
        res.write('<body><ul><li>USER1</li><li>USER2</li><li>USER3</li><li>USER4</li></ul></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === "/create-user") {
        const inputData = [];
        req.on('data', chunk => {
            inputData.push(chunk);
        });
        req.on('end', () => {
            const body = Buffer.concat(inputData).toString();
            console.log(body.split('=')[1]); //username=value_entered_by_user
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
};

module.exports = requestHandler;

// Another syntax to export specially when we are exporting more than one things

// module.exports = {
//     handler: requestHandler,
//     someText: 'some hardcoded text'
// }; 
// For above syntax we will call like this..
//const server = http.createServer(routes.handler);

// Another way to do that

//module.exports.handler = requestHandler;
// For above syntax we will call like this only..
//const server = http.createServer(routes.handler);
//module.exports.someText = 'some text';

// Another way is by omitting module

// exports.handler = requestHandler;
// exports.someText = 'some text';