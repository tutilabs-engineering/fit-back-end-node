export const updateFit = {
  put: {
    tags: ['FIT'],
    summary: 'Atualiza FIT específica',
    description: 'Usuários autorizados: eng_analista',
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
    requestBody: {
      description:
        'Os nomes das imagens ( files ) são dinâmicos. O index indica a qual Workstation a imagem pertence.',
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
