import type { CheckIn, Prisma } from "@/generated/prisma/client.js";
import type { CheckInsRepository } from "../checkins-repository.js";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public checkins: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkin = {
      id: randomUUID(),
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      user_id: data.user_id,
      gym_id: data.gym_id
    }

    this.checkins.push(checkin)

    return checkin
  }

  async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkin = this.checkins.find(checkin => {
      const checkInDate = dayjs(checkin.created_at)
      const isSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)
      return checkin.user_id === userId && isSameDate
    })

    return checkin ?? null
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    return this.checkins.filter(checkin => checkin.user_id === userId).slice((page - 1) * 20, page * 20)
  }
}