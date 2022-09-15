import { MissingParamError } from '../../presentation/errors/missing-param-error'
import { Validation } from '../../presentation/models/validation'

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}
  validate(input: any): Error {
    const header = Object.assign({
      body: {
        mold: input.body.mold,
        client: input.body.client,
        date: input.body.date,
        product_code: input.body.product_code,
        process: input.body.process,
        product_description: input.body.product_description,
        Workstations: input.body.Workstations,
        Controller_attention_point: input.body.Controller_attention_point,
      },
    })
    if (!header.body[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
    const workstations = Object.assign(
      JSON.parse(input.body.Workstations.toString())
    )
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
