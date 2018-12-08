const mongoose = require('mongoose');
const { Schema} = mongoose;
require('mongoose-type-email');
const SistemaSchema = require('./sistema');
const Pais = require('./pais');

const FormaPagoSchema = new Schema(
  {
    tarjetaCredito: {
      disponible: Boolean,
      porcentaje: Number
    },
    transferencia: {
      disponible: Boolean,
      costoTransferencia: Number
    },
    efectivo: {
      disponible: Boolean
    }
  }
);

const CuentaBancariaSchema = new Schema({
  id: Schema.Types.ObjectId,
  razonSocial: String,
  pais: { type: Schema.Types.ObjectId, ref: 'Pais' },
  nombreBeneficiario: String,
  nombreBancoBeneficiario: String,
  numeroCuenta: String,
  tipoCuenta: String,
  aba: String,
  swift: String,
  bancoIntermediario: String,
  cuentaIntermediaria: String,
  formaPago: FormaPagoSchema,
  descripcion: String,
  sistema: SistemaSchema
});

CuentaBancariaSchema.pre('findOne', () =>{
  // this.populate('sistema');
  this.populate('Pais');
});

CuentaBancariaSchema.pre('find', () =>{
  // this.populate('sistema');
  this.populate('Pais');
});

module.exports = CuentaBancariaSchema;
