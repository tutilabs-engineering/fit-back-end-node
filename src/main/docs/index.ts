import paths from './paths'
import components from './components'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Tutilabs - Api Ficha de Instrução de Trabalho',
    description:
      'Essa é a documentação da API feita pela equipe Tutilabs para evidenciar os end-points do sistema de Ficha de Instrução de Trabalho vulgo FIT.',
    version: '1.0.0',
    contact: {
      name: 'Phellipe Dinardi',
      email: 'phellipe.dinardi@tutiplast.com.br',
    },
    license: {
      name: 'GPL-3.0-or-later',
      url: 'https://spdx.org/licenses/GPL-3.0-or-later.html',
    },
  },
  externalDocs: {
    description: 'API Report Tryout',
    url: 'http://185.209.179.253:5001/api-docs/',
  },
  servers: [
    {
      url: '/api',
      description: 'Servidor Principal',
    },
  ],
  tags: [
    {
      name: 'FIT',
      description: 'APIs relacionadas a FIT',
    },
  ],
  paths,
  schemas,
  components,
}
