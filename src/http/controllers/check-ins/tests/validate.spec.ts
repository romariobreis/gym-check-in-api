import { describe, expect, it } from "vitest";
import request from "supertest"
import { app } from "@/app.js";
import { createAuthenticateUser } from "@/use-cases/utils/test/create-authenticate-user.js";
import { prisma } from "@/lib/prisma.js";

describe('Create check in (e2e)', () => {
  it('should be able to create a check in', async () => {
    const { token } = await createAuthenticateUser(app)
    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'gym-01',
        latitude: -12.910226024723903,
        longitude: -38.44895254850889
      }
    })

    const checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id
      }
    })

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)

    const checkInUpdated = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id
      }
    })

    expect(checkInUpdated.validated_at).toEqual(expect.any(Date))
  })
})