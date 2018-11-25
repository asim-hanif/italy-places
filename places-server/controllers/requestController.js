const https = require('https');
const axios = require('axios');

function jsonRequest(req, res) {
    axios.get(req.body.url).then((response) => {        
        res.status(200).json(response.data);
    })
    .catch(error => res.sendStatus(500));
}

module.exports.jsonRequest = jsonRequest;