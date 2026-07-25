import type { UsersRepository } from "@/repositories/users-repository.js"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error.js"
import type { User } from "@/generated/prisma/client.js"

interface RegisterRequest {
  name: string,
  email: string,
  password: string
}

interface RegisterResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ name, email, password }: RegisterRequest): Promise<RegisterResponse> {
    const password_hash = await hash(password, 6)

    const emailExits = await this.usersRepository.findByEmail(email)

    if (emailExits) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({ name, email, password_hash })

    return { user }
  }
}
