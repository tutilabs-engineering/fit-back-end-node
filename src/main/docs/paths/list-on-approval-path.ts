export const listOnApproval = {
  get: {
    tags: ['FIT'],
    summary: 'Retorna uma lista de FITs em aprovação',
    description:
      'Essa rota pode ser executada por: eng, sesmt, produção e qualidade',
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
