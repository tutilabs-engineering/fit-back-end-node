export const homologation = {
  put: {
    tags: ['FIT'],
    summary: 'Homologa FIT específica',
    description:
      'Essa rota pode ser executada por apenas usuários: **eng_analista, sesmt, produção e qualidade**',
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
