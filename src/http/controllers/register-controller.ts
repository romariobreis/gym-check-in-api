import { PrismaUsersRepository } from "@/repositories/prisma-users-repository.js"
import { RegisterService } from "@/services/register-service.js"
import type { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"

export async function registerController(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6)
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerService = new RegisterService(usersRepository)
    await registerService.registerUser({ name, email, password })
    return reply.status(201).send()
  } catch (error) {
    return reply.status(409).send({ message: error })
  }
}