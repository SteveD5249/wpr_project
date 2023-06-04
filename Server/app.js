require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const KEY = process.env.KEY;
const fetch = require('node-fetch');

app.get('/weather/:zipCode', async (req, res) => {
    const zipCode = req.params.zipCode;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},ZA&appid=${KEY}&units=metric`);
    const data = await response.json();
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server currently listening on port ${PORT}`)
});