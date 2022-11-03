export const requirements_and_specifications = {
  type: 'object',
  properties: {
    requirements: {
      type: 'string',
    },
    specifications: {
      type: 'string',
    },
  },
  required: ['requirements', 'specifications'],
}
