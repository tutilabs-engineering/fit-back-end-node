import { Validation } from '../../../presentation/models/validation'
import { RequiredHomologationFit } from '../../../validator/validators/required-homologated-fit-validation'
import { ValidationComposite } from '../../../validator/validators/validation-composite'

export const makeVersioningValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new RequiredHomologationFit())
  return new ValidationComposite(validations)
}
