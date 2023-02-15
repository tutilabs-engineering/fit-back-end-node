import Client from 'ftp'
import fs from 'fs'
import path from 'path'

const c = new Client()

const __dirname = path.resolve()

c.connect({
  host: '185.209.179.253',
  user: 'tutilabs',
  password: 'L03TeEak7FmjlQ11TPDB401D9KWeAJJdz5tcVEWjXXQ',
  port: 21,
})

export class SendPDFtoFTP {
  async sendPDFtoFTPfunction(product_code: number) {
    try {
      c.on('ready', function () {
        c.put(
          fs.createReadStream(
            path.join(__dirname, `uploads/pdf-files/${product_code}.pdf`)
          ),
          `/my-tests/${product_code}.pdf`,
          function (err: any) {
            if (err) throw err
            c.end()
          }
        )
      })
    } catch (error) {
      console.log(error)
    }
  }
}
