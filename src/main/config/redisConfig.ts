import Redis from 'ioredis'

const redis = new Redis({
  password: 'redispw',
  port: 6379,
  host: 'localhost',
})

export async function getRedis(id: number) {
  return await redis.get(`fit_${id}`, async (error, fitRedis) => {
    if (error) console.error(error)
    return fitRedis
  })
}

export async function setRedis(resultRedis: any, id: number) {
  await redis.set(`fit_${id}`, JSON.stringify(resultRedis), 'EX', 1440)
}
