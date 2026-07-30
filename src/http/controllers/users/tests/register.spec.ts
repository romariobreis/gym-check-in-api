import { describe, expect, it } from "vitest";
import request from "supertest"
import { app } from "@/app.js";

describe('Register user (e2e)', () => {
  it('should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johnn.doe@email.com',
      password: '123456'
    })

    expect(response.statusCode).toEqual(201)
  })
})