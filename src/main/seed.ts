import { PrismaHelper } from '../infra/data-mysql/prisma-helper'

async function main() {
  const isValid = await PrismaHelper.prisma.status.findMany()
  if (isValid.length === 0) {
    await PrismaHelper.prisma.status.createMany({
      data: [
        { status: 'on_approval' },
        { status: 'disabled' },
        { status: 'homologated' },
        { status: 'review_button_disabled' },
        { status: 'old_fit' },
      ],
    })
  } else {
    console.log('Seed já realizada!')
  }
}

main()
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })
  .finally(async () => {
    await PrismaHelper.prisma.$disconnect()
  })
