export const signUpParamsSchema = {
  type: 'object',
  properties: {
    product_code: {
      type: 'string',
    },
    product_description: {
      type: 'string',
    },
    client: {
      type: 'string',
    },
    process: {
      type: 'string',
    },
    date: {
      type: 'date',
      pattern: /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/,
      example: '2019-05-17',
    },

    Controller_attention_point: {
      type: 'array',
      items: {
        $ref: '#/schemas/controller_attention_point',
      },
    },
    Workstations: {
      type: 'array',
      items: {
        $ref: '#/schemas/workstations',
      },
    },
    img_layout_path: {
      type: 'array',
      items: {
        type: 'file',
        name: 'img_layout_path',
      },
    },
  },
  required: [
    'product_code',
    'product_description',
    'client',
    'process',
    'date',
    'Controller_attention_point',
    'Workstations',
    'img_layout_path',
  ],
}
