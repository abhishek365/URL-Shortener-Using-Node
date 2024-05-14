const mongoose = require('mongoose');

async function dbConnect(url) {
    mongoose.connect(url);
}

module.exports = {
    dbConnect
};
