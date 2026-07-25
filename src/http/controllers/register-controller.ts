import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error.js"
import { makeRegisterService } from "@/services/factories/make-register-service.js"
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
    const registerService = makeRegisterService()
    await registerService.registerUser({ name, email, password })
    return reply.status(201).send()
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
    throw error
  }
}