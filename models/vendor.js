const mongoose = require('mongoose');
const { Schema, SchemaTypes} = mongoose;
require('mongoose-type-email');
const SistemaSchema = require('./sistema');
const Hotel = require('./hotel');
const CuentaBancariaSchema = require('./cuentasBancarias');
const FileSchema = require('./file');

const VendorSchema = new Schema({
  id: Schema.Types.ObjectId,
  crmid: { type: String, required: true, index: { unique: true }},
  nombre: String, // nombre crm
  hoteles: [{ type: Schema.Types.ObjectId, ref: 'Hotel'}],
  email: SchemaTypes.Email, // email crm
  telefono: String, // email crm
  cuentaBancaria: CuentaBancariaSchema,
  contrato: FileSchema,
  cargoPromociones: FileSchema,
  descripcion: String,
  sistema: SistemaSchema
});

VendorSchema.pre('findOne', () => {
  this.populate('hoteles');
  // this.populate('cuentaBancaria');
  // this.populate('sistema');
});

module.exports = mongoose.model('Vendor', VendorSchema);
