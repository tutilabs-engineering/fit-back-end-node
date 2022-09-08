import Redis from 'ioredis'
import { promisify } from 'util'

const redisClient = new Redis()

async function getRedis(value: string) {
  const syncRedisGet = promisify(redisClient.get).bind(redisClient)
  return await syncRedisGet(value)
}

async function setRedis(key: string, value: string) {
  const syncRedisSet = promisify(redisClient.set).bind(redisClient)
  return await syncRedisSet(key, value)
}

export { redisClient, getRedis, setRedis }
