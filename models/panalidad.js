const mongoose = require('mongoose');
const { Schema} = mongoose;
require('mongoose-type-email');
const SistemaSchema = require('./sistema');

/*const FechaSchema = new Schema({
  fechasini: {
    type: Date, require: true,
    validate: {
      validator: (v) => {
        return (this.fechaFin && v < this.fechaFin);
      },
      message: props => `${props.value} Debe ser menor que la fecha fin!`
    }
  },
  fechaFin: { type: Date,
    validate: {
      validator: (v) => {
        return (v > this.fechasini);
      },
      message: props => `${props.value} Debe ser Mayo que la fecha fin!`
    }
  },
});*/

const FechaSchema = new Schema({
    fechasini: Date,
    fechaFin: Date
});

const PenalidadSchema = new Schema({
    nombre: { type: String, required: true},
    fechas: [FechaSchema],
    cancelacionesDias: Number,
    cargo: String,
    descripcion: String,
    sistema: SistemaSchema
});

/*PenalidadSchema.pre('findOne', () =>{
  // this.populate('sistema');
});

PenalidadSchema.pre('find', () =>{
  // this.populate('sistema');
});*/

module.exports = mongoose.model('Penalidad', PenalidadSchema);
