import type { CheckIn } from "@/generated/prisma/client.js";
import type { CheckInsRepository } from "@/repositories/checkins-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";

interface ValidateCheckInRequest {
  checkInId: string,
}

interface ValidateCheckInResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(
    private checkinsRepository: CheckInsRepository,
  ) { }

  async execute({ checkInId }: ValidateCheckInRequest): Promise<ValidateCheckInResponse> {
    const checkIn = await this.checkinsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    checkIn.validated_at = new Date()

    await this.checkinsRepository.save(checkIn)

    return { checkIn }
  }
}