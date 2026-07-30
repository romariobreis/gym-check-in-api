import { describe, expect, it } from "vitest";
import request from "supertest"
import { app } from "@/app.js";

describe('Refresh token (e2e)', () => {
  it('should be able to refresh token', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: '123456'
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'john.doe@email.com',
      password: '123456'
    })

    const cookie = authResponse.get('Set-Cookie')

    if (!cookie) {
      throw new Error()
    }

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookie)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String)
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken=')
    ])
  })
})