import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error.js"
import { makeAuthenticateService } from "@/services/factories/make-authenticate-service.js"
import type { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"

export async function authenticateController(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6)
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateService = makeAuthenticateService()
    await authenticateService.execute({ email, password })
    return reply.status(200).send()
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message })
    }
    throw error
  }
}