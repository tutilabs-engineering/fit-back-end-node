import express, { Express } from 'express'
import path from 'path'
export default (app: Express): void => {
  // eslint-disable-next-line n/no-path-concat
  app.use(
    '/img/preview',
    express.static(path.join(__dirname, '/../../../uploads/fit-img'))
  )
}
