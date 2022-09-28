export const devices = {
  type: 'object',
  properties: {
    description: {
      type: 'string',
    },
    code: {
      type: 'string',
    },
    quantity: {
      type: 'number',
    },
  },
  required: ['description', 'code', 'quantity'],
}
