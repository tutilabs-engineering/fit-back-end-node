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
    mold: {
      type: 'string',
    },
    code_mold: {
      type: 'string',
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
    img_operation_path: {
      type: 'array',
      items: {
        type: 'file',
        name: 'img_operation_path',
      },
    },
    img_package_description: {
      type: 'array',
      items: {
        type: 'file',
        name: 'img_description_path',
      },
    },
    img_final_product: {
      type: 'array',
      items: {
        type: 'file',
        name: 'img_product_path',
      },
    },
  },
  required: [
    'product_code',
    'product_description',
    'client',
    'process',
    'date',
    'mold',
    'code_mold',
    'Controller_attention_point',
    'Workstations',
    'img_layout_path',
    'img_operation_path',
    'img_package_description',
    'img_final_product',
  ],
}
