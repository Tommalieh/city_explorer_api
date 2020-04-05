'use strict'

//So we can use variables from the .env file
require('dotenv').config();

//Getting the express library to create an app
const express = require('express');

//Getting the cors library to handle errors
const cors = require('cors');

//Application Setup
const PORT = process.env.PORT || 4000;
const app = express();



app.listen(PORT, () => console.log(`We're Live on port ${PORT} BB`));