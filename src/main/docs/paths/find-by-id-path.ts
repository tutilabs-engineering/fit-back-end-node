export const findById = {
  get: {
    tags: ['FIT'],
    summary: 'Busca uma FIT específica por ID',
    description: 'Retorna uma única FIT',
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'ID da FIT',
        required: true,
        schema: {
          type: 'number',
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
