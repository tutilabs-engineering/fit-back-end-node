import * as nodemailer from 'nodemailer'
import * as handlebars from 'handlebars'
import * as fs from 'fs'
import * as path from 'path'

export class SendEmail {
  async sendEmailNewFit() {
    const testAccount = await nodemailer.createTestAccount()
    const filePath = path.join(__dirname, './email-fit/new-fit.hbs')
    const source = fs.readFileSync(filePath, 'utf-8').toString()
    const template = handlebars.compile(source)

    const replacements = {
      id: '4',
      product_code: '4425',
      product_description: 'aqui vai a descrição do produto',
      code_mold: 'MD490',
      mold: 'Molde tal',
      client: 'Yamaha',
      process: 'Injeção',
      date: '10/05/2022',
      // CSS
      all: `margin: 0; border: none; box-sizing: border-box; font-family: 'Roboto', sans-serif;`,
      body: `width: 100vw; height: 100vh; color: #636363;`,
      table_th_td: 'border: 1px solid #636363; border-collapse: collapse;',
      title: `width: 70%; height: 68.8px; text-align: center; font-size: 20.8px;`,
      title_date: `font-size: 16px; font-weight: bold;`,
      subtitle: `height: 68.8px; font-size: 16px;`,
      subtitle_td: `font-weight: 600; padding-left: 20px;`,
      content_td: `padding: 20px; border: none;`,
      content_table: `border: 2px solid #EDEDED; text-align: center; margin-bottom: 2rem;`,
      content_table_th: `border: none; height: 28px;`,
      footer: `border-bottom: 1px solid #000; width: 100%; height: 100px; display: flex; justify-content: space-around; align-items: center;`,
      footer_td: `text-align: right; padding-right: 20px; border: 2px solid transparent;`,
      image: `float: right; width: 167px; height: 50px; background-image: url('/assets/logo.png'); background-size: cover;`,
      imagelabs: `float: right; width: 121px; height: 50px; background-image: url('/assets/tutilabs.png'); background-size: cover;`,
    }
    const hbsToSend = template(replacements)
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    })
    // const transporter = nodemailer.createTransport({
    //   host: 'smtp.office365.com',
    //   port: 587,
    //   auth: {
    //     user: 'yantutilabs@outlook.com',
    //     pass: 'tuti@5045',
    //   },
    // })

    const mailList = ['yantutilabs@outlook.com']

    const mailOptions = {
      from: '"Tutilabs" <yantutilabs@outlook.com>',
      to: mailList,
      subject: 'FIT disponível para Elaboração',
      text: 'Aguardando a criação da Nova FIT\nlink: www.example.com',
      html: hbsToSend,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Message sent: %s', info.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  }

  async sendEmailOnApprovalDepartments() {
    const filePath = path.join(__dirname, './email-fit/on-approval.hbs')
    const source = fs.readFileSync(filePath, 'utf-8').toString()
    const template = handlebars.compile(source)
    const testAccount = await nodemailer.createTestAccount()

    const replacements = {
      id: '4',
      product_code: '4425',
      product_description: 'aqui vai a descrição do produto',
      code_mold: 'MD490',
      mold: 'Molde tal',
      client: 'Yamaha',
      process: 'Injeção',
      date: '10/05/2022',
      // CSS
      all: `margin: 0; border: none; box-sizing: border-box; font-family: 'Roboto', sans-serif;`,
      body: `width: 100vw; height: 100vh; color: #636363;`,
      table_th_td: 'border: 1px solid #636363; border-collapse: collapse;',
      title: `width: 70%; height: 68.8px; text-align: center; font-size: 20.8px;`,
      title_date: `font-size: 16px; font-weight: bold;`,
      subtitle: `height: 68.8px; font-size: 16px;`,
      subtitle_td: `font-weight: 600; padding-left: 20px;`,
      content_td: `padding: 20px; border: none;`,
      content_table: `border: 2px solid #EDEDED; text-align: center; margin-bottom: 2rem;`,
      content_table_th: `border: none; height: 28px;`,
      footer: `border-bottom: 1px solid #000; width: 100%; height: 100px; display: flex; justify-content: space-around; align-items: center;`,
      footer_td: `text-align: right; padding-right: 20px; border: 2px solid transparent;`,
      image: `float: right; width: 167px; height: 50px; background-image: url('/assets/logo.png'); background-size: cover;`,
      imagelabs: `float: right; width: 121px; height: 50px; background-image: url('/assets/tutilabs.png'); background-size: cover;`,
    }
    const hbsToSend = template(replacements)
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    })
    // const transporter = nodemailer.createTransport({
    //   host: 'smtp.office365.com',
    //   port: 587,
    //   auth: {
    //     user: 'yantutilabs@outlook.com',
    //     pass: 'tuti@5045',
    //   },
    // })

    const mailList = ['yantutilabs@outlook.com']

    const mailOptions = {
      from: '"Tutilabs" <yantutilabs@outlook.com>',
      to: mailList,
      subject: 'FIT em processo de Homologação',
      text: 'FIT em processo de homologação aguardando a aprovação dos setores: SESMT, Produção, Qualidade\nlink: www.example.com',
      html: hbsToSend,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Message sent: %s', info.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  }

  async sendEmailOnApprovalEngAdmin() {
    const filePath = path.join(__dirname, './email-fit/on-approval.hbs')
    const source = fs.readFileSync(filePath, 'utf-8').toString()
    const template = handlebars.compile(source)
    const testAccount = await nodemailer.createTestAccount()

    const replacements = {
      id: '4',
      product_code: '4425',
      product_description: 'aqui vai a descrição do produto',
      code_mold: 'MD490',
      mold: 'Molde tal',
      client: 'Yamaha',
      process: 'Injeção',
      date: '10/05/2022',
      // CSS
      all: `margin: 0; border: none; box-sizing: border-box; font-family: 'Roboto', sans-serif;`,
      body: `width: 100vw; height: 100vh; color: #636363;`,
      table_th_td: 'border: 1px solid #636363; border-collapse: collapse;',
      title: `width: 70%; height: 68.8px; text-align: center; font-size: 20.8px;`,
      title_date: `font-size: 16px; font-weight: bold;`,
      subtitle: `height: 68.8px; font-size: 16px;`,
      subtitle_td: `font-weight: 600; padding-left: 20px;`,
      content_td: `padding: 20px; border: none;`,
      content_table: `border: 2px solid #EDEDED; text-align: center; margin-bottom: 2rem;`,
      content_table_th: `border: none; height: 28px;`,
      footer: `border-bottom: 1px solid #000; width: 100%; height: 100px; display: flex; justify-content: space-around; align-items: center;`,
      footer_td: `text-align: right; padding-right: 20px; border: 2px solid transparent;`,
      image: `float: right; width: 167px; height: 50px; background-image: url('/assets/logo.png'); background-size: cover;`,
      imagelabs: `float: right; width: 121px; height: 50px; background-image: url('/assets/tutilabs.png'); background-size: cover;`,
    }
    const hbsToSend = template(replacements)
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    })
    // const transporter = nodemailer.createTransport({
    //   host: 'smtp.office365.com',
    //   port: 587,
    //   auth: {
    //     user: 'yantutilabs@outlook.com',
    //     pass: 'tuti@5045',
    //   },
    // })

    const mailList = ['yantutilabs@outlook.com']

    const mailOptions = {
      from: '"Tutilabs" <yantutilabs@outlook.com>',
      to: mailList,
      subject: 'FIT em processo de Homologação',
      text: 'FIT em processo de homologação aguardando a aprovação da Engenharia\nlink: www.example.com',
      html: hbsToSend,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Message sent: %s', info.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  }

  async sendEmailRejectedFit() {
    const filePath = path.join(__dirname, './email-fit/rejected.hbs')
    const source = fs.readFileSync(filePath, 'utf-8').toString()
    const template = handlebars.compile(source)
    const testAccount = await nodemailer.createTestAccount()

    const replacements = {
      id: '4',
      product_code: '4425',
      product_description: 'aqui vai a descrição do produto',
      code_mold: 'MD490',
      mold: 'Molde tal',
      client: 'Yamaha',
      process: 'Injeção',
      date: '10/05/2022',
      // CSS
      all: `margin: 0; border: none; box-sizing: border-box; font-family: 'Roboto', sans-serif;`,
      body: `width: 100vw; height: 100vh; color: #636363;`,
      table_th_td: 'border: 1px solid #636363; border-collapse: collapse;',
      title: `width: 70%; height: 68.8px; text-align: center; font-size: 20.8px;`,
      title_date: `font-size: 16px; font-weight: bold;`,
      subtitle: `height: 68.8px; font-size: 16px;`,
      subtitle_td: `font-weight: 600; padding-left: 20px;`,
      content_td: `padding: 20px; border: none;`,
      content_table: `border: 2px solid #EDEDED; text-align: center; margin-bottom: 2rem;`,
      content_table_th: `border: none; height: 28px;`,
      footer: `border-bottom: 1px solid #000; width: 100%; height: 100px; display: flex; justify-content: space-around; align-items: center;`,
      footer_td: `text-align: right; padding-right: 20px; border: 2px solid transparent;`,
      image: `float: right; width: 167px; height: 50px; background-image: url('/assets/logo.png'); background-size: cover;`,
      imagelabs: `float: right; width: 121px; height: 50px; background-image: url('/assets/tutilabs.png'); background-size: cover;`,
    }
    const hbsToSend = template(replacements)
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    })
    // const transporter = nodemailer.createTransport({
    //   host: 'smtp.office365.com',
    //   port: 587,
    //   auth: {
    //     user: 'yantutilabs@outlook.com',
    //     pass: 'tuti@5045',
    //   },
    // })

    const mailList = ['yantutilabs@outlook.com']

    const mailOptions = {
      from: '"Tutilabs" <yantutilabs@outlook.com>',
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

const teste = new SendEmail()

teste.sendEmailNewFit().catch(console.error)
teste.sendEmailOnApprovalDepartments().catch(console.error)
teste.sendEmailOnApprovalEngAdmin().catch(console.error)
teste.sendEmailRejectedFit().catch(console.error)
