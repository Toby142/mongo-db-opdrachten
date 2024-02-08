const http = require('http');
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

const hostname = '127.0.0.1';
const port = 3000;

// MongoDB connection URI
const uri = 'mongodb://localhost:27017/Kookboek'; // Change this URI according to your MongoDB setup

const client = new MongoClient(uri);

// Connect to MongoDB
client.connect().then(() => {
    console.log('Connected to MongoDB');

    const server = http.createServer((req, res) => {
        if (req.url === '/') {
            fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
                if (err) {
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Internal Server Error');
                } else {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(data);
                }
            });
        } else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('404 Not Found');
        }
    });

    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });

}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});
