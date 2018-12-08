const { Schema} = require('mongoose');
require('mongoose-type-email');

const FileSchema = new Schema({
  name: String,
  type: String,
  data: Buffer
});

module.exports = FileSchema;
