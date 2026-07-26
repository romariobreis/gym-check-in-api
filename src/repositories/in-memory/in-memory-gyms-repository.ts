import type { Gym } from "@/generated/prisma/client.js";
import type { GymsRepository } from "../gyms-repository.js";

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = []

  async findById(id: string) {
    const gym = this.gyms.find(gym => gym.id === id)

    return gym ?? null
  }
}