import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case.js"
import type { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymBodySchema = z.object({
    q: z.string(),
    page: z.number().min(1).default(1)
  })

  const { q, page } = searchGymBodySchema.parse(request.query)
  const searchGymUseCase = makeSearchGymsUseCase()
  const { gyms } = await searchGymUseCase.execute({ search: q, page })

  return reply.status(200).send({ gyms })
}