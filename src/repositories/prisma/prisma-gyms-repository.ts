import type { GymCreateInput } from "@/generated/prisma/models.js";
import type { FindManyNearbyParams, GymsRepository } from "../gyms-repository.js";
import { prisma } from "@/lib/prisma.js";
import type { Gym } from "@/generated/prisma/client.js";

export class PrismaGymsRepository implements GymsRepository {
  async create(data: GymCreateInput) {
    return await prisma.gym.create({ data })
  }
  async findById(id: string) {
    return await prisma.gym.findUnique({ where: { id: id } })
  }
  async findMany(search: string, page: number) {
    return await prisma.gym.findMany({ where: { title: { contains: search } }, take: 20, skip: (page - 1) * 20 })
  }
  async findManyNearby(params: FindManyNearbyParams) {
    return await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${params.latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${params.longitude}) ) + sin( radians(${params.latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `
  }
}