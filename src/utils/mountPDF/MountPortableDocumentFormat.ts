// import handlebars from "handlebars"
// import { FitModel } from "../../domain/models/fit"
// import { join, resolve } from "path"
// import puppeteer from 'puppeteer';
// import { readFileSync } from "fs"
// import fs from "fs"
// import sharp from "sharp"
// import { Request, Response } from "express";
// import { SendPDFtoFTP } from "../ftp/ftp";
// import Client from 'ftp'
// import { FitHandlebarsModel } from "../../domain/models/FitHandlebarsModel";

// export class MountPortableDocumentFormat {

//     async execute(fit: FitModel) {


//         const { Workstations } = await modifyStructureFIT(fit)

//         const templatePath = resolve(process.cwd(), "src", "utils", "template", "fitpdf.hbs")

//         const templateFile = await fs.promises.readFile(templatePath, {
//             encoding: 'utf-8',
//         });


//         const parseTemplate = await handlebars.compile(templateFile);


//         const parsedHTML = await parseTemplate({ Workstations });

//         const browser = await puppeteer.launch({
//             headless: false,
//             args: ['--disable-dev-shm-usage']
//         });

//         const page = await browser.newPage();

//         await page.setContent(parsedHTML);

//         await page.setDefaultNavigationTimeout(0);

//         await page.emulateMediaType('screen');

//         const pathFile = resolve(process.cwd(), "uploads", "pdf-files", `${Workstations[0].fit.product_code}.pdf`)

//         const pdfBuffer = await page.pdf({
//             format: 'A4',
//             landscape: true,
//             printBackground: true,
//             timeout: 0,
//             preferCSSPageSize: true,
//             path: process.cwd() ? pathFile : null

//         });


//         // await teste.sendPDFtoFTPfunction(fitObject[0].fit.product_code).finally(() => {
//         //     // fs.unlinkSync(pathFile)
//         // })


//         await browser.close();

//         return pathFile

//     }


// }


// async function modifyStructureFIT(data: FitModel): Promise<FitHandlebarsModel> {
//     const user_created = JSON.parse(JSON.stringify(data.Homologation[0].user_created))
//     const user_homologation = JSON.parse(JSON.stringify(data.Homologation[0].user_homologation))
//     data.Homologation[0].user_created = user_created
//     data.Homologation[0].user_homologation = user_homologation

//     const workstationsCompleto: FitModel["Workstations"] = data.Workstations

//     const workstationsToHandlebars: FitHandlebarsModel["Workstations"] = []

//     await Promise.all(

//         workstationsCompleto.map((item) => {

//             workstationsToHandlebars.push({
//                 ...item,
//                 fit: {
//                     id_fit: data.id,
//                     code_mold: data.code_mold,
//                     mold: data.mold,
//                     product_code: data.product_code,
//                     product_description: data.product_description,
//                     client: data.client,
//                     process: data.process,
//                     date_fit: data.date,
//                     Attention_point_control: data.Attention_point_control,
//                     Controller_attention_point: data.Attention_point_control, // Duplicado, verificar o porque
//                     Homologation: data.Homologation
//                 }
//             })


//         }))
//     await Promise.all(

//         await workstationsToHandlebars.map(async (item) => {
//             const medalPath = join(process.cwd(), "uploads", "fit-img", item.img_layout_path)
//             item["meta_layout"] = fs.readFileSync(medalPath, "base64")


//             await item.Image_final_product.map(async (item2: any) => {
//                 const medalPath = join(process.cwd(), "uploads", "fit-img", item2.img_path)
//                 item2['meta'] = fs.readFileSync(medalPath, "base64")
//             })
//             await item.Image_package_description.map(async (item2: any) => {
//                 const medalPath = join(process.cwd(), "uploads", "fit-img", item2.img_path)
//                 item2['meta'] = fs.readFileSync(medalPath, "base64")
//             })
//             await item.Image_operation.map(async (item2) => {
//                 const medalPath = join(process.cwd(), "uploads", "fit-img", item2.img_path)
//                 item2['meta'] = fs.readFileSync(medalPath, "base64")
//             })
//         })
//     )

//     return { Workstations: workstationsToHandlebars }

// }


