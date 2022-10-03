export const signUpPath = {
  post: {
    tags: ['FIT'],
    summary: 'Cria uma nova FIT',
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
    security: [
      {
        bearerAuth: [{}],
      },
    ],
    responses: {
      200: {
        $ref: '#/components/success',
      },
      400: {
        $ref: '#/components/badRequest',
      },
      401: {
        $ref: '#/components/unauthorized',
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
