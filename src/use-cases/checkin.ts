import type { CheckIn } from "@/generated/prisma/client.js";
import type { CheckInsRepository } from "@/repositories/checkins-repository.js";
import type { GymsRepository } from "@/repositories/gyms-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";
import { getDistanceBetweenCoordinates } from "./utils/get-distance-between-coordinates.js";
import { MaxDistanceError } from "./errors/max-distance-error.js";
import { MaxNumberOfCheckInError } from "./errors/max-number-of-checkins-error.ts.js";

interface CheckInRequest {
  userId: string,
  gymId: string,
  userLatitude: number,
  userLongitude: number
}

interface CheckInResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkinsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
  ) { }

  async execute({ userId, gymId, userLatitude, userLongitude }: CheckInRequest): Promise<CheckInResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinates({ latitude: userLatitude, longitude: userLongitude }, { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() })

    const MAX_DISTANCE_IN_KM = 1

    if (distance > MAX_DISTANCE_IN_KM) {
      throw new MaxDistanceError()
    }

    const hasCheckInToday = await this.checkinsRepository.findByUserIdOnDate(userId, new Date())

    if (hasCheckInToday) {
      throw new MaxNumberOfCheckInError()
    }

    const checkIn = await this.checkinsRepository.create({ user_id: userId, gym_id: gymId })

    return { checkIn }
  }
}