import { MissingParamError } from '../../presentation/errors/missing-param-error'
import { Validation } from '../../presentation/models/validation'

export class CompareFieldHomologationValidation implements Validation {
  constructor(private readonly fieldName: string) {}
  async validate(input: any): Promise<Error> {
    return new MissingParamError(null)
  }
}
