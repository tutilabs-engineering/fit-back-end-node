import cryto from 'crypto'
import { Request } from 'express'
import fs from 'fs'
import mime from 'mime-types'
import multer from 'multer' // Importaremos para realizar o upload
// import path from "path"; // Ajudara no aminho para guardar imagems

class UploadFile {
  // eslint-disable-next-line n/no-path-concat
  private readonly URL = `${__dirname}/../../../uploads/fit-img`

  private storage(): multer.StorageEngine {
    return multer.diskStorage({
      destination: (req, file, cb) => {
        if (!fs.existsSync(this.URL)) {
          fs.mkdirSync(this.URL)
        }
        cb(null, this.URL)
      },
      filename: (req, file, cb) => {
        cryto.randomBytes(16, (_error, hash) => {
          const Name = `${hash.toString('hex')}-${file.originalname}`
          return cb(null, Name)
        })
      },
    })
  }

  private fileFilter() {
    return (
      req: Request,
      file: Express.Multer.File,
      cb: multer.FileFilterCallback
    ) => {
      const type = mime.extension(file.mimetype)
      const conditions = ['.png', '.jpg', '.jpeg']

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      if (conditions.includes(`${type}`)) {
        cb(null, true)
      }
      cb(null, false)
    }
  }

  get getConfig(): multer.Options {
    return {
      storage: this.storage(),
      // fileFilter: this.fileFilter(),
    }
  }
}

export const uploadFile = new UploadFile()
