// import Client from 'ftp'
// import fs from 'fs'
// import path from 'path'



// export class SendPDFtoFTP {
//   private client: Client
//   constructor() { }
//   async sendPDFtoFTPfunction(product_code: number) {
//     this.client = new Client()
//     this.client.connect({
//       host: '185.209.179.253',
//       user: 'tutilabs',
//       password: 'L03TeEak7FmjlQ11TPDB401D9KWeAJJdz5tcVEWjXXQ',
//       port: 21,
//     })

//     const c = this.client

//     const pathFile = path.join(process.cwd(), "uploads", "pdf-files", `${product_code}.pdf`)

//     try {
//       c.on('ready', async function () {
//         c.put(
//           fs.createReadStream(
//             pathFile
//           ),
//           `/my-tests/${product_code}.pdf`,
//           function (err: any) {
//             if (err) throw err
//             c.end()
//             fs.unlinkSync(pathFile)
//           }
//         )

//       })

//     } catch (error) {
//       console.log(error)
//     }
//   }
// }
