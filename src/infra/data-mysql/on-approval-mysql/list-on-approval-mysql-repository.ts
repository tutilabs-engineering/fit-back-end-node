// import { ListOnApproval } from '../../../domain/useCase/ListOnApproval/list-on-approval'
import { ListOnApprovalRepository } from '../../repositories/data/fit/list-on-approval-repository'
import { PrismaHelper } from '../prisma-helper'

export class ListOnApprovalMySqlRepository implements ListOnApprovalRepository {
  async execute(): Promise<any> {
    const getValue = async () => {
      return await PrismaHelper.prisma.fit.findMany({
        include: {
          Homologation: {
            where: {
              statusId: 2,
            },
            select: {
              user_homologation: true,
            },
          },
        },
      })
    }
    const fits = await getValue()
    const result = fits.filter((fits) => fits.Homologation.length > 0)

    return result
  }
}
