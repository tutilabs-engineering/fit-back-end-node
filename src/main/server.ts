import { PrismaHelper } from '../infra/data-mysql/prisma-helper'

PrismaHelper.prisma
  .$connect()
  .then(async () => {
    const { setupApp } = await import('./config/app')
    const app = await setupApp()
    app.listen(process.env.PORT_SERVER, () =>
      console.log(
        `Server running at http://localhost:${process.env.PORT_SERVER}`
      )
    )
  })
  .catch(console.error)
