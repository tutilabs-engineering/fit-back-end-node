import { PrismaHelper } from '../prisma-helper'

export class ViewSpecificMySqlRepository {
  async execute(): Promise<any> {
    const fitsSpecific: any = []
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
      await fitsSpecific.push(
        await PrismaHelper.prisma.fit.findMany({
          where: {
            id: Number(element),
          },
        })
      )
    })

    return fitsSpecific
  }
}
