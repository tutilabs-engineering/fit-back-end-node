import { ListHomologatedController } from '../../../presentation/Controllers/list-homologated-fit-controller'
import { Controller } from '../../../presentation/models/controller'
import { makedDbListHomologated } from '../usecases/list-homologated-factory'

export const makeListHomologatedController = (): Controller => {
  const controller = new ListHomologatedController(makedDbListHomologated())
  return controller
}
