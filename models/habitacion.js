const mongoose = require('mongoose');
const { Schema} = mongoose;
require('mongoose-type-email');
const SistemaSchema = require('./sistema');

const HabitacionSchema = new Schema({
  id: Schema.Types.ObjectId,
  nombre: String,
  descripcion: String,
  capacidad: Number,
  adulto: Number,
  ninos: Number,
  inf: Number,
  tipoCama: String,
  sistema: SistemaSchema
});

HabitacionSchema.pre('findOne', () =>{
  // this.populate('sistema');
});

HabitacionSchema.pre('find', () =>{
  // this.populate('sistema');
});

module.exports = mongoose.model('Habitacion', HabitacionSchema);
