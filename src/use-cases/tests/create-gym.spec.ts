import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository.js"
import { CreateGymUseCase } from "../create-gym.js"

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })
  it('Should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Academia',
      description: '',
      phone: '',
      latitude: -12.910290,
      longitude: -38.449043
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})