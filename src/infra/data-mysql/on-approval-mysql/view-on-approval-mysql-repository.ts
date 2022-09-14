import { ViewOnApprovalRepository } from '../../repositories/data/fit/view-on-approval-repository'
import { PrismaHelper } from '../prisma-helper'

export class ViewOnApprovalMySqlRepository implements ViewOnApprovalRepository {
  async execute(fit: any): Promise<any> {
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
}
