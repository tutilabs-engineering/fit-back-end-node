import { Validation } from '../../../presentation/models/validation'
import { RequiredFieldValidation } from '../../../validator/validators/required-field-validation'
import { ValidationComposite } from '../../../validator/validators/validation-composite'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of [
    'Workstations',
    'Controller_attention_point',
    'mold',
    'client',
    'product_description',
    'product_code',
    'process',
    'date',
  ]) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
