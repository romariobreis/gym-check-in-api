import { beforeEach, afterEach, describe, expect, it, vi } from "vitest"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-checkins-repository.js"
import { CheckInUseCase } from "../checkin.js"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository.js"
import { Decimal } from "@prisma/client/runtime/client"

let checkinsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check In Use Case', () => {
  beforeEach(() => {
    checkinsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkinsRepository, gymsRepository)

    gymsRepository.gyms.push({
      id: 'gym-01',
      description: '',
      title: 'Node Academy',
      phone: '',
      latitude: new Decimal(-12.910290),
      longitude: new Decimal(-38.449043)
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -12.9071893,
      userLongitude: -38.4534453
    })

    expect(checkIn.id).toEqual(expect.any(String))
    expect(checkIn.gym_id).toEqual(expect.any(String))
    expect(checkIn.user_id).toEqual(expect.any(String))
  })

  it('Should not be able to check in twice in same day', async () => {
    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -12.9071893,
      userLongitude: -38.4534453
    })

    await expect(() =>
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: -12.9071893,
        userLongitude: -38.4534453
      })
    ).rejects.toBeInstanceOf(Error)
  })

  it('Should not be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2026, 7, 24, 9, 0, 0))
    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -12.9071893,
      userLongitude: -38.4534453
    })

    vi.setSystemTime(new Date(2026, 7, 25, 8, 0, 0))
    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -12.9071893,
      userLongitude: -38.4534453
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('Should not be able to check in distant gym', async () => {
    gymsRepository.gyms.push({
      id: 'gym-02',
      description: '',
      title: 'Typescript Academy',
      phone: '',
      latitude: new Decimal(-13.008179),
      longitude: new Decimal(-38.478787)
    })

    await expect(() =>
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-02',
        userLatitude: -12.9071893,
        userLongitude: -38.4534453
      })
    ).rejects.toBeInstanceOf(Error)
  })
})