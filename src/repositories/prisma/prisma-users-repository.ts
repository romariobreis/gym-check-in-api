import { prisma } from "@/lib/prisma.js";
import type { UsersRepository } from "../users-repository.js";
import type { Prisma, User } from "@/generated/prisma/client.js";

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } })
  }
  async findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } })
  }
  async create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({ data })
  }
}