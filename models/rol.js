const mongoose = require('mongoose');
const { Schema } = mongoose;
const SistemaSchema = require('./sistema');

const RolSchema = new Schema({
  id: Schema.Types.ObjectId,
  name: {type: String, require: true, unique: true, enum: ['admin', 'asesor', 'usuario']},
  descripcion: String,
  permisos: [],
  sistema: SistemaSchema
});

RolSchema.pre('findOne', () =>{
  // this.populate('sistema');
});

RolSchema.pre('find', () =>{
  // this.populate('sistema');
});

module.exports = mongoose.model('Rol', RolSchema);
