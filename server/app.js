const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cloudinary = require('cloudinary');
const morgan = require('morgan');
const compression = require('compression');


const routes = require('./routes');
const app = express();
const router = express.Router();

const url = process.env.MONGODB_URI || "mongodb://localhost:27017/medium";

cloudinary.config({
    cloud_name: "ddseigthn",
    api_key: '227127621877352',
    api_secret: '7Io71sH57SIJTpGoF8TzmsTxlCU'
})


try {
    mongoose.connect(url, {
        // useMongoClient: true
    })
} catch (error) {}

let port = 5000 || process.env.PORT;

app.use(cors());
app.use(compression())
app.use(bodyParser.json());
app.use('/api', router);

app.listen(port, () => {
    console.log(`Server is starting at ${5000}`);
})