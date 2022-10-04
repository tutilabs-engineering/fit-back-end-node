import { Validation } from '../../presentation/models/validation'
import { UnauthorizedError } from '../../presentation/errors/unauthorized-error'
import { PrismaHelper } from '../../infra/data-mysql/prisma-helper'
export class RequiredHomologationFit implements Validation {
  async validate(input: any): Promise<Error> {
    const findByHomologation = await PrismaHelper.prisma.homologation.findFirst(
      {
        where: {
          AND: {
            code_mold: input.body.code_mold,
            product_code: input.body.product_code,
          },
          NOT: {
            statusId: 2,
          },
        },
        orderBy: {
          id: 'desc',
        },
      }
    )
    if (!findByHomologation) {
      return new UnauthorizedError()
    }
    if (findByHomologation.statusId !== 3) {
      return new UnauthorizedError()
    }
  }
}
