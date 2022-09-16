// import { OnApproval } from '../../domain/useCase/OnApproval/on-approval'
import Redis from 'ioredis'
import { OnApprovalRepository } from '../../../infra/repositories/data/fit/on-approval-repository'
import { PrismaHelper } from '../prisma-helper'

const redis = new Redis({
  password: 'redispw',
  port: 6379,
  host: 'localhost',
})

export class OnApprovalMySqlRepository implements OnApprovalRepository {
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

    const result = await redis.get(
      `fit_${Number(fit.id)}`,
      async (error, fitRedis) => {
        if (error) console.error(error)

        return fitRedis
      }
    )

    if (result) return JSON.parse(result)

    const resultRedis = await getValue()
    await redis.set(
      `fit_${Number(fit.id)}`,
      JSON.stringify(resultRedis),
      'EX',
      1440
    )

    return resultRedis
  }
}
