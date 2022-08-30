import { AddFitControler } from '../../../presentation/Controllers/add-fit-controller'
import { Controller } from '../../../presentation/models/controller'
import { makeDbAddFit } from '../usecases/add-fit-factory'

export const makeAddFitController = (): Controller => {
  const controller = new AddFitControler(makeDbAddFit())
  return controller
}
