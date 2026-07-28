import { Prisma, type Gym } from "@/generated/prisma/client.js";
import type { FindManyNearbyParams, GymsRepository } from "../gyms-repository.js";
import type { GymCreateInput } from "@/generated/prisma/models.js";
import { randomUUID } from "node:crypto";
import { getDistanceBetweenCoordinates } from "@/use-cases/utils/get-distance-between-coordinates.js";

export class InMemoryGymsRepository implements GymsRepository {
  async create(data: GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString())
    }

    this.gyms.push(gym)

    return gym
  }
  public gyms: Gym[] = []

  async findById(id: string) {
    const gym = this.gyms.find(gym => gym.id === id)

    return gym ?? null
  }

  async findMany(search: string, page: number) {
    return this.gyms.filter(gym => gym.title.includes(search)).slice((page - 1) * 20, page * 20)
  }

  async findManyNearby(params: FindManyNearbyParams) {
    return this.gyms.filter(gym => {
      const distance = getDistanceBetweenCoordinates({ latitude: params.latitude, longitude: params.longitude }, { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() })
      return distance < 10
    })
  }
}