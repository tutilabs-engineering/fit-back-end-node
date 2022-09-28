export const findById = {
  get: {
    tags: ['FIT'],
    summary: 'Busca FIT por ID',
    description: 'Retorna uma única FIT',
    requestBody: {
      required: true,
      content: {
        'multipart/form-data': {
          schema: {
            $ref: '#/schemas/signUpParams',
          },
        },
      },
    },
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
