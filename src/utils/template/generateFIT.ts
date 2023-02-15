import handlebars from "handlebars"
import { FitModel } from "../../domain/models/fit"
import { join, resolve } from "path"
import puppeteer from 'puppeteer';
import { readFileSync } from "fs"
import fitpdf from "../template/fitpdfmodelvreal.json"
import fs from "fs"
import sharp from "sharp"
import { Request, Response } from "express";

const compileTemplate = async (data: FitModel) => {
    const filePath = join(process.cwd(), "src", "utils", "template", "fitpdf.hbs")
    return handlebars.compile(filePath)(data)
}

async function modifyStructureFIT(data: FitModel) {
    const workstationsCompleto = data.Workstation
    await Promise.all(
        await workstationsCompleto.map((item) => {
            item["fit"] = {
                id_fit: data.id,
                code_mold: data.code_mold,
                mold: data.mold,
                product_code: data.product_code,
                product_description: data.product_description,
                client: data.client,
                process: data.process,
                date_fit: data.date,
                Attention_point_control: data.Attention_point_control,
                Homologation: data.Homologation
            }

            item.fit.Homologation[0].user_created = JSON.parse(item.fit.Homologation[0].user_created)

            item.fit.Homologation[0].user_homologation = JSON.parse(item.fit.Homologation[0].user_homologation)
        }))
    await Promise.all(

        await workstationsCompleto.map(async (item) => {
            const medalPath = join(process.cwd(), "uploads", "fit-img", item.img_layout_path)
            item["meta_layout"] = fs.readFileSync(medalPath, "base64")
            // item["meta_layout"] = Buffer.from(await sharp(medalPath) // Executamos o SHARP na imagem que queremos comprimir
            //     .resize({
            //         height: 600, width: 600, fit: "contain", background: {
            //             b: 255, g: 255, r: 255
            //         }
            //     }) //Redimensionamos para o tamanho (se não receber esse parâmetro, não redimensiona
            //     .toFormat('webp') // Forçamos a conversão esse arquivo para webp
            //     .webp({ // Comprimimos, setando uma qualidade
            //         quality: 100
            //     })
            //     .toBuffer()).toString('base64')


            await item.Image_final_product.map(async (item2) => {
                const medalPath = join(process.cwd(), "uploads", "fit-img", item2.img_path)
                const log = compressImage(medalPath, 20)

                item2['meta'] = fs.readFileSync(medalPath, "base64")


            })
            await item.Image_package_description.map(async (item2) => {
                const medalPath = join(process.cwd(), "uploads", "fit-img", item2.img_path)
                const log = compressImage(medalPath, 20)

                item2['meta'] = fs.readFileSync(medalPath, "base64")


            })
            await item.Image_operation.map(async (item2) => {
                const medalPath = join(process.cwd(), "uploads", "fit-img", item2.img_path)
                // const log = compressImage(medalPath, 20)

                item2['meta'] = fs.readFileSync(medalPath, "base64")


            })
        })
    )



    return workstationsCompleto

}



async function generatePDF(request: Request, response: Response) {

    const fitObject = await modifyStructureFIT(fitpdf)

    // return response.json(fitObject).status(201)

    const templatePath = resolve(process.cwd(), "src", "utils", "template", "fitpdf.hbs")

    const templateFile = await fs.promises.readFile(templatePath, {
        encoding: 'utf-8',
    });


    const parseTemplate = await handlebars.compile(templateFile);


    const parsedHTML = await parseTemplate({ Workstation: fitObject });

    const browser = await puppeteer.launch({
        headless: false,
        args: ['--disable-dev-shm-usage']
    });

    const page = await browser.newPage();

    await page.setContent(parsedHTML);

    await page.setDefaultNavigationTimeout(0);

    await page.emulateMediaType('screen');

    const pdfBuffer = await page.pdf({
        format: 'A4',
        landscape: true,
        printBackground: true,
        timeout: 0,
        preferCSSPageSize: true,
        path: process.cwd ? "./cert.pdf" : null

    });

    fs.writeFileSync(resolve(process.cwd(), "src", "utils", "template", "teste.pdf"), pdfBuffer)


    await browser.close();

    response.setHeader('Content-type', 'application/pdf');

    response.end(Buffer.from(pdfBuffer));

}

async function compressImage(path: string, size: number) {

    // Pegamos o PATH antigo e fazemos um tratamento com ele, para mudar a extensão do arquivo.
    // const newPath = file.path.split('.')[0] + '.webp';


    const image = await sharp(path) // Executamos o SHARP na imagem que queremos comprimir

        .resize({
            height: 600, width: 600, fit: "contain", background: {
                b: 255, g: 255, r: 255
            }
        }) //Redimensionamos para o tamanho (se não receber esse parâmetro, não redimensiona

        .toFormat('webp') // Forçamos a conversão esse arquivo para webp

        .webp({ // Comprimimos, setando uma qualidade
            quality: 45
        })

        .toBuffer() // Transformamos esse arquivo em um Buffer
    return Buffer.from(image).toString('base64');
    return image

}

export { generatePDF }

