import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js"
import { AuthenticateService } from "@/services/authenticate-service.js"
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error.js"
import type { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"

export async function authenticateController(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6)
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const authenticateService = new AuthenticateService(usersRepository)
    await authenticateService.execute({ email, password })
    return reply.status(200).send()
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message })
    }
    throw error
  }
}