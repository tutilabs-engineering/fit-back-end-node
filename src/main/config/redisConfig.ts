import Redis from 'ioredis'

const redis = new Redis({
  password: 'redispw',
  port: 6379,
  host: 'localhost',
})

export async function getRedis() {
  return await redis.get(`fit`, async (error, fitRedis) => {
    if (error) console.error(error)
    return fitRedis
  })
}

export async function setRedis(resultRedis: any, fit: any) {
  await redis.set(`fit`, JSON.stringify(resultRedis), 'EX', 1440)
}
