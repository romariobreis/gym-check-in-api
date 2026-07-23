import type { UserCreateInput } from "@/generated/prisma/models.js";
import { prisma } from "@/lib/prisma.js";

export class PrismaUsersRepository {
  async create(data: UserCreateInput) {
    return await prisma.user.create({ data })
  }
}