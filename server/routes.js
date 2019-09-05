const express = require('express');
const routes = express.Router();
module.exports = routes;

routes.get('/', (req, res) => res.send([{message: 'worsld'}]));
routes.get('/arnie', (req, res) => res.send([{boang: 'kad'}]));