import * as nodemailer from 'nodemailer'
import * as handlebars from 'handlebars'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'
import { css } from './css/css'
dotenv.config()

// const testAccount = await nodemailer.createTestAccount()
// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false,
//   auth: {
//     user: testAccount.user,
//     pass: testAccount.pass,
//   },
// });

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export class SendEmail {
  async sendEmailNewFit(
    id: number,
    product_code: string,
    product_description: string,
    code_mold: string,
    mold: string,
    client: string,
    process: string,
    date: string
  ) {
    // const testAccount = await nodemailer.createTestAccount()
    const filePath = path.join(__dirname, './hbs/new-fit.hbs')
    const source = fs.readFileSync(filePath, 'utf-8').toString()
    const template = handlebars.compile(source)
    // const testAccount = await nodemailer.createTestAccount()
    // const transporter = nodemailer.createTransport({
    //   host: 'smtp.ethereal.email',
    //   port: 587,
    //   secure: false,
    //   auth: {
    //     user: testAccount.user,
    //     pass: testAccount.pass,
    //   },
    // })

    const replacements = {
      id,
      product_code,
      product_description,
      code_mold,
      mold,
      client,
      process,
      date,
      // * CSS
      all: css.all,
      body: css.body,
      table_th_td: css.table_th_td,
      title: css.title,
      title_date: css.title_date,
      subtitle: css.subtitle,
      subtitle_td: css.subtitle_td,
      content_td: css.content_td,
      content_table: css.content_table,
      content_table_th: css.content_table_th,
      footer: css.footer,
      footer_td: css.footer_td,
      image: css.image,
      imagelabs: css.imagelabs,
    }
    const hbsToSend = template(replacements)

    const mailList = [
      'yantutilabs@outlook.com',
      // 'rafael.railton@tutiplast.com.br',
    ]

    const mailOptions = {
      from: '"Tutilabs" <tutilabs@tutiplast.com.br>',
      to: mailList,
      subject: 'FIT disponível para Elaboração',
      text: 'Aguardando a criação da Nova FIT\nlink: www.example.com',
      html: hbsToSend,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Message sent: %s', info.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  }

  async sendEmailOnApprovalDepartments(
    id: number,
    product_code: string,
    product_description: string,
    code_mold: string,
    mold: string,
    client: string,
    process: string,
    date: string
  ) {
    const filePath = path.join(__dirname, './hbs/on-approval.hbs')
    const source = fs.readFileSync(filePath, 'utf-8').toString()
    const template = handlebars.compile(source)
    // const testAccount = await nodemailer.createTestAccount()
    // const transporter = nodemailer.createTransport({
    //   host: 'smtp.ethereal.email',
    //   port: 587,
    //   secure: false,
    //   auth: {
    //     user: testAccount.user,
    //     pass: testAccount.pass,
    //   },
    // })

    const replacements = {
      id,
      product_code,
      product_description,
      code_mold,
      mold,
      client,
      process,
      date,
      // * CSS
      all: css.all,
      body: css.body,
      table_th_td: css.table_th_td,
      title: css.title,
      title_date: css.title_date,
      subtitle: css.subtitle,
      subtitle_td: css.subtitle_td,
      content_td: css.content_td,
      content_table: css.content_table,
      content_table_th: css.content_table_th,
      footer: css.footer,
      footer_td: css.footer_td,
      image: css.image,
      imagelabs: css.imagelabs,
    }
    const hbsToSend = template(replacements)

    const mailList = [
      'yantutilabs@outlook.com',
      'rafael.railton@tutiplast.com.br',
    ]

    const mailOptions = {
      from: '"Tutilabs" <tutilabs@tutiplast.com.br>',
      to: mailList,
      subject: 'FIT em processo de Homologação',
      text: 'FIT em processo de homologação aguardando a aprovação dos setores: SESMT, Produção, Qualidade\nlink: www.example.com',
      html: hbsToSend,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Message sent: %s', info.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  }

  async sendEmailOnApprovalEngAdmin(
    id: number,
    product_code: string,
    product_description: string,
    code_mold: string,
    mold: string,
    client: string,
    process: string,
    date: string
  ) {
    const filePath = path.join(__dirname, './hbs/on-approval.hbs')
    const source = fs.readFileSync(filePath, 'utf-8').toString()
    const template = handlebars.compile(source)
    const testAccount = await nodemailer.createTestAccount()
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    })

    const replacements = {
      id,
      product_code,
      product_description,
      code_mold,
      mold,
      client,
      process,
      date,
      // * CSS
      all: css.all,
      body: css.body,
      table_th_td: css.table_th_td,
      title: css.title,
      title_date: css.title_date,
      subtitle: css.subtitle,
      subtitle_td: css.subtitle_td,
      content_td: css.content_td,
      content_table: css.content_table,
      content_table_th: css.content_table_th,
      footer: css.footer,
      footer_td: css.footer_td,
      image: css.image,
      imagelabs: css.imagelabs,
    }
    const hbsToSend = template(replacements)

    const mailList = ['yantutilabs@outlook.com']

    const mailOptions = {
      from: '"Tutilabs" <tutilabs@tutiplast.com.br>',
      to: mailList,
      subject: 'FIT em processo de Homologação',
      html: hbsToSend,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Message sent: %s', info.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  }

  async sendEmailRejectedFit(
    id: number,
    product_code: string,
    product_description: string,
    code_mold: string,
    mold: string,
    client: string,
    process: string,
    date: string
  ) {
    const filePath = path.join(__dirname, './hbs/rejected.hbs')
    const source = fs.readFileSync(filePath, 'utf-8').toString()
    const template = handlebars.compile(source)
    const testAccount = await nodemailer.createTestAccount()
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    })

    const replacements = {
      id,
      product_code,
      product_description,
      code_mold,
      mold,
      client,
      process,
      date,
      // * CSS
      all: css.all,
      body: css.body,
      table_th_td: css.table_th_td,
      title: css.title,
      title_date: css.title_date,
      subtitle: css.subtitle,
      subtitle_td: css.subtitle_td,
      content_td: css.content_td,
      content_table: css.content_table,
      content_table_th: css.content_table_th,
      footer: css.footer,
      footer_td: css.footer_td,
      image: css.image,
      imagelabs: css.imagelabs,
    }
    const hbsToSend = template(replacements)

    transporter.verify(function (error, success) {
      if (error) {
        console.log(error)
      } else {
        console.log('Servidor pronto para receber mensagens')
      }
    })

    const mailList = ['yantutilabs@outlook.com']

    const mailOptions = {
      from: '"Tutilabs" <tutilabs@tutiplast.com.br>',
      to: mailList,
      subject: 'FIT Reprovada',
      text: 'FIT reprovada aguardando uma Nova Elaboração\nlink: www.example.com',
      html: hbsToSend,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Message sent: %s', info.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  }
}
