const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./connection');
const mqttClient = require('./mqttConnection');
const router = require('./router');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = 3002;

app.use('/', router);

app.listen(port, () => {
    console.log(`Server đang lắng nghe tại http://localhost:${port}`);
});