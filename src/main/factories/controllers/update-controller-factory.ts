import { UpdateFitControler } from '../../../presentation/Controllers/update-fit-controller'
import { Controller } from '../../../presentation/models/controller'
import { makeDbUpdateFit } from '../usecases/update-fit-factory'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeUpdateFitController = (): Controller => {
  const controller = new UpdateFitControler(
    makeSignUpValidation(),
    makeDbUpdateFit()
  )
  return controller
}
