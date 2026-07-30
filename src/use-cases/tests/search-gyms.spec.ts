import { beforeEach, afterEach, describe, expect, it, vi } from "vitest"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository.js"
import { SearchGymsUseCase } from "../search-gyms.js"

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    inMemoryGymsRepository = new InMemoryGymsRepository()

    for (let index = 1; index <= 3; index++) {
      await inMemoryGymsRepository.create({
        title: `Gym ${index === 1 ? 'Javascript' : 'Typescript'}`,
        latitude: -12.910290,
        longitude: -38.449043
      })
    }
  })

  it('Should be able to search gyms by title', async () => {
    sut = new SearchGymsUseCase(inMemoryGymsRepository)
    const { gyms } = await sut.execute({
      search: 'Javascript',
      page: 1
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym Javascript' }),
    ])
  })
})