import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository.js"
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms.js"

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    inMemoryGymsRepository.gyms = []
  })

  it('Should be able to search nearby gyms', async () => {
    sut = new FetchNearbyGymsUseCase(inMemoryGymsRepository)

    await inMemoryGymsRepository.create({
      title: `Reserva do Mar`,
      latitude: -12.909389413308896,
      longitude: -38.448394649062394
    })

    await inMemoryGymsRepository.create({
      title: `CT Evolução`,
      latitude: -14.785209496107305,
      longitude: -39.04284378465796
    })

    const { gyms } = await sut.execute({
      userLatitude: -12.910226024723903,
      userLongitude: -38.44895254850889
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Reserva do Mar' }),
    ])
  })
})