import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-checkins-repository.js"
import { ValidateCheckInUseCase } from "../validate-checkin.js"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"

let checkinsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check In Use Case', () => {
  beforeEach(() => {
    checkinsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkinsRepository)

    // vi.useFakeTimers()
  })

  it('Should be able to validate check in', async () => {
    const createdCheckIn = await checkinsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    })

    const { checkIn } = await sut.execute({ checkInId: createdCheckIn.id })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkinsRepository.checkins[0]?.validated_at).toEqual(expect.any(Date))
  })

  it('Should be not able to validate a inexistent check in', async () => {
    await expect(() =>
      sut.execute({ checkInId: 'inexistent-id' })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})