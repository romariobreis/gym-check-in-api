import { beforeEach, afterEach, describe, expect, it, vi } from "vitest"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-checkins-repository.js"
import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-checkins-history.js"

let checkinsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Check In Use Case', () => {
  beforeEach(async () => {
    checkinsRepository = new InMemoryCheckInsRepository()

    for (let index = 1; index <= 22; index++) {
      await checkinsRepository.create({
        user_id: 'user-01',
        gym_id: `gym-${index}`
      })
    }
  })

  it('Should be able to get user history checkin', async () => {
    sut = new FetchUserCheckInsHistoryUseCase(checkinsRepository)
    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2
    })

    expect(checkIns).toHaveLength(2)
  })
})