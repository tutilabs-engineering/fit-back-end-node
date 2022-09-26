import { MissingParamError } from '../../presentation/errors/missing-param-error'
import { Validation } from '../../presentation/models/validation'

export class CompareFieldHomologationValidation implements Validation {
  constructor(private readonly fieldName: string) {}
  validate(input: any): Error {
    return new MissingParamError(null)
  }
}
