const mongoose = require('mongoose');
const { Schema, SchemaTypes} = mongoose;
require('mongoose-type-email');
const SistemaSchema = require('./sistema');

const DocsSchema = new Schema({
  id: Schema.Types.ObjectId,
  crmPotential: {},
  sistema: SistemaSchema
});

DocsSchema.pre('findOne', () =>{
  // this.populate('sistema');
});

DocsSchema.pre('find', () =>{
  // this.populate('sistema');
});

module.exports = DocsSchema;
