import puppeteer from 'puppeteer';
import fs from "fs"
import path from 'path'

interface DocumentFitData{
    id: string,
    product_code: string
}

export class MountPortableDocumentFormat {

    async execute(fit: DocumentFitData, token: string) {
        
        const browser = await puppeteer.launch({ headless: true });
        const page = (await browser.newPage());

        await page.setCookie({name: 'auth._token.local', value: token, domain: '185.209.179.253', path: '/' })
        await page.goto(`http://185.209.179.253:9007/PrintPage?fitId=${fit}`);
        await page.waitForSelector('img')
        
        const pdf = await page.pdf({ format: 'A4' });

        const pdfFilePath = path.join(__dirname, '..', '..', '..','uploads', 'pdf-files', `${fit.product_code}.pdf`);
        
        if (!fs.existsSync(path.dirname(pdfFilePath))) {
            fs.mkdirSync(path.dirname(pdfFilePath), { recursive: true });
        }

        fs.writeFileSync(pdfFilePath, pdf);

        await browser.close();
        return pdf

    }
}


