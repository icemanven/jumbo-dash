const mongoose = require('mongoose');
const { Schema} = mongoose;
require('mongoose-type-email');
const SistemaSchema = require('./sistema');
const Pais = require('./pais');

const RegionSchema = new Schema({
  id: Schema.Types.ObjectId,
  paises: [{ type: Schema.Types.ObjectId, ref: 'Pais' }],
  destinos: [{type: String, unique: true}],
  descripcion: String,
  sistema: SistemaSchema
});

RegionSchema.pre('findOne', () =>{
  // this.populate('sistema');
  this.populate('Pais');
});

RegionSchema.pre('find', () =>{
  // this.populate('sistema');
  this.populate('Pais');
});


module.exports = mongoose.model('Region', RegionSchema);
