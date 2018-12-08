const mongoose = require('mongoose');
const { Schema} = mongoose;
require('mongoose-type-email');
const SistemaSchema = require('./sistema');

const InfoSchema = new Schema({
  nombre: {type: String,require: true, unique: true},
  codigo: {type: String, unique: true},
});

const PaisSchema = new Schema({
  id: Schema.Types.ObjectId,
  info: InfoSchema,
  ciudades: [InfoSchema],
  sistema: SistemaSchema
});

PaisSchema.pre('findOne', () =>{
  // this.populate('sistema');
});

PaisSchema.pre('find', () =>{
  // this.populate('sistema');
});

module.exports = mongoose.model('Pais', PaisSchema);
