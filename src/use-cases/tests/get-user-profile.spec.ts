import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository.js"
import { hash } from "bcryptjs"
import { GetUserProfileUseCase } from "../get-user-profile.js"
import { ResourceNotFoundError } from "../errors/resource-not-found-error.js"

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })
  it('Should be able to get a user profile', async () => {

    const newUser = await usersRepository.create({
      name: 'Dilton Menezes',
      email: 'dilton.menezes@email.com',
      password_hash: await hash('123456', 6)
    })

    const { user } = await sut.execute({ userId: newUser.id })

    expect(user.id).toEqual(expect.any(String))
    expect(user.password_hash).toEqual(expect.any(String))
    expect(user.name).toEqual('Dilton Menezes')
    expect(user.email).toEqual('dilton.menezes@email.com')
    expect(user.created_at).toEqual(expect.any(Date))
  })

  it('Should be not able to get a user profile with invalid id', async () => {
    await expect(() => sut.execute({
      userId: 'non-existing-id'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})