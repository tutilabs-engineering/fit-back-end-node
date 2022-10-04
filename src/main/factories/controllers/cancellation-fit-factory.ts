import { CancellationFitController } from '../../../presentation/Controllers/cancellation-fit-controller'
import { Controller } from '../../../presentation/models/controller'
import { makeDbCancellationFit } from '../usecases/cancellation-fit-factory'

export const makeCancellationFitController = (): Controller => {
  const controller = new CancellationFitController(makeDbCancellationFit())
  return controller
}
