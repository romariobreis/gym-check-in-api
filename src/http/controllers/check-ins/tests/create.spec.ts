import { describe, expect, it } from "vitest";
import request from "supertest"
import { app } from "@/app.js";
import { createAuthenticateUser } from "@/use-cases/utils/test/create-authenticate-user.js";
import { prisma } from "@/lib/prisma.js";

describe('Create check in (e2e)', () => {
  it('should be able to create a check in', async () => {
    const { token } = await createAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'gym-01',
        latitude: -12.910226024723903,
        longitude: -38.44895254850889
      }
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -12.910226024723903,
        longitude: -38.44895254850889
      })

    expect(response.statusCode).toEqual(201)
  })
})