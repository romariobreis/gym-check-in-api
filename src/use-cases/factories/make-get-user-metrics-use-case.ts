import { GetMetricsUseCase } from "../get-user-metrics.js"
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository.js"

export function makeGetMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new GetMetricsUseCase(checkInsRepository)

  return useCase
}