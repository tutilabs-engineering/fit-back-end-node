export const materials = {
  type: 'object',
  properties: {
    sap_code: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    quantity: {
      type: 'number',
    },
  },
  required: ['sap_code', 'description', 'quantity'],
}
