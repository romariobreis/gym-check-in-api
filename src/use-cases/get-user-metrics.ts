import type { CheckInsRepository } from "@/repositories/checkins-repository.js";

interface GetMetricsRequest {
  userId: string,
}

interface GetMetricsResponse {
  checkInsCount: number
}

export class GetMetricsUseCase {
  constructor(private checkinsRepository: CheckInsRepository) { }

  async execute({ userId }: GetMetricsRequest): Promise<GetMetricsResponse> {
    const checkInsCount = await this.checkinsRepository.countByUserId(userId)

    return { checkInsCount }
  }
}