const server = require('./server.js');
const port = 5000;

server.get('/', (req, res) => {
    res.send(`Server is running...`);
  });
  
server.listen(port, () => console.log(`server on port: ${port}`));
