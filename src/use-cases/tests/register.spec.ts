import { beforeEach, describe, expect, it } from "vitest"
import { RegisterUseCase } from "../register.js"
import { compare } from "bcryptjs"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository.js"
import { UserAlreadyExistsError } from "../errors/user-already-exists-error.js"

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })
  it('Should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Dilton Menezes',
      email: 'dilton.menezes@email.com',
      password: '123456'
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)

    expect(user.id).toEqual(expect.any(String))
    expect(isPasswordCorrectlyHashed).toBe(true)
    expect(user.name).toEqual('Dilton Menezes')
    expect(user.email).toEqual('dilton.menezes@email.com')
    expect(user.created_at).toEqual(expect.any(Date))
  })

  it('Should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Dilton Menezes',
      email: 'dilton.menezes@email.com',
      password: '123456'
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('Should not be able to register with duplicated email', async () => {
    await sut.execute({
      name: 'Dilton Menezes',
      email: 'dilton.menezes@email.com',
      password: '123456'
    })

    await expect(() =>
      sut.execute({
        name: 'Dilton Menezes',
        email: 'dilton.menezes@email.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})