import type { Gym } from "@/generated/prisma/client.js";
import type { GymsRepository } from "@/repositories/gyms-repository.js";

interface SearchGymsRequest {
  search: string,
  page: number
}

interface SearchGymsResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) { }

  async execute({ search, page }: SearchGymsRequest): Promise<SearchGymsResponse> {
    const gyms = await this.gymsRepository.findMany(search, page)

    return { gyms }
  }
}