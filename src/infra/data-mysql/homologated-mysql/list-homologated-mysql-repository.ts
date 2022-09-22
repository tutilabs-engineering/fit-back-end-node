// import { ListHomologated } from '../../../domain/useCase/ListHomologated/list-homologated'
// import { getRedis, setRedis } from '../../../main/config/redisConfig'
import { ListHomologatedRepository } from '../../repositories/data/fit/list-homologated-repository'
import { PrismaHelper } from '../prisma-helper'

export class ListHomologatedMySqlRepository
  implements ListHomologatedRepository
{
  async execute(): Promise<any> {
    const getValue = async () => {
      return await PrismaHelper.prisma.fit.findMany({
        include: {
          Workstation: true,
          Homologation: {
            where: {
              statusId: 2,
            },
          },
        },
      })
    }
    const fits = await getValue()
    const result = fits.filter((fit) => fit.Homologation.length > 0)

    return result

    // const result = await getRedis()

    // if (result) return JSON.parse(result)

    // const resultRedis = await getValue()

    // await setRedis(resultRedis)

    // return resultRedis
  }
}
