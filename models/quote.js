const DocsSchema = require('./docs');
const mongoose = require('mongoose');
module.exports =  mongoose.model('Quote', DocsSchema);
