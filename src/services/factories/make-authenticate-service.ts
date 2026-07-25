import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js"
import { AuthenticateService } from "../authenticate-service.js"

export function makeAuthenticateService() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateService = new AuthenticateService(usersRepository)

  return authenticateService
}