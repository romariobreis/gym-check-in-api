import type { CheckIn } from "@/generated/prisma/client.js";
import type { CheckInsRepository } from "@/repositories/checkins-repository.js";

interface FetchUserCheckInsHistoryRequest {
  userId: string,
  page: number
}

interface FetchUserCheckInsHistoryResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkinsRepository: CheckInsRepository) { }

  async execute({ userId, page }: FetchUserCheckInsHistoryRequest): Promise<FetchUserCheckInsHistoryResponse> {
    const checkIns = await this.checkinsRepository.findManyByUserId(userId, page)

    return { checkIns }
  }
}