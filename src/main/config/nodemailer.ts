import nodemailer from 'nodemailer'
// import path from 'path'

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  const testAccount = await nodemailer.createTestAccount()

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  })

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Tutilabs" <tutilabs@tutiplast.com>', // sender address
    to: 'eng_tec@tutiplast.com', // list of receivers
    subject: 'FIT em processo de Homologação', // Subject line
    text: 'FIT em processo de homologação aguardando a aprovação do SESMT, Produção, Qualidade e Engenharia\nlink: www.example.com', // plain text body
    // html: '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="styles.css"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet"><title>Email Técnico</title></head><body><table border="1" width="100%"><tr class="title"><th colspan="2">FIT</th><th colspan="2" class="title">Ficha de Instrução de Trabalho - N°XXX</th><th colspan="2" class="title-date">Data: 30/08/2022</th></tr><tr class="subtitle"><td colspan="6">Status de Nova FIT</td></tr><tr class="content"><td colspan="6" class="content-internal"><table width="100%"><tr style="background-color: #EDEDED;"><th>Cód. Produto</th><th>Desc. Produto</th><th>Cód. Molde</th><th>Molde</th><th>Cliente</th><th>Processo</th><th>Data</th><th>Status</th></tr><tr><td>123.456789-10</td><td>Lorem Ipsum product description</td><td>MD101</td><td>Lorem Ipsum Molde</td><td>Honda</td><td>Injeção</td><td>12/12/2012</td><td style="color: #25c032da; font-weight: bold;">Disponivel para Elaboração</td></tr></table></td></tr></table><div class="footer"><td colspan="6"><div class="image"></div></td><td colspan="6"><div class="footerText">Tutilabs e todas as marcas associadas são marcas da Tutiplast</div></td><td colspan="6"><div class="imageLabs"></div></td></div></body></html>', // html body
    html: {
      path: '../../../teste/fit-email',
    },
    // attachments: [
    //   {
    //     filename: 'mailtrap.png',
    //     path: __dirname + '/mailtrap.png',
    //     cid: 'uniq-mailtrap.png'
    //   }
    // ]
  })

  //   const info = await transporter.sendMail({
  //     from: '"Tutilabs" <tutilabs@tutiplast.com>', // sender address
  //     to: 'eng@tutiplast.com, sesmt@tutiplast.com, prod@tutiplast.com, quality@tutiplast.com', // list of receivers
  //     subject: 'FIT Disponível para Elaboração', // Subject line
  //     text: 'FIT Elaboração', // plain text body
  //     html: '<b>Table</b>', // html body
  //   })

  console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error)
