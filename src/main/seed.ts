import { PrismaHelper } from '../infra/data-mysql/prisma-helper'

async function main() {
  await PrismaHelper.prisma.status.createMany({
    data: [
      { status: 'review' },
      { status: 'on_approval' },
      { status: 'disapproved' },
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
