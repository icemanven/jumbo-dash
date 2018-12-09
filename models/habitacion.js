const mongoose = require('mongoose');
const { Schema} = mongoose;
require('mongoose-type-email');
const SistemaSchema = require('./sistema');

const HabitacionSchema = new Schema({
  nombre: { type: String, required: true},
  descripcion: String,
  capacidad: {type: Number, default: 0},
  adulto: {type: Number, default: 0},
  ninos: {type: Number, default: 0},
  inf:{type: Number, default: 0},
  tipoCama: String,
  sistema: SistemaSchema
});

/*HabitacionSchema.pre('findOne', () =>{
  // this.populate('sistema');
});

HabitacionSchema.pre('find', () =>{
  // this.populate('sistema');
});*/

module.exports = mongoose.model('Habitacion', HabitacionSchema);
