require("dotenv").config();

const http = require('http');
const qs = require("querystring");
const url = require('url');
const mongoose = require('mongoose');
const Visitors = require('./models/visitor');

const port = process.env.PORT || 3005
const dbUrl = process.env.MONGO_CONNECTION;

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
    console.log(`Database Url ::: ${dbUrl}`);
    if (err) {
        console.log(`${err.message}`);
    } else {
        console.log(`DB Successfully Connected!`);
    }
});


const server = http.createServer((req, res) => {

    if (req.method !== 'GET') handleError(405, res);

    const {pathname, query} = url.parse(req.url);

    if (pathname === '/name') {
        const {name} = qs.parse(query);
        if (name) {
            let visitorDoc = new Visitors();
            visitorDoc.name = name;
            visitorDoc.save(function(err) {
                if (err) {
                    console.log('Visitor save error');
                } else {
                    console.log('Visitor saved successfully');
                }
            })
            res.end(`<h1>You Entered: ${name.toUpperCase()}</h1>`)
        } else {
            res.end("Bad Request");
        }
    }

    if (pathname === '/') {
        res.end(`<h1>Hello k8s</h1>`)
    }

    if (pathname === '/greet') {
        res.end(`<h1>Hello k8s greet</h1>`)
    }
});

function handleError(code, res) {
    res.statusCode = code;
    res.end(`{"error": "${http.STATUS_CODES[code]}"}`);
}

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});