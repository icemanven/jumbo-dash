const mongoose = require('mongoose');
const { Schema, SchemaTypes} = mongoose;
require('mongoose-type-email');
const SistemaSchema = require('./sistema');

const BaseSchema = new Schema({
  id: Schema.Types.ObjectId,
  sistema: SistemaSchema
});

BaseSchema.pre('findOne', () =>{
  // this.populate('sistema');
});

BaseSchema.pre('find', () =>{
  // this.populate('sistema');
});

module.exports = mongoose.model('Base', BaseSchema);
