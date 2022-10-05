export const signUpPath = {
  post: {
    tags: ['FIT'],
    summary: 'Cria uma nova FIT',
    description: 'Usuários autorizados: eng_analista',
    requestBody: {
      description:
        'Os nomes das imagens ( files ) são dinâmicos, o index indica a qual Workstation a imagem pertence.',
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
