import { Validation } from '../../presentation/models/validation'

export class ValidationComposite implements Validation {
  constructor(private readonly validations: Validation[]) {}
  async validate(input: any): Promise<Error> {
    for (const validate of this.validations) {
      const error = validate.validate(input)
      if (error) {
        return await error
      }
    }
  }
}
