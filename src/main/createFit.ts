import { PrismaHelper } from '../infra/data-mysql/prisma-helper'

async function main() {
  await PrismaHelper.prisma.fit.create({
    data: {
      client: 'Cliente',
      mold: 'Molde',
      process: 'Processo',
      product_code: 'Código do produto',
      product_description: 'Descrição do produto',
      Attention_point_control: {
        create: {
          control_method: 'Método de controle',
          evaluation_technique: 'Técnico de avaliação',
          reaction_plan: 'Plano de reação',
          requirements: 'Requisitos',
          sample: 'Amostra',
          specifications: 'Especificações',
        },
      },
      date: new Date(),
      Homologation: {
        create: {
          user_created: {
            name: 'Nome',
            registration: 13,
            date: '13/13/1313',
          },
          user_homologation: {
            SESMT: {
              name: 'Nome',
              date: '13/02/1913',
              comments: 'Aprovado com sucesso',
              status: 'Aprovado',
            },
            Engeneering: {
              name: 'Nome',
              date: '13/02/1913',
              comments: 'Aprovado com sucesso',
              status: 'Aguardando',
            },
            Quality: {
              name: 'Nome',
              date: '13/02/1913',
              comments: 'Aprovado com sucesso',
              status: 'Aprovado',
            },
            Production: {
              name: 'Nome',
              date: '13/02/1913',
              comments: 'Aprovado com sucesso',
              status: 'Aprovado',
            },
          },
          version: 0,
          statusId: 2,
        },
      },
      Workstation: {
        create: {
          img_layout_path: 'Imagem de layout',
          specifics_requirements_client: {
            create: {
              description: 'Requisitos específicos',
            },
          },
          devices: {
            create: {
              code: 'Código',
              description: 'Descrição',
              quantity: 13,
            },
          },
          materials: {
            create: {
              description: 'Descrição',
              quantity: 13,
              sap_code: '131313',
            },
          },
          Image_final_product: {
            create: {
              description: 'Descrição',
              img_path: 'Caminho da imagem',
            },
          },
          Image_operation: {
            create: {
              description: 'Descrição',
              img_path: 'Caminho da imagem',
            },
          },
          Image_package_description: {
            create: {
              description: 'Descrição',
              img_path: 'Caminho da imagem',
            },
          },
          used_tools: {
            create: {
              outros: 'Outros',
              box_cutter: true,
              pliers: true,
              screen_printing: true,
            },
          },
          safety: {
            create: {
              earplug: false,
              helmet: false,
              outros: 'Outros',
              safety_boot: false,
              safety_gloves: false,
              safety_goggles: false,
              safety_mask: false,
            },
          },
        },
      },
    },
  })
}

main()
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })
  .finally(async () => {
    await PrismaHelper.prisma.$disconnect()
  })
