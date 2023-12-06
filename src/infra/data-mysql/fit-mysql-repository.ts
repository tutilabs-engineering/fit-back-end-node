import * as useCase from '../../domain/useCase/index'
import * as repository from '../repositories/data/fit/index'
import * as api from '../../utils/api/index'
import { PrismaHelper } from './prisma-helper'
import { SendEmail } from '../../utils/email-fit-nodemailer/nodemailer'

const sendEmail = new SendEmail()

export class FitMysqlRepository
  implements
  repository.AddFitRepository,
  repository.UpdateFitRepository,
  repository.LoadAccountByTokenRepository,
  repository.HomologationFitRepository,
  repository.ListOnApprovalRepository,
  repository.FindByFitRepository,
  repository.FindFitByCodeRepository,
  repository.ListHomologatedRepository,
  repository.VersioningFitRepository,
  repository.CancellationFitRepository,
  repository.ListFitByCodeRepository {
  async add(request: useCase.AddFit.Params): Promise<useCase.AddFit.Result> {
    const {
      id_report_tryout,
      mold,
      client,
      Controller_attention_point: isValidaController_attention_point,
      Workstations: isValidWorkstations,
      product_code,
      process,
      product_description,
      code_mold,
    } = request.body.data ? JSON.parse(request.body.data) : request.body
    const Workstations = request.body.data
      ? isValidWorkstations
      : JSON.parse(request.body.Workstations)
    const Controller_attention_point = request.body.data
      ? isValidaController_attention_point
      : JSON.parse(request.body.Controller_attention_point)
    await PrismaHelper.prisma.fit
      .create({
        data: {
          code_mold,
          client,
          date: new Date(),
          mold,
          process,
          product_code,
          product_description,
          Attention_point_control: {
            createMany: {
              // eslint-disable-next-line @typescript-eslint/no-base-to-string
              data: Controller_attention_point,
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
        for (const [index, Workstation] of Workstations.entries()) {
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
    await api.httpReportSystem.patch(
      `reportTryout/modify/${id_report_tryout}`,
      { status: 2 },
      {
        headers: {
          Authorization: `${request.accessToken}`,
        },
      }
    )

    // * alterações feitas por mim
    const id = await PrismaHelper.prisma.fit.findFirst({
      orderBy: {
        id: 'desc',
      },
      take: 1,
      select: {
        id: true,
      },
    })

    const dateBrFormat = new Date()
    void sendEmail.sendEmailOnApprovalDepartments(
      id.id,
      product_code,
      product_description,
      code_mold,
      mold,
      client,
      process,
      dateBrFormat.toLocaleDateString()
    )
  }

  async update(
    request: useCase.UpdateFit.Params
  ): Promise<useCase.UpdateFit.Result> {
    const {
      mold,
      client,
      Controller_attention_point: isValidaController_attention_point,
      Workstations: isValidWorkstations,
      product_code,
      process,
      product_description,
      code_mold,
    } = request.body.data ? JSON.parse(request.body.data) : request.body
    const Workstations = request.body.data
      ? isValidWorkstations
      : JSON.parse(request.body.Workstations)
    const Controller_attention_point = request.body.data
      ? isValidaController_attention_point
      : JSON.parse(request.body.Controller_attention_point)
   
    await PrismaHelper.prisma.fit
      .update({
        data: {
          client,
          code_mold,
          mold,
          process,
          product_code,
          product_description,
          Homologation: {
            updateMany: {
              data: {
                code_mold,
                mold,
                product_code,
                user_homologation: PrismaHelper.Prisma.DbNull,
              },
              where: {
                fitId: Number(request.params.id),
              },
            },
          },
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
              specifics_requirements_client: true,
              used_tools: true,
            },
          },
        },
        where: {
          id: Number(request.params.id),
        },
      })
      .then(async (fit) => {
        // limpando lista de ponto de controle de atenção
        for (const values of Controller_attention_point) {
          fit.Attention_point_control.slice.call(values)
        }
        for (const isDelAttentionPointControl of fit.Attention_point_control) {
          await PrismaHelper.prisma.attention_point_control.deleteMany({
            where: {
              id: isDelAttentionPointControl.id,
            },
          })
        }
        //
        // atualizando lista de ponto de controle de atenção
        for (const values of Controller_attention_point) {
          await PrismaHelper.prisma.attention_point_control.upsert({
            update: {
              evaluation_technique: values.evaluation_technique,
              reaction_plan: values.reaction_plan,
              sample: values.sample,
              specifications: values.specifications,
              ce: values.ce,
            },
            where: {
              id: values.id ? values.id : 0,
            },
            create: {
              fitId: fit.id,
              evaluation_technique: values.evaluation_technique,
              reaction_plan: values.reaction_plan,
              sample: values.sample,
              specifications: values.specifications,
              ce: values.ce,
            },
          })
        }
        //
        // Apagando wokstations deletadas
        // for (const values of JSON.parse(request.body.deleteWorks)) {
        //   await PrismaHelper.prisma.workstation.deleteMany({
        //     where: {
        //       id: values.id,
        //     },
        //   })
        // }
        //
        // const newWorkstation = Workstations.filter((values: any) => {
          
        //   if(values.typeWorkstation === 'newForm') {
        //     const obj = {
        //       workstation_name: values.workstation_name,
        //       img_layout_path: values.img_layout_path,
        //       fitId: fit.id
        //     }
        //     return obj 
        //   }
        // })
        //  console.log(newWorkstation)

        // await PrismaHelper.prisma.workstation.create({
        //   data: {

        //   }
        // })
        Workstations.forEach(async (workstation: any, indexWorkstation: number) => {
          try {
            const requestFilesFinalProduct = request.files.filter((values: any) => values.fieldname === `img_final_product_${indexWorkstation}`)
            
            const requestFilesOperation = request.files.filter((values: any) => values.fieldname === `img_operation_path_${indexWorkstation}`)
          
            const requestFilesPackageDescription = request.files.filter((values: any) => values.fieldname === `img_package_description_${indexWorkstation}`) 
            // IMAGEM LAYOUT
            const img_layout_path_new_files = request.files.filter(
              (values: any) => values.fieldname === 'img_layout_path'
            )
            
            await PrismaHelper.prisma.workstation.update({
              data: {
                img_layout_path: workstation.img_layout_path = img_layout_path_new_files[indexWorkstation].filename
              },
              where: {
                id: workstation.id
              }
            })


            // IMAGEM PRODUTO ACABADO
            let count = 0;
            const findNewImgFinalProduct = workstation.Image_final_product.map((element: any) => {
              if (!element.id) {
                const obj = {
                  img_path: requestFilesFinalProduct[count].filename,
                  description: element.description,
                  workstationId: workstation.id
                }
                count++
                return obj
              }
              return element
            })
            await PrismaHelper.prisma.image_final_product.deleteMany({
              where: {
                workstationId: workstation.id
              }
            })
            await PrismaHelper.prisma.image_final_product.createMany({
              data: findNewImgFinalProduct
            })

            // IMAGEM OPERAÇÕES
            let count2 = 0;
            const findNewImgOperation = workstation.Image_operation.map((element: any) => {
              if (!element.id) {
                const obj = {
                  img_path: requestFilesOperation[count2].filename,
                  description: element.description,
                  workstationId: workstation.id
                }
                count2++
                return obj
              }
              return element
            })
            await PrismaHelper.prisma.image_operation.deleteMany({
              where: {
                workstationId: workstation.id
              }
            })
            await PrismaHelper.prisma.image_operation.createMany({
              data: findNewImgOperation
            })
  
            // IMAGENS EMBALAGENS
            let count3 = 0;
            const findNewImgPackageDescription = workstation.Image_package_description.map((element: any) => {
              if (!element.id) {
                const obj = {
                  img_path: requestFilesPackageDescription[count3].filename,
                  description: element.description,
                  workstationId: workstation.id
                }
                count3++
                return obj
              }
              return element
            })
            await PrismaHelper.prisma.image_package_description.deleteMany({
              where: {
                workstationId: workstation.id
              }
            })
            await PrismaHelper.prisma.image_package_description.createMany({
              data: findNewImgPackageDescription
            })

            // Devices
            let count4 = 0;
            const devices = workstation.devices.map((element: any) => {
              if (!element.id) {
                const obj = {
                  description: element.description,
                  code: element.code,
                  quantity: element.quantity,
                  workstationId: workstation.id
                }
                count4++
                return obj
              }
              return element
            })
            await PrismaHelper.prisma.devices.deleteMany({
              where: {
                workstationId: workstation.id
              }
            })
            await PrismaHelper.prisma.devices.createMany({
              data: devices
            })

          // MATERIALS
          let count5 = 0;
          const materials = workstation.materials.map((element: any) => {
            if (!element.id) {
              const obj = {
                sap_code: element.sap_code,
                description: element.description,
                quantity: element.quantity,
                workstationId: workstation.id
              }
              count5++
              return obj
            }
            return element
          })
          await PrismaHelper.prisma.materials.deleteMany({
            where: {
              workstationId: workstation.id
            }
          })
          await PrismaHelper.prisma.materials.createMany({
            data: materials
          })

          // SPECIFICS REQUIREMENTS CLIENT
          let count6 = 0;
          const specificsRequirementsClient = workstation.specifics_requirements_client.map((element: any) => {
            if (!element.id) {
              const obj = {
                description: element.description,
                workstationId: workstation.id
              }
              count6++
              return obj
            }
            return element
          })
          await PrismaHelper.prisma.specifics_requirements_client.deleteMany({
            where: {
              workstationId: workstation.id
            }
          })
          await PrismaHelper.prisma.specifics_requirements_client.createMany({
            data: specificsRequirementsClient
          })

          // USED TOOLS
          let count7 = 0;
          const usedTools = workstation.used_tools.map((element: any) => {
            if (!element.id) {
              const obj = {
                pliers: element.pliers,
                box_cutter: element.box_cutter,
                screen_printing: element.screen_printing,
                outros: element.outros,
                workstationId: workstation.id
              }
              count7++
              return obj
            }
            return element
          })
          await PrismaHelper.prisma.used_tools.deleteMany({
            where: {
              workstationId: workstation.id
            }
          })
          await PrismaHelper.prisma.used_tools.createMany({
            data: usedTools
          })

          // SAFETY
          let count8 = 0;
          const safety = workstation.safety.map((element: any) => {
            if (!element.id) {
              const obj = {
                helmet: element.helmet,
                earplug: element.earplug,
                safety_goggles: element.safety_goggles,
                safety_gloves: element.safety_gloves,
                safety_mask: element.safety_mask,
                safety_boot: element.safety_boot,
                outros: element.outros,
                workstationId: workstation.id
              }
              count8++
              return obj
            }
            return element
          })
          await PrismaHelper.prisma.safety.deleteMany({
            where: {
              workstationId: workstation.id
            }
          })
          await PrismaHelper.prisma.safety.createMany({
            data: safety
          })
          } catch (error) {
            console.error(error)
          }

        });
      })
      .catch((error) => console.error(error))
  }

  async versioning(
    request: useCase.VersioningFIt.Params
  ): Promise<useCase.VersioningFIt.Result> {
    const {
      mold,
      client,
      // date,
      Controller_attention_point: isValidaController_attention_point,
      Workstations: isValidWorkstations,
      product_code,
      process,
      product_description,
      code_mold,
    } = request.body.data ? JSON.parse(request.body.data) : request.body
    const Workstations = request.body.data
      ? isValidWorkstations
      : JSON.parse(request.body.Workstations)
    const Controller_attention_point = request.body.data
      ? isValidaController_attention_point
      : JSON.parse(request.body.Controller_attention_point)

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
          date: new Date(),
          mold,
          process,
          product_code,
          product_description,
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
        for (const valuesControllerPoint of Controller_attention_point) {
          await PrismaHelper.prisma.attention_point_control.createMany({
            data: {
              evaluation_technique: valuesControllerPoint.evaluation_technique,
              reaction_plan: valuesControllerPoint.evaluation_technique,
              sample: valuesControllerPoint.sample,
              specifications: valuesControllerPoint.specifications,
              ce: valuesControllerPoint.ce,
              fitId: fit.id,
            },
          })
        }

        const img_layout_path_new_files = request.files.filter(
          (values: any) => values.fieldname === 'img_layout_path'
        )
        let countImgLayoutNew = 0
        let countImgLayoutOld = 0
        let img_path_layout
        for (const [index, Workstationvalues] of Workstations.entries()) {
          if (
            typeof request.body.img_layout_path === 'string' &&
            request.body.indexPostImgLayout === index.toString()
          ) {
            img_path_layout = request.body.img_layout_path
          } else {
            if (request.body.img_layout_path) {
              if (request.body.indexPostImgLayout.includes(index.toString())) {
                img_path_layout =
                  request.body.img_layout_path[countImgLayoutOld]
                countImgLayoutOld++
              }
            }
          }

          if (request.body.indexPostImgLayoutNew) {
            if (request.body.indexPostImgLayoutNew.includes(index.toString())) {
              img_path_layout = img_layout_path_new_files[countImgLayoutNew]
              countImgLayoutNew++
            }
          }

          const newWorkstation = await PrismaHelper.prisma.workstation.create({
            data: {
              img_layout_path: img_path_layout.filename
                ? img_path_layout.filename
                : img_path_layout,
              workstation_name: Workstationvalues.workstation_name,
              fitId: fit.id,
            },
          })
          for (const valuesDevice of Workstationvalues.devices
            ? Workstationvalues.devices
            : Workstationvalues.Devices) {
            await PrismaHelper.prisma.devices.create({
              data: {
                code: valuesDevice.code,
                description: valuesDevice.description,
                quantity: valuesDevice.quantity,
                workstationId: newWorkstation.id,
              },
            })
          }
          // Criando versionamento de Seguranças
          await PrismaHelper.prisma.safety.create({
            data: {
              earplug: Workstationvalues.safety
                ? Workstationvalues.safety[0].earplug
                : Workstationvalues.Safety.earplug,
              helmet: Workstationvalues.safety
                ? Workstationvalues.safety[0].helmet
                : Workstationvalues.Safety.helmet,
              safety_boot: Workstationvalues.safety
                ? Workstationvalues.safety[0].safety_boot
                : Workstationvalues.Safety.safety_boot,
              safety_gloves: Workstationvalues.safety
                ? Workstationvalues.safety[0].safety_gloves
                : Workstationvalues.Safety.safety_gloves,
              safety_goggles: Workstationvalues.safety
                ? Workstationvalues.safety[0].safety_goggles
                : Workstationvalues.Safety.safety_goggles,
              safety_mask: Workstationvalues.safety
                ? Workstationvalues.safety[0].safety_mask
                : Workstationvalues.Safety.safety_mask,
              outros: Workstationvalues.safety
                ? Workstationvalues.safety[0].outros
                : Workstationvalues.Safety.outros,
              workstationId: newWorkstation.id,
            },
          })
          // Criando versionamento de ferramentas
          await PrismaHelper.prisma.used_tools.create({
            data: {
              box_cutter: Workstationvalues.used_tools
                ? Workstationvalues.used_tools[0].box_cutter
                : Workstationvalues.Used_tools.box_cutter,
              pliers: Workstationvalues.used_tools
                ? Workstationvalues.used_tools[0].pliers
                : Workstationvalues.Used_tools.pliers,
              screen_printing: Workstationvalues.used_tools
                ? Workstationvalues.used_tools[0].screen_printing
                : Workstationvalues.Used_tools.screen_printing,
              outros: Workstationvalues.used_tools
                ? Workstationvalues.used_tools[0].outros
                : Workstationvalues.Used_tools.outros,
              workstationId: newWorkstation.id,
            },
          })
          // Criando versionamento de materiais
          for (const valuesMaterials of Workstationvalues.materials) {
            await PrismaHelper.prisma.materials.create({
              data: {
                sap_code: valuesMaterials.sap_code,
                description: valuesMaterials.description,
                quantity: valuesMaterials.quantity,
                workstationId: newWorkstation.id,
              },
            })
          }
          // Criando versionamento de requisitos especificos do cliente
          for (const valuesSpecifics_requirements_client of Workstationvalues.specifics_requirements_client) {
            await PrismaHelper.prisma.specifics_requirements_client.create({
              data: {
                description: valuesSpecifics_requirements_client.description,
                workstationId: newWorkstation.id,
              },
            })
          }

          // Criando versionamento de imagens operações
          const find_img_operations = request.files.map((values: any) => {
            if (values.fieldname === `img_operation_path_${index}`) {
              return values.filename
            }
          })
          const filter_img_operation_path = find_img_operations.filter(
            (values: any) => values !== undefined
          )
          const workstation_Images_Operations_old: any[] = []
          if (typeof request.body.img_operation === 'string') {
            const array = request.body.img_operation.split(',', 4)
            workstation_Images_Operations_old.push({
              id: Number(array[0]),
              filename: array[1],
              description: array[2],
              index: array[3],
            })
          } else {
            if (request.body.img_operation) {
              for (const img_operation of request.body.img_operation) {
                const array = img_operation.split(',', 4)

                workstation_Images_Operations_old.push({
                  id: Number(array[0]),
                  filename: array[1],
                  description: array[2],
                  index: array[3],
                })
              }
            }
          }
          let workstation_Images_Operations_new
          let workstation_Images_Operations_new_filter
          let count = 0
          if (filter_img_operation_path.length !== 0) {
            const workImgOp = Workstations[index].Image_operation
              ? Workstations[index].Image_operation
              : Workstations[index].Images_operations
            workstation_Images_Operations_new = workImgOp.map(
              (values: any, index: number) => {
                if (!values.id) {
                  const ObjAssing = Object.assign({}, values, {
                    filename: filter_img_operation_path[count],
                  })
                  count++
                  return ObjAssing
                }
              }
            )
            workstation_Images_Operations_new_filter =
              workstation_Images_Operations_new.filter(
                (values: any) => values !== undefined
              )
          }
          const workstation_Images_OperationsPorPosto = []
          for (const values of workstation_Images_Operations_old) {
            if (Number(values.index) === index) {
              workstation_Images_OperationsPorPosto.push(values)
            }
          }
          const workstation_Images_Operations =
            workstation_Images_Operations_new_filter
              ? workstation_Images_OperationsPorPosto.concat(
                workstation_Images_Operations_new_filter
              )
              : workstation_Images_OperationsPorPosto
          for (const valuesImageOperation of workstation_Images_Operations) {
            await PrismaHelper.prisma.image_operation.create({
              data: {
                description: valuesImageOperation.description,
                img_path: valuesImageOperation.filename,
                workstationId: newWorkstation.id,
              },
            })
          }

          // Criando versionamento Images Descrição de Embalagens
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
          const workstation_Images_package_description_old: any[] = []
          if (typeof request.body.img_package_description === 'string') {
            const array = request.body.img_package_description.split(',', 4)
            workstation_Images_package_description_old.push({
              id: Number(array[0]),
              filename: array[1],
              description: array[2],
              index: array[3],
            })
          } else {
            if (request.body.img_package_description) {
              for (const img_package_description of request.body
                .img_package_description) {
                const array = img_package_description.split(',', 4)

                workstation_Images_package_description_old.push({
                  id: Number(array[0]),
                  filename: array[1],
                  description: array[2],
                  index: array[3],
                })
              }
            }
          }
          let workstation_Images_package_description_new
          let workstation_Images_package_description_new_filter

          if (filter_img_package_description_path.length !== 0) {
            let count = 0
            const workImgPd = Workstations[index].Image_package_description
              ? Workstations[index].Image_package_description
              : Workstations[index].Images_package_description
            workstation_Images_package_description_new = workImgPd.map(
              (values: any, index: number) => {
                if (!values.id) {
                  const ObjAssing = Object.assign({}, values, {
                    filename: filter_img_package_description_path[count],
                  })
                  count++
                  return ObjAssing
                }
              }
            )
            workstation_Images_package_description_new_filter =
              workstation_Images_package_description_new.filter(
                (values: any) => values !== undefined
              )
          }

          const workstation_Images_package_descriptionPorPosto = []
          for (const values of workstation_Images_package_description_old) {
            if (Number(values.index) === index) {
              workstation_Images_package_descriptionPorPosto.push(values)
            }
          }
          const workstation_Images_package_description =
            workstation_Images_package_description_new_filter
              ? workstation_Images_OperationsPorPosto.concat(
                workstation_Images_package_description_new_filter
              )
              : workstation_Images_package_descriptionPorPosto
          for (const valuesImgPackageDescription of workstation_Images_package_description) {
            await PrismaHelper.prisma.image_package_description.create({
              data: {
                description: valuesImgPackageDescription.description,
                img_path: valuesImgPackageDescription.filename,
                workstationId: newWorkstation.id,
              },
            })
          }
          // Criando versionamento Imagens Produto Acabado
          const find_img_final_product = request.files.map((values: any) => {
            if (values.fieldname === `img_final_product_${index}`) {
              return values.filename
            }
          })
          const filter_img_final_product_path = find_img_final_product.filter(
            (values: any) => values !== undefined
          )
          const workstation_Images_final_product_old: any[] = []
          if (typeof request.body.img_final_product === 'string') {
            const array = request.body.img_final_product.split(',', 4)
            workstation_Images_final_product_old.push({
              id: Number(array[0]),
              filename: array[1],
              description: array[2],
              index: array[3],
            })
          } else {
            if (request.body.img_final_product) {
              for (const img_final_product of request.body.img_final_product) {
                const array = img_final_product.split(',', 4)

                workstation_Images_final_product_old.push({
                  id: Number(array[0]),
                  filename: array[1],
                  description: array[2],
                  index: array[3],
                })
              }
            }
          }
          let workstation_Images_Final_Porduct_new
          let workstation_Images_Final_Product_new_filter

          if (filter_img_final_product_path.length !== 0) {
            const workImgPf = Workstations[index].Image_final_product
              ? Workstations[index].Image_final_product
              : Workstations[index].Images_final_product
            let count = 0
            workstation_Images_Final_Porduct_new = workImgPf.map(
              (values: any, index: number) => {
                if (!values.id) {
                  const ObjAssing = Object.assign({}, values, {
                    filename: filter_img_final_product_path[count],
                  })
                  count++
                  return ObjAssing
                }
              }
            )
            workstation_Images_Final_Product_new_filter =
              workstation_Images_Final_Porduct_new.filter(
                (values: any) => values !== undefined
              )
          }
          const workstation_Images_Final_ProductPorPosto = []
          for (const values of workstation_Images_final_product_old) {
            if (Number(values.index) === index) {
              workstation_Images_Final_ProductPorPosto.push(values)
            }
          }
          const workstation_Images_Final_Product =
            workstation_Images_Final_Product_new_filter
              ? workstation_Images_Final_ProductPorPosto.concat(
                workstation_Images_Final_Product_new_filter
              )
              : workstation_Images_Final_ProductPorPosto
          for (const valuesImgFinalProduct of workstation_Images_Final_Product) {
            await PrismaHelper.prisma.image_final_product.create({
              data: {
                description: valuesImgFinalProduct.description,
                img_path: valuesImgFinalProduct.filename,
                workstationId: newWorkstation.id,
              },
            })
          }
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

  async loadByToken(
    token: string
  ): Promise<repository.LoadAccountByTokenRepository.Result> {
    try {
      const result = await api.httpUserSystem.post(
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
    request: repository.HomologationFitRepository.Params
  ): Promise<repository.HomologationFitRepository.Result> {
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

  async listOnApproval(): Promise<
    repository.ListOnApprovalRepository.Result[]
  > {
    try {
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
    } catch (error) {
      console.error(error)
    }

  }

  async findByFit(fit: useCase.FindSpecificFit.Params): Promise<any> {
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

  async findFitByCode(fit: useCase.FindSpecificFitByCode.Query): Promise<any> {
    const findFitByCode = await PrismaHelper.prisma.fit.findFirst({
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
        AND: [
          {
            product_code: fit.product_code,
          },
          {
            code_mold: fit.code_mold,
          },
        ],
      },
    })
    return findFitByCode
  }

  async listFitByCode(fit: useCase.ListFitByCode.Query): Promise<any> {
    const findFitByCode = await PrismaHelper.prisma.fit.findMany({
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
        NOT: {
          product_code: fit.product_code,
        },
      },
      take: 5,
      skip: 0,
    })
    return findFitByCode
  }

  async ListFitHomologated(): Promise<
    repository.ListHomologatedRepository.Result[]
  > {
    const findFitHomologated = await PrismaHelper.prisma.fit.findMany({
      include: {
        _count: {
          select: {
            Workstation: true,
          },
        },
        Homologation: {
          where: {
            OR: [
              {
                statusId: 4,
              },
              {
                statusId: 3,
              },
            ],
          },
        },
      },
      where: {
        Homologation: {
          some: {
            OR: [
              {
                statusId: 4,
              },
              {
                statusId: 3,
              },
            ],
          },
        },
      },
    })
    return findFitHomologated
  }

  async cancel(
    request: useCase.CancellationFit.Params
  ): Promise<useCase.CancellationFit.Result> {
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
          NOT: [{ statusId: 5 }, { statusId: 2 }],
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
