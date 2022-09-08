// import { OnApproval } from '../../domain/useCase/OnApproval/on-approval'
import { OnApprovalRepository } from '../../../infra/repositories/data/fit/on-approval-repository'
// import { setRedis } from '../../../redis/redisConfig'
import { PrismaHelper } from '../prisma-helper'

export class OnApprovalMySqlRepository implements OnApprovalRepository {
  async execute(fit: any): Promise<any> {
    const value = await PrismaHelper.prisma.fit.findFirst({
      where: {
        id: Number(fit.id),
      },
      include: {
        Attention_point_control: true,
        Workstation: {
          include: {
            devices: true,
            Image_final_product: true,
            Image_operation: true,
            Image_package_description: true,
            materials: true,
            requirements_and_specifications: true,
            safety: true,
            used_tools: true,
          },
        },
        Homologation: true,
      },
    })

    // await setRedis('fit-header', JSON.stringify(onApproval[0]))

    // const fitOnApprovalRedis = await getRedis(`${onApproval[0]}`)
    // const fitTeste = JSON.parse(fitOnApprovalRedis)

    // console.timeEnd()

    return value
  }
}
