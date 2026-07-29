import type { CheckIn } from "@/generated/prisma/client.js";
import type { CheckInUncheckedCreateInput } from "@/generated/prisma/models.js";
import type { CheckInsRepository } from "../checkins-repository.js";
import { prisma } from "@/lib/prisma.js";
import dayjs from "dayjs";

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: CheckInUncheckedCreateInput) {
    return prisma.checkIn.create({ data })
  }

  async save(data: CheckIn) {
    return prisma.checkIn.update({ where: { id: data.id }, data })
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    return prisma.checkIn.findFirst({ where: { user_id: userId, created_at: { gte: startOfTheDay.toDate(), lte: endOfTheDay.toDate() } } })
  }

  async findManyByUserId(userId: string, page: number) {
    return prisma.checkIn.findMany({ where: { user_id: userId }, take: 20, skip: (page - 1) * 20 })
  }

  async countByUserId(userId: string) {
    return prisma.checkIn.count({ where: { user_id: userId } })
  }

  async findById(checkInId: string) {
    return await prisma.checkIn.findUnique({ where: { id: checkInId } })
  }
}