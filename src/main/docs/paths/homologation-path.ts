export const homologation = {
  put: {
    tags: ['FIT'],
    summary: 'Homologa FIT específica',
    description:
      'Usuários autorizados: eng_analista, sesmt, produção e qualidade',
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
