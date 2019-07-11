//importing core module
const http = require("http");

//importing custom module
const routes = require("./routes");

const server = http.createServer(routes);

server.listen(3000);