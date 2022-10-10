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
      example: '2022-09-02T13:00:26.120Z',
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
    img_operation_path_0: {
      type: 'array',
      items: {
        type: 'file',
        name: 'img_operation_path_0',
      },
    },
    img_package_description_0: {
      type: 'array',
      items: {
        type: 'file',
        name: 'img_description_path_0',
      },
    },
    img_final_product_0: {
      type: 'array',
      items: {
        type: 'file',
        name: 'img_product_path_0',
      },
    },
    img_operation_path_1: {
      type: 'array',
      items: {
        type: 'file',
        name: 'img_operation_path_1',
      },
    },
    img_package_description_1: {
      type: 'array',
      items: {
        type: 'file',
        name: 'img_description_path_1',
      },
    },
    img_final_product_1: {
      type: 'array',
      items: {
        type: 'file',
        name: 'img_product_path_1',
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
    'img_operation_path_0',
    'img_package_description_0',
    'img_final_product_0',
  ],
}
