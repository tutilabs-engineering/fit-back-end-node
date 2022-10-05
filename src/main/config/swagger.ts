import swaggerDocument from '../docs'
import swaggerUi from 'swagger-ui-express'
import { SwaggerTheme } from 'swagger-themes'
import { Express } from 'express'

const theme = new SwaggerTheme('v3')

const optionsV1 = {
  explorer: true,
  customCss: theme.getBuffer('dark'),
  customSiteTittle: 'Tutilabs FIT',
  customfavIcon: '/assets/favicon.ico',
}

export default (app: Express): void => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, optionsV1)
  )
}
