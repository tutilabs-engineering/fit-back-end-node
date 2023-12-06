import { MissingParamError } from '../../presentation/errors/missing-param-error'
import { Validation } from '../../presentation/models/validation'

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}
  async validate(input: any): Promise<Error> {
    const body = input.body.data ? JSON.parse(input.body.data) : input.body
    const header = Object.assign({
      body: {
        mold: body.mold,
        client: body.client,
        date: body.date,
        product_code: body.product_code,
        process: body.process,
        product_description: body.product_description,
        Workstations: input.body.data
          ? body.Workstations
          : JSON.parse(body.Workstations),
        Controller_attention_point: input.body.data
          ? body.Controller_attention_point
          : JSON.parse(body.Controller_attention_point),
      },
    })
    if (!header.body[this.fieldName]) {
      console.log(header.body[this.fieldName])
      return new MissingParamError(this.fieldName)
    }
    const workstations = Object.assign(header.body.Workstations)
    for (const workstation of workstations) {
      if (workstation.typeWorkstation === 'update') {

        if (workstation.used_tools === undefined) {
          return new MissingParamError(this.fieldName)
        } else if (workstation.safety === undefined) {
          return new MissingParamError(this.fieldName)
        } else if (workstation.materials === undefined) {
          return new MissingParamError(this.fieldName)
        } else if (workstation.devices === undefined) {
          return new MissingParamError(this.fieldName)
        } else if (workstation.specifics_requirements_client === undefined) {
          workstation.specifics_requirements_client = 'Não possui';
        } else if (workstation.Image_operation === undefined) {
          return new MissingParamError(this.fieldName)
        } else if (workstation.Image_package_description === undefined) {
          return new MissingParamError(this.fieldName)
        } else if (workstation.Image_final_product === undefined) {
          return new MissingParamError(this.fieldName)
        }
      } else {
        if (workstation.Used_tools === undefined) {
          return new MissingParamError(this.fieldName)
        } else if (workstation.Safety === undefined) {
          return new MissingParamError(this.fieldName)
        } else if (workstation.materials === undefined) {
          return new MissingParamError(this.fieldName)
        } else if (workstation.Devices === undefined) {
          return new MissingParamError(this.fieldName)
        } else if (workstation.specifics_requirements_client === undefined) {
          workstation.specifics_requirements_client = 'Não possui';
        } else if (workstation.Images_operations === undefined) {
          return new MissingParamError(this.fieldName)
        } else if (workstation.Images_package_description === undefined) {
          return new MissingParamError(this.fieldName)
        } else if (workstation.Images_final_product === undefined) {
          return new MissingParamError(this.fieldName)
        }
      }
    }
  }
}
