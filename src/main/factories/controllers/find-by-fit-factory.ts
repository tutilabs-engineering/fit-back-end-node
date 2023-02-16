import { FindByFitController } from '../../../presentation/Controllers/find-by-fit-controller'
import { Controller } from '../../../presentation/models/controller'
import { makeDbFindByFit } from '../usecases/find-by-fit-factory'

export const makeFindByFitController = (): Controller => {

  const controller = new FindByFitController(makeDbFindByFit())
  return controller
}
