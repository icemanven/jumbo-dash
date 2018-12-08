const mongoose = require('mongoose');
const { Schema} = mongoose;
require('mongoose-type-email');
const SistemaSchema = require('./sistema');

const MonedaSchema = new Schema({
  id: Schema.Types.ObjectId,
  nombre: { type: String, required: true, index: { unique: true }},
  code: { type: String, required: true, index: { unique: true }},
  simbolo: { type: String, required: true, index: { unique: true }},
  principal: {type: Boolean, unique: true, default: false},
  descripcion: String,
  relacionPrincipal: {type: Number, min: 0, set: (relacion) => {
      if (this.principal === true) {
        return 1;
      } else {
        return relacion;
      }
    }},
  sistema: SistemaSchema
});

MonedaSchema.pre('findOne', () =>{
  // this.populate('sistema');
});

MonedaSchema.pre('find', () =>{
  // this.populate('sistema');
});

MonedaSchema.pre('save', () => {

});

module.exports = mongoose.model('Moneda', MonedaSchema);
