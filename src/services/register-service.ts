import { prisma } from "@/lib/prisma.js"
import { hash } from "bcryptjs"

interface RegisterRequest {
  name: string,
  email: string,
  password: string
}

export class RegisterService {
  constructor(private usersRepository: any) { }

  async registerUser({ name, email, password }: RegisterRequest) {
    const password_hash = await hash(password, 6)

    const emailExits = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (emailExits) {
      throw new Error("Email already exists.")
    }

    await this.usersRepository.create({ name, email, password_hash })
  }
}
