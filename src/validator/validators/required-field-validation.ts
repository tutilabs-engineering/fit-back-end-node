import { MissingParamError } from '../../presentation/errors/missing-param-error'
import { Validation } from '../../presentation/models/validation'

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}
  async validate(input: any): Promise<Error> {
    const body = JSON.parse(input.body.data)
    const header = Object.assign({
      body: {
        mold: body.mold,
        client: body.client,
        date: body.date,
        product_code: body.product_code,
        process: body.process,
        product_description: body.product_description,
        Workstations: body.Workstations,
        Controller_attention_point: body.Controller_attention_point,
      },
    })

    if (!header.body[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
    const workstations = Object.assign(header.body.Workstations)
    for (const workstation of workstations) {
      if (workstation.Used_tools === undefined) {
        return new MissingParamError(this.fieldName)
      } else if (workstation.Safety === undefined) {
        return new MissingParamError(this.fieldName)
      } else if (workstation.materials === undefined) {
        return new MissingParamError(this.fieldName)
      } else if (workstation.Devices === undefined) {
        return new MissingParamError(this.fieldName)
      } else if (workstation.specifics_requirements_client === undefined) {
        return new MissingParamError(this.fieldName)
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
