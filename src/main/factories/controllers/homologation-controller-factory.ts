import { HomologationFitController } from '../../../presentation/Controllers/homologation-fit-controller'
import { Controller } from '../../../presentation/models/controller'
import { makeHomologationFit } from '../usecases/homologation-fit-factory'
import { makeHomologationValidation } from './homologation-validation-factory'

export const makeHomologationFitController = (): Controller => {
  const controller = new HomologationFitController(
    makeHomologationValidation(),
    makeHomologationFit()
  )
  return controller
}
