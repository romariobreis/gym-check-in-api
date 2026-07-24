import type { UsersRepository } from "@/repositories/users-repository.js"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error.js"

interface RegisterRequest {
  name: string,
  email: string,
  password: string
}

export class RegisterService {
  constructor(private usersRepository: UsersRepository) { }

  async registerUser({ name, email, password }: RegisterRequest) {
    const password_hash = await hash(password, 6)

    const emailExits = await this.usersRepository.findByEmail(email)

    if (emailExits) {
      throw new UserAlreadyExistsError()
    }

    await this.usersRepository.create({ name, email, password_hash })
  }
}
