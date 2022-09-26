import { Validation } from '../../../presentation/models/validation'
import { CompareFieldHomologationValidation } from '../../../validator/validators/compare-field-homologation-validation'
// import { RequiredFieldValidation } from '../../../validator/validators/required-field-validation'
import { ValidationComposite } from '../../../validator/validators/validation-composite'

export const makeHomologationValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of [
    'eng_admin',
    'producao_admin',
    'sesmt_admin',
    'qualidade_eng',
  ]) {
    validations.push(new CompareFieldHomologationValidation(field))
  }
  return new ValidationComposite(validations)
}
