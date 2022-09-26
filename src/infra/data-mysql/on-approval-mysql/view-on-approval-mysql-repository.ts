import { getRedis, setRedis } from '../../../main/config/redisConfig'
import { ViewOnApprovalRepository } from '../../repositories/data/fit/view-on-approval-repository'
import { PrismaHelper } from '../prisma-helper'

export class ViewOnApprovalMySqlRepository implements ViewOnApprovalRepository {
  async execute(fit: any): Promise<any> {
    const getValue = async () => {
      return await PrismaHelper.prisma.fit.findFirst({
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
              safety: true,
              used_tools: true,
            },
          },
          Homologation: true,
        },
      })
    }

    const result = await getRedis(Number(fit.id))

    if (result) return JSON.parse(result)

    const resultRedis = await getValue()

    await setRedis(resultRedis, Number(fit.id))

    return resultRedis
  }
}
