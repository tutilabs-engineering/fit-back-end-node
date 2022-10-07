import * as nodemailer from 'nodemailer'
import * as handlebars from 'handlebars'
import * as fs from 'fs'
import * as path from 'path'

export async function sendEmail(email: string, subject: string, url: string) {
  const testAccount = await nodemailer.createTestAccount()
  const filePath = path.join(__dirname, '../../../teste/fit-email/index.html')
  const source = fs.readFileSync(filePath, 'utf-8').toString()
  const template = handlebars.compile(source)
  const replacements = {
    username: 'Umut YEREBAKMAZ',
  }
  const htmlToSend = template(replacements)
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  })
  const mailOptions = {
    from: '"Tutilabs" <tutilabs@tutiplast.com>', // sender address
    to: 'eng_tec@tutiplast.com', // list of receivers
    subject: 'FIT em processo de Homologação', // Subject line
    text: 'FIT em processo de homologação aguardando a aprovação do SESMT, Produção, Qualidade e Engenharia\nlink: www.example.com', // plain text body
    html: htmlToSend,
  }
  const info = await transporter.sendMail(mailOptions)
  console.log('Message sent: %s', info.messageId)
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}

sendEmail('asdf@asdf.com', 'assunto', 'url').catch(console.error)
