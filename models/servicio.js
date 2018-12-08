const mongoose = require('mongoose');
const { Schema} = mongoose;
require('mongoose-type-email');
const SistemaSchema = require('./sistema');
const Moneda = require('./moneda');

const ServicioSchema = new Schema({
  nombre: { type: String, required: true},
  descripcion: String,
  costo: {type: Number, min: 0, default: 0},
  moneda: {type: Schema.Types.ObjectId, ref: 'Moneda'},
  sistema: SistemaSchema
});

/*
ServicioSchema.pre('findOne', () =>{
  console.log('** populate findByid servicio');
  if (this.sistema.usuarioCreador) {
    console.log('**** populate servicio usuarioCreador');
    this.populate('sistema.usuarioCreador');
  }
  if (this.sistema.usuarioAsignado) {
    console.log('**** populate servicio usuarioCreador');
    this.populate('sistema.usuarioAsignado');
  }
  if (this.moneda) {
    this.populate('moneda');
  }
});
*/

/*ServicioSchema.pre('find', () =>{
  console.log("pre find servicios");
  if (this.sistema.usuarioCreador) {
    this.populate('sistema.usuarioCreador');
  }
  if (this.sistema.usuarioAsignado) {
    this.populate('sistema.usuarioAsignado');
  }*/
  /*if (this.moneda) {
    this.populate('moneda');

});}*/

module.exports = mongoose.model('Servicio', ServicioSchema);
