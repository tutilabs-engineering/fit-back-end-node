import { PrismaHelper } from '../infra/data-mysql/prisma-helper'

async function main() {
  await PrismaHelper.prisma.status.createMany({
    data: [
      { status: 'on_approval' },
      { status: 'disabled' },
      { status: 'homologated' },
      { status: 'review_button_disabled' },
    ],
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
