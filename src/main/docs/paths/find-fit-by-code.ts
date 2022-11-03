export const findByCode = {
  get: {
    tags: ['FIT'],
    summary: 'Busca uma FIT específica por código do produto e código do molde',
    description: 'Retorna uma única FIT',
    parameters: [
      {
        name: 'product_code',
        in: 'query',
        description: 'Código do produto',
        required: true,
        schema: {
          type: 'string',
        },
      },
      {
        name: 'code_mold',
        in: 'query',
        description: 'Código do molde',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
    responses: {
      200: {
        $ref: '#/components/success',
      },
      400: {
        $ref: '#/components/badRequest',
      },
      403: {
        $ref: '#/components/forbidden',
      },
      // 404: {
      //   $ref: '#/components/notFound',
      // },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
}
