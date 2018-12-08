const mongoose = require('mongoose');
const { Schema, SchemaTypes} = mongoose;
require('mongoose-type-email');
const CuentaBancariaSchema = require('./cuentasBancarias');
const Region = require('./region');
const Habitacion = require('./habitacion');
const Servicio = require('./servicio');
const Penalidad = require('./panalidad');
const SistemaSchema = require('./sistema');

const HotelSchema = new Schema({
  nombre: { type: String, required: true, index: { unique: true }},
  segmeto: {type: String, enum: ['Adulto', 'Familias', 'LGTB']},
  habitaciones: [{type: Schema.Types.ObjectId, ref: 'Habitacion'}],
  servicios: [{type: Schema.Types.ObjectId, ref: 'Servicio'}],
  serviciosNoIncluidos: [{type: Schema.Types.ObjectId, ref: 'Servicio'}],
  penalidades: [{type: Schema.Types.ObjectId, ref: 'Penalidad'}],
  region: {type: Schema.Types.ObjectId, ref: 'Region'},
  regimenAlimentacion: [
    {
      nombreRegimen: String,
      descripcion: String
    }
  ],
  tipoPlan: [{
    nombrePlna: String,
    descripcion: String
  }],
  tipoTarifa: [{
    tipoHabitacion: {type: Schema.Types.ObjectId, ref: 'Habitacion'},
    numPersonas: Number,
    tipo: {type: String, enum: ['Habitacion', 'Personas']},
    monto: Number
  }],
  email: {
    pagos: SchemaTypes.Email,
    reservas: SchemaTypes.Email,
    jefeReservas: SchemaTypes.Email,
  },
  telefonos: {
    pagos: String,
    reservas: String,
    jefeReservas: String,
  },
  ejecutivoVentas: {
    nombre: String,
    telefono: String,
    email: SchemaTypes.Email
  },
  cuentaBancaria: CuentaBancariaSchema,
  descripcion: String,
  sistema: SistemaSchema
});

HotelSchema.pre('findOne', () =>{
  this.populate('habitaciones');
  this.populate('servicios');
  this.populate('serviciosNoIncluidos');
  this.populate('penalidades');
  this.populate('region');
  // this.populate('cuentaBancaria');
  // this.populate('sistema');
});

HotelSchema.pre('find', () =>{
  this.populate('habitaciones');
  this.populate('servicios');
  this.populate('serviciosNoIncluidos');
  this.populate('penalidades');
  this.populate('region');
  // this.populate('cuentaBancaria');
  // this.populate('sistema');
});

module.exports = mongoose.model('Hotel', HotelSchema);
