import type { CheckIn } from "@/generated/prisma/client.js";
import type { CheckInsRepository } from "@/repositories/checkins-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";
import dayjs from "dayjs";
import { LateCheckInValidionError } from "./errors/late-checkin-validation-error.js";

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

    const minutesAfterCheckIn = dayjs(new Date()).diff(checkIn.created_at, 'minute')

    if (minutesAfterCheckIn > 20) {
      throw new LateCheckInValidionError()
    }

    checkIn.validated_at = new Date()

    await this.checkinsRepository.save(checkIn)

    return { checkIn }
  }
}