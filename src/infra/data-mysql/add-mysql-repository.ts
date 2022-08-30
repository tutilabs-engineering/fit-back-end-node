import { AddFit } from '../../domain/useCase/Add/add-fit'
import { AddFitRepository } from '../repositories/data/fit/add-repository'
// import { PrismaHelper } from './prisma-helper'

export class AddMysqlRepository implements AddFitRepository {
  async add(fit: AddFit.Params): Promise<AddFit.Result> {
    return null
  }
}
