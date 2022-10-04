import { AddFit } from '../../domain/useCase/Add/add-fit'
import { VersioningFIt } from '../../domain/useCase/Versioning/versioning-fit'
import { FindSpecificFit } from '../../domain/useCase/ViewSpecific/view-specific'
import { httpUserSystem } from '../../utils/api/user-system-api'
import { AddFitRepository } from '../repositories/data/fit/add-repository'
import { FindByFitRepository } from '../repositories/data/fit/find-by-fit-repository'
import { HomologationFitRepository } from '../repositories/data/fit/homologation-repository'
import { ListHomologatedRepository } from '../repositories/data/fit/list-homologated-repository'
import { ListOnApprovalRepository } from '../repositories/data/fit/list-on-approval-repository'
import { LoadAccountByTokenRepository } from '../repositories/data/fit/load-account-by-token-repository'
import { VersioningFitRepository } from '../repositories/data/fit/versioning-repository'
import { CancellationFitRepository } from '../repositories/data/fit/cancellation-fit-repository'
import { PrismaHelper } from './prisma-helper'
import { CancellationFit } from '../../domain/useCase/Cancellation/cancellation-fit'

export class FitMysqlRepository
  implements
    AddFitRepository,
    LoadAccountByTokenRepository,
    HomologationFitRepository,
    ListOnApprovalRepository,
    FindByFitRepository,
    ListHomologatedRepository,
    VersioningFitRepository,
    CancellationFitRepository
{
  async add(request: AddFit.Params): Promise<AddFit.Result> {
    const {
      mold,
      client,
      date,
      product_code,
      process,
      product_description,
      Controller_attention_point,
      Workstations,
      code_mold,
    } = request.body
    await PrismaHelper.prisma.fit
      .create({
        data: {
          code_mold,
          client,
          date,
          mold,
          process,
          product_code,
          product_description,
          Attention_point_control: {
            createMany: {
              // eslint-disable-next-line @typescript-eslint/no-base-to-string
              data: JSON.parse(Controller_attention_point.toString()),
            },
          },
          Homologation: {
            create: {
              user_created: JSON.stringify({
                user: {
                  id: request.account.id,
                  nome: request.account.nome_completo,
                  matricula: request.account.matricula,
                  email: request.account.email,
                  nivel_de_acesso: request.account.nivel_de_acesso.descricao,
                },
                date_created: new Date(),
              }),
              mold,
              code_mold,
              product_code,
              version: 0,
              statusId: 1,
            },
          },
        },
      })
      .then(async (fit) => {
        const img_layout_path = request.files.filter(
          (values: any) => values.fieldname === 'img_layout_path'
        )
        for (const [index, Workstation] of JSON.parse(
          Workstations.toString()
        ).entries()) {
          await PrismaHelper.prisma.workstation
            .create({
              data: {
                workstation_name: Workstation.workstation_name,
                img_layout_path: img_layout_path[index].filename,
                fitId: fit.id,
                used_tools: {
                  create: {
                    box_cutter: Workstation.Used_tools.box_cutter,
                    pliers: Workstation.Used_tools.pliers,
                    screen_printing: Workstation.Used_tools.screen_printing,
                    outros: Workstation.Used_tools.outros,
                  },
                },
                safety: {
                  create: {
                    helmet: Workstation.Safety.helmet,
                    earplug: Workstation.Safety.earplug,
                    safety_goggles: Workstation.Safety.safety_goggles,
                    safety_gloves: Workstation.Safety.safety_gloves,
                    safety_mask: Workstation.Safety.safety_mask,
                    safety_boot: Workstation.Safety.safety_boot,
                    outros: Workstation.Safety.outros,
                  },
                },
                materials: {
                  createMany: {
                    data: Workstation.materials,
                  },
                },
                devices: {
                  createMany: {
                    data: Workstation.Devices,
                  },
                },
                specifics_requirements_client: {
                  createMany: {
                    data: Workstation.specifics_requirements_client,
                  },
                },
              },
            })
            .then(async (workstation) => {
              // Imagens das Operações
              const find_img_operations = request.files.map((values: any) => {
                if (values.fieldname === `img_operation_path_${index}`) {
                  return values.filename
                }
              })
              const filter_img_operation_path = find_img_operations.filter(
                (values: any) => values !== undefined
              )
              const workstation_Images_Operations =
                Workstation.Images_operations.map(
                  (values: any, index: number) => {
                    return Object.assign({}, values, {
                      img_path: filter_img_operation_path[index],
                      workstationId: workstation.id,
                    })
                  }
                )
              await PrismaHelper.prisma.image_operation.createMany({
                data: workstation_Images_Operations,
              })
              // Imagens das Descrições de Embalagens
              const find_img_package_description = request.files.map(
                (values: any) => {
                  if (values.fieldname === `img_package_description_${index}`) {
                    return values.filename
                  }
                }
              )
              const filter_img_package_description_path =
                find_img_package_description.filter(
                  (values: any) => values !== undefined
                )
              const workstation_Images_Package_Description =
                Workstation.Images_package_description.map(
                  (values: any, index: number) => {
                    return Object.assign({}, values, {
                      img_path: filter_img_package_description_path[index],
                      workstationId: workstation.id,
                    })
                  }
                )
              await PrismaHelper.prisma.image_package_description.createMany({
                data: workstation_Images_Package_Description,
              })
              // Imagens Produto Acabado
              const find_img_final_product = request.files.map(
                (values: any) => {
                  if (values.fieldname === `img_final_product_${index}`) {
                    return values.filename
                  }
                }
              )
              const filter_img_final_product_path =
                find_img_final_product.filter(
                  (values: any) => values !== undefined
                )
              const workstation_Images_Final_Product =
                Workstation.Images_final_product.map(
                  (values: any, index: number) => {
                    return Object.assign({}, values, {
                      img_path: filter_img_final_product_path[index],
                      workstationId: workstation.id,
                    })
                  }
                )
              await PrismaHelper.prisma.image_final_product.createMany({
                data: workstation_Images_Final_Product,
              })
            })
        }
      })
  }

  async loadByToken(
    token: string
  ): Promise<LoadAccountByTokenRepository.Result> {
    try {
      const result = await httpUserSystem.post(
        '/session/verify',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (result) {
        return result.data.user
      }
    } catch (error) {
      return null
    }
  }

  async homolog(
    request: HomologationFitRepository.Params
  ): Promise<HomologationFitRepository.Result> {
    const FindByFitCodMoldAndCodeProd =
      await PrismaHelper.prisma.homologation.findUnique({
        select: {
          code_mold: true,
          product_code: true,
        },
        where: {
          id: Number(request.params.id),
        },
      })

    const FindByFItHomologation =
      await PrismaHelper.prisma.homologation.findFirst({
        where: {
          AND: {
            code_mold: FindByFitCodMoldAndCodeProd.code_mold,
            product_code: FindByFitCodMoldAndCodeProd.product_code,
          },
          NOT: [
            {
              statusId: 2,
            },
            {
              statusId: 5,
            },
          ],
        },
        orderBy: {
          id: 'asc',
        },
      })

    if (FindByFItHomologation) {
      if (request.body.status === 3) {
        await PrismaHelper.prisma.homologation.update({
          data: {
            statusId: 5,
          },
          where: {
            id: FindByFItHomologation.id,
          },
        })
      }
    }
    await PrismaHelper.prisma.homologation.update({
      data: {
        user_homologation: JSON.stringify(request.body.findHomologation),
        statusId: {
          set: request.body.status,
        },
      },
      where: {
        id: Number(request.params.id),
      },
    })
  }

  async listOnApproval(): Promise<ListOnApprovalRepository.Result[]> {
    const FitsOnApproval = await PrismaHelper.prisma.fit.findMany({
      include: {
        Homologation: {
          where: {
            statusId: 1,
          },
        },
      },
      where: {
        Homologation: {
          some: {
            statusId: 1,
          },
        },
      },
    })
    return FitsOnApproval
  }

  async findByFit(fit: FindSpecificFit.Params): Promise<any> {
    const findByFit = await PrismaHelper.prisma.fit.findUnique({
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
            specifics_requirements_client: true,
            used_tools: true,
          },
        },
        Homologation: true,
      },
      where: {
        id: Number(fit.id),
      },
    })
    return findByFit
  }

  async ListFitHomologated(): Promise<ListHomologatedRepository.Result[]> {
    const findFitHomologated = await PrismaHelper.prisma.fit.findMany({
      include: {
        _count: {
          select: {
            Workstation: true,
          },
        },
        Homologation: {
          where: {
            statusId: 3,
          },
        },
      },
      where: {
        Homologation: {
          some: {
            statusId: 3,
          },
        },
      },
    })
    return findFitHomologated
  }

  async versioning(
    request: VersioningFIt.Params
  ): Promise<VersioningFIt.Result> {
    const {
      mold,
      client,
      date,
      product_code,
      process,
      product_description,
      Controller_attention_point,
      Workstations,
      code_mold,
    } = request.body
    const findByHomologation = await PrismaHelper.prisma.homologation.findFirst(
      {
        where: {
          AND: {
            code_mold,
            product_code,
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
    await PrismaHelper.prisma.fit
      .create({
        data: {
          code_mold,
          client,
          date,
          mold,
          process,
          product_code,
          product_description,
          Attention_point_control: {
            createMany: {
              // eslint-disable-next-line @typescript-eslint/no-base-to-string
              data: JSON.parse(Controller_attention_point.toString()),
            },
          },
          Homologation: {
            create: {
              user_created: JSON.stringify({
                user: {
                  id: request.account.id,
                  nome: request.account.nome_completo,
                  matricula: request.account.matricula,
                  email: request.account.email,
                  nivel_de_acesso: request.account.nivel_de_acesso.descricao,
                },
                date_created: new Date(),
              }),
              mold,
              code_mold,
              product_code,
              version: findByHomologation.version + 1,
              statusId: 1,
            },
          },
        },
      })
      .then(async (fit) => {
        const img_layout_path = request.files.filter(
          (values: any) => values.fieldname === 'img_layout_path'
        )
        for (const [index, Workstation] of JSON.parse(
          Workstations.toString()
        ).entries()) {
          await PrismaHelper.prisma.workstation
            .create({
              data: {
                workstation_name: Workstation.workstation_name,
                img_layout_path: img_layout_path[index].filename,
                fitId: fit.id,
                used_tools: {
                  create: {
                    box_cutter: Workstation.Used_tools.box_cutter,
                    pliers: Workstation.Used_tools.pliers,
                    screen_printing: Workstation.Used_tools.screen_printing,
                    outros: Workstation.Used_tools.outros,
                  },
                },
                safety: {
                  create: {
                    helmet: Workstation.Safety.helmet,
                    earplug: Workstation.Safety.earplug,
                    safety_goggles: Workstation.Safety.safety_goggles,
                    safety_gloves: Workstation.Safety.safety_gloves,
                    safety_mask: Workstation.Safety.safety_mask,
                    safety_boot: Workstation.Safety.safety_boot,
                    outros: Workstation.Safety.outros,
                  },
                },
                materials: {
                  createMany: {
                    data: Workstation.materials,
                  },
                },
                devices: {
                  createMany: {
                    data: Workstation.Devices,
                  },
                },
                specifics_requirements_client: {
                  createMany: {
                    data: Workstation.specifics_requirements_client,
                  },
                },
              },
            })
            .then(async (workstation) => {
              // Imagens das Operações
              const find_img_operations = request.files.map((values: any) => {
                if (values.fieldname === `img_operation_path_${index}`) {
                  return values.filename
                }
              })
              const filter_img_operation_path = find_img_operations.filter(
                (values: any) => values !== undefined
              )
              const workstation_Images_Operations =
                Workstation.Images_operations.map(
                  (values: any, index: number) => {
                    return Object.assign({}, values, {
                      img_path: filter_img_operation_path[index],
                      workstationId: workstation.id,
                    })
                  }
                )
              await PrismaHelper.prisma.image_operation.createMany({
                data: workstation_Images_Operations,
              })
              // Imagens das Descrições de Embalagens
              const find_img_package_description = request.files.map(
                (values: any) => {
                  if (values.fieldname === `img_package_description_${index}`) {
                    return values.filename
                  }
                }
              )
              const filter_img_package_description_path =
                find_img_package_description.filter(
                  (values: any) => values !== undefined
                )
              const workstation_Images_Package_Description =
                Workstation.Images_package_description.map(
                  (values: any, index: number) => {
                    return Object.assign({}, values, {
                      img_path: filter_img_package_description_path[index],
                      workstationId: workstation.id,
                    })
                  }
                )
              await PrismaHelper.prisma.image_package_description.createMany({
                data: workstation_Images_Package_Description,
              })
              // Imagens Produto Acabado
              const find_img_final_product = request.files.map(
                (values: any) => {
                  if (values.fieldname === `img_final_product_${index}`) {
                    return values.filename
                  }
                }
              )
              const filter_img_final_product_path =
                find_img_final_product.filter(
                  (values: any) => values !== undefined
                )
              const workstation_Images_Final_Product =
                Workstation.Images_final_product.map(
                  (values: any, index: number) => {
                    return Object.assign({}, values, {
                      img_path: filter_img_final_product_path[index],
                      workstationId: workstation.id,
                    })
                  }
                )
              await PrismaHelper.prisma.image_final_product.createMany({
                data: workstation_Images_Final_Product,
              })
            })
        }
      })
    const FindAllHomologation = await PrismaHelper.prisma.homologation.findMany(
      {
        where: {
          AND: {
            code_mold,
            product_code,
            NOT: {
              statusId: 2,
            },
          },
          NOT: {
            id: findByHomologation.id,
          },
        },
        orderBy: {
          id: 'desc',
        },
      }
    )
    const lastFitHomologation = FindAllHomologation.shift()
    FindAllHomologation.map(async (values) => {
      if (lastFitHomologation.id !== values.id) {
        await PrismaHelper.prisma.homologation.updateMany({
          data: {
            statusId: 5,
          },
          where: {
            id: values.id,
          },
        })
      }
    })
    await PrismaHelper.prisma.homologation.update({
      data: {
        statusId: 4,
      },
      where: {
        id: findByHomologation.id,
      },
    })
  }

  async cancel(
    request: CancellationFit.Params
  ): Promise<CancellationFit.Result> {
    const findByFitCodeMoldAndCodeProd =
      await PrismaHelper.prisma.fit.findUnique({
        select: {
          product_code: true,
          code_mold: true,
          Homologation: {
            select: {
              version: true,
              id: true,
            },
          },
        },
        where: {
          id: Number(request.id),
        },
      })
    if (findByFitCodeMoldAndCodeProd.Homologation[0].version !== 0) {
      await PrismaHelper.prisma.homologation.update({
        data: {
          version: 0,
          statusId: 2,
        },
        where: {
          id: findByFitCodeMoldAndCodeProd.Homologation[0].id,
        },
      })
      const FindByAllFit = await PrismaHelper.prisma.homologation.findFirst({
        where: {
          AND: {
            code_mold: findByFitCodeMoldAndCodeProd.code_mold,
            product_code: findByFitCodeMoldAndCodeProd.product_code,
          },
        },
        orderBy: {
          id: 'asc',
        },
      })

      await PrismaHelper.prisma.homologation.update({
        data: {
          statusId: 3,
        },
        where: {
          id: FindByAllFit.id,
        },
      })
    }
  }
}
