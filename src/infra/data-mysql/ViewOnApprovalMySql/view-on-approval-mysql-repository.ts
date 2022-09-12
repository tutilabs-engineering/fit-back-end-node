// import { OnApproval } from '../../domain/useCase/OnApproval/on-approval'
// import { ViewOnApprovalRepository } from '../../../infra/repositories/data/fit/on-approval-repository'
import { PrismaHelper } from '../prisma-helper'
// implements ViewOnApprovalRepository

export class ViewOnApprovalMySqlRepository {
  async execute(): Promise<any> {
    const fitsOnApproval: any = []
    const fitIds = []

    fitIds.push(
      await PrismaHelper.prisma.homologation.findMany({
        select: {
          fitId: true,
          user_homologation: true,
        },
        where: {
          statusId: 2,
        },
      })
    )

    fitIds.forEach(async (element) => {
      await fitsOnApproval.push(
        await PrismaHelper.prisma.fit.findMany({
          where: {
            id: Number(element),
          },
        })
      )
    })

    return fitsOnApproval
  }
}

const viewOnApprovalMySqlRepository = new ViewOnApprovalMySqlRepository()

void viewOnApprovalMySqlRepository.execute()
