const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());

app.get('/v1/stock_details', (async (req, res) => {
    const company = req.query.stock;
    if(typeof(company) === 'string') {
            const response = await axios({
                url: 'https://query1.finance.yahoo.com/v8/finance/chart/'+
                        company+
                        '?region=US&lang=en-US&includePrePost=false&interval=2m&range=1d&corsDomain=finance.yahoo.com&.tsrc=finance',
                method: 'get'
            }).then ((response) => {
                res.status(200).send(response.data);
            }).catch ((error) => {
                console.log(error);
                res.status(error.response.status).send(error.message);
            })
            
        
    } else {
        res.status(400).send('Cannot find the company name');
    }
    
}));

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
