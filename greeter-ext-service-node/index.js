require("dotenv").config();
const express = require('express');
const axios = require('axios');
const port = process.env.PORT || 3001
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/:name', (req, res) => {
    let name = req.params.name;
    if (name) {
        let serviceUrl = `${process.env.HELLO_K8S_NODE_APP}${name}`;
        console.log(`Calling ${serviceUrl}`);

        axios.get(serviceUrl)
        .then((response) => {
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
        });
        res.json({
            message: `You entered ${name.toUpperCase()}`
        });
    } else {
        res.statusCode = 400;
        res.json({
            message: 'We are facing some internal error at this moment.'
        });
    }
});

app.get('/', (req, res) => {
    res.json({
        message: 'Hello from Greeter Service'
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});