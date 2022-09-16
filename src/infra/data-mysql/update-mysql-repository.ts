import { UpdateFit } from '../../domain/useCase/Update/update-fit'
import { UpdateFitRepository } from '../repositories/data/fit/update-repository'
import { PrismaHelper } from './prisma-helper'

export class UpdateMysqlRepository implements UpdateFitRepository {
  async update(request: UpdateFit.Params): Promise<UpdateFit.Result> {
    const {
      mold,
      client,
      date,
      product_code,
      process,
      product_description,
      Controller_attention_point,
      Workstations,
    } = request.body
    await PrismaHelper.prisma.fit
      .create({
        data: {
          client,
          date,
          mold,
          process,
          product_code,
          product_description,
          Attention_point_control: {
            createMany: {
              data: JSON.parse(Controller_attention_point.toString()),
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
}
