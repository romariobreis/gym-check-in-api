import { describe, expect, it } from "vitest";
import request from "supertest"
import { app } from "@/app.js";
import { createAuthenticateUser } from "@/use-cases/utils/test/create-authenticate-user.js";

describe('Create gym (e2e)', () => {
  it('should be able to create a gym', async () => {
    const { token } = await createAuthenticateUser(app)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Node Academy',
        description: 'Node Academy',
        phone: '987654321',
        latitude: -12.910226024723903,
        longitude: -38.44895254850889
      })

    expect(response.statusCode).toEqual(201)
  })
})