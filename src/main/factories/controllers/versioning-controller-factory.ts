import { VersioningFitController } from '../../../presentation/Controllers/versioning-fit-controller'
import { Controller } from '../../../presentation/models/controller'
import { makeDbVersioningFit } from '../usecases/versioning-fit-factory'
import { makeVersioningValidation } from './versioning-validation'

export const makeVersioningController = (): Controller => {
  return new VersioningFitController(
    makeVersioningValidation(),
    makeDbVersioningFit()
  )
}
