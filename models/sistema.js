const mongoose = require('mongoose');
const { Schema} = mongoose;
require('mongoose-type-email');
const User = require('./user');

const SistemaSchema = new Schema({
  fechaCreacion: Date,
  fechaModificacion: Date,
  usuarioCreador: { type: Schema.Types.ObjectId, ref: 'User',
    set: (usuarioCreador) => {
      this._previousUser = this.usuarioCreador;
      return usuarioCreador;
    } },
  usuarioAsignado: { type: Schema.Types.ObjectId, ref: 'User' }
},
  {
    timestamps: {createdAt: 'fechaCreacion', updatedAt: 'fechaModificacion'}
  });

/*SistemaSchema.pre('findById', () =>{
  console.log('**** populate findByid sistema');
  if (this.usuarioCreador) {
    console.log('****** populate sistema usuarioCreador');
    this.populate('usuarioCreador');
  }
  if (this.usuarioAsignado) {
    console.log('****** populate sistema usuarioCreador');
    this.populate('usuarioAsignado');
  }
});

SistemaSchema.pre('find', () =>{
  this.populate('usuarioCreador');
  this.populate('usuarioAsignado');
});*/

SistemaSchema.pre('save', (next) => {
  const now = new Date();
  this.fechaModificacion = now;
  if ( !this.fechaCreacion ) {
    this.fechaCreacion = now;
  }
  if (this.usuarioCreador) {
    this.usuarioCreador = this._previousUser;
  }
  next();
});

module.exports = SistemaSchema;
