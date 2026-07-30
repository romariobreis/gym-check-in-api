import { app } from '@/app.js'
import { prisma } from '@/lib/prisma.js'
import { afterAll, beforeAll, beforeEach } from 'vitest'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

beforeEach(async () => {
  await prisma.checkIn.deleteMany()
  await prisma.gym.deleteMany()
  await prisma.user.deleteMany()
})