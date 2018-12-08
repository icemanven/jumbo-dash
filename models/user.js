const mongoose = require('mongoose');
const { Schema} = mongoose;
const Rol = require('./rol');
const SistemaSchema = require('./sistema');

const UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  apikey: { type: String, required: true,index: { unique: true } },
  crmid: { type: String, required: true, index: { unique: true } },
  userInfo: {},
  rol: { type: Schema.Types.ObjectId, ref: 'Rol' },
  sistema: SistemaSchema
});

UserSchema.pre('findById', () =>{
  if (this.rol) {
    this.populate('rol');
  }
  if (this.sistema.usuarioCreador) {
    this.populate({path: 'sistema.usuarioCreador', model: 'SistemaSchema'});
  }
  if (this.sistema.usuarioAsignado) {
    this.populate({path: 'sistema.usuarioAsignado', model: 'SistemaSchema'});
  }
  // this.populate('sistema');
});

UserSchema.post('save', (next) => {
  /*const toUpdate = {};
  if(!this.sistema.usuarioCreador) {
    toUpdate['sistema.usuarioCreador'] = this.id;
  }
  if(!this.sistema.usuarioAsignado) {
    toUpdate['sistema.usuarioAsignado'] = this.id;
  }
  if (toUpdate !== {}) {
    this.updateOne({id: this.id}, { $set: toUpdate}, () => {
      next();
    });
  } else {
    next();
  }*/
});

module.exports = mongoose.model('User', UserSchema);
