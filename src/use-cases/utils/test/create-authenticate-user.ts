import { prisma } from '@/lib/prisma.js'
import { hash } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAuthenticateUser(app: FastifyInstance, isAdmin = false) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      password_hash: await hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER'
    }
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'john.doe@email.com',
    password: '123456'
  })

  const { token } = authResponse.body

  return { token }
}