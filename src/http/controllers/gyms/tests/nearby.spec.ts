import { describe, expect, it } from "vitest";
import request from "supertest"
import { app } from "@/app.js";
import { createAuthenticateUser } from "@/use-cases/utils/test/create-authenticate-user.js";

describe('Nearby gym (e2e)', () => {
  it('should be able to list nearby gyms', async () => {
    const { token } = await createAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Reserva do Mar',
        description: 'Reserva do Mar',
        phone: '987654321',
        latitude: -12.909389413308896,
        longitude: -38.448394649062394
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'CT Evolução',
        description: 'CT Evolução',
        phone: '123456789',
        latitude: -14.785209496107305,
        longitude: -39.04284378465796
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -12.909389413308896,
        longitude: -38.448394649062394
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Reserva do Mar'
      })
    ])
  })
})