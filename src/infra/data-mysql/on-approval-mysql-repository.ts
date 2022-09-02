// import { OnApproval } from '../../domain/useCase/OnApproval/on-approval'
import { OnApprovalRepository } from '../repositories/data/fit/on-approval-repository'
import { PrismaHelper } from './prisma-helper'

export class OnApprovalMySqlRepository implements OnApprovalRepository {
  async execute(fit: any): Promise<any> {
    const onApproval = []

    onApproval.push({
      header: await PrismaHelper.prisma.fit.findUnique({
        where: {
          id: Number(fit.id),
        },
      }),
    })

    onApproval.push({
      attention_point:
        await PrismaHelper.prisma.attention_point_control.findUnique({
          where: {
            id: Number(fit.id),
          },
        }),
    })

    onApproval.push({
      workstation: await PrismaHelper.prisma.workstation.findUnique({
        where: {
          id: Number(fit.id),
        },
      }),
    })

    onApproval.push({
      used_tools: await PrismaHelper.prisma.used_tools.findUnique({
        where: {
          id: Number(fit.id),
        },
      }),
    })
    onApproval.push({
      safety: await PrismaHelper.prisma.safety.findUnique({
        where: {
          id: Number(fit.id),
        },
      }),
    })
    onApproval.push({
      operation: await PrismaHelper.prisma.image_operation.findUnique({
        where: {
          id: Number(fit.id),
        },
      }),
    })

    onApproval.push({
      package_description:
        await PrismaHelper.prisma.image_package_description.findUnique({
          where: {
            id: Number(fit.id),
          },
        }),
    })
    onApproval.push({
      final_product: await PrismaHelper.prisma.image_final_product.findUnique({
        where: {
          id: Number(fit.id),
        },
      }),
    })

    onApproval.push({
      materials: await PrismaHelper.prisma.materials.findUnique({
        where: {
          id: Number(fit.id),
        },
      }),
    })

    onApproval.push({
      devices: await PrismaHelper.prisma.devices.findUnique({
        where: {
          id: Number(fit.id),
        },
      }),
    })
    onApproval.push({
      specifics_requirements:
        await PrismaHelper.prisma.requirements_and_specifications.findUnique({
          where: {
            id: Number(fit.id),
          },
        }),
    })

    onApproval.push({
      homologation: await PrismaHelper.prisma.homologation.findUnique({
        where: {
          id: Number(fit.id),
        },
      }),
    })

    return onApproval
  }
}
