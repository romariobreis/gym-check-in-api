import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository.js"
import { ValidateCheckInUseCase } from "../validate-checkin.js"

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInUseCase(checkInsRepository)

  return useCase
}