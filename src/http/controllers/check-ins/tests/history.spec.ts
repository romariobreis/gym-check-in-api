import { describe, expect, it } from "vitest";
import request from "supertest"
import { app } from "@/app.js";
import { createAuthenticateUser } from "@/use-cases/utils/test/create-authenticate-user.js";
import { prisma } from "@/lib/prisma.js";

describe('Get check in history (e2e)', () => {
  it('should be able to get check in history', async () => {
    const { token } = await createAuthenticateUser(app)
    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'gym-01',
        latitude: -12.910226024723903,
        longitude: -38.44895254850889
      }
    })

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: user.id
        },
        {
          gym_id: gym.id,
          user_id: user.id
        }
      ]
    })

    const response = await request(app.server)
      .get(`/check-ins/history`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkIns).toHaveLength(2)
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        gym_id: gym.id,
        user_id: user.id
      }),
      expect.objectContaining({
        gym_id: gym.id,
        user_id: user.id
      })
    ])
  })
})