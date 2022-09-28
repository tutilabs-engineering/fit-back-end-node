export const signUpPath = {
  post: {
    tags: ['FIT'],
    summary: 'API para criar uma nova Fit',
    description:
      'Essa rota pode ser executada por apenas usuários: **eng_analista**',
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
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/account',
            },
          },
        },
      },
      400: {
        $ref: '#/components/badRequest',
      },
      // 403: {
      //   $ref: '#/components/forbidden',
      // },
      404: {
        $ref: '#/components/notFound',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
}
