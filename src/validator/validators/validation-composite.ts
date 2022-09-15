import { Validation } from '../../presentation/models/validation'

export class ValidationComposite implements Validation {
  constructor(private readonly validations: Validation[]) {}
  validate(input: any): Error {
    for (const validate of this.validations) {
      const error = validate.validate(input)
      if (error) {
        return error
      }
    }
  }
}
