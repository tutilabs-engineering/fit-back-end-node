import { ListFitByCodeController } from '../../../presentation/Controllers/list-fit-by-code'
import { Controller } from '../../../presentation/models/controller'
import { makeDbListFitByCode } from '../usecases/list-fit-by-code'

export const makeListFitByCodeController = (): Controller => {
  const controller = new ListFitByCodeController(makeDbListFitByCode())
  return controller
}
