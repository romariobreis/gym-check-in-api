import fastify from "fastify";
import { usersRoutes } from "./http/controllers/users/routes.js";
import z, { ZodError } from "zod";
import { env } from "./env/index.js";
import fastifyJwt from "@fastify/jwt";
import { gymsRoutes } from "./http/controllers/gyms/routes.js";
import { checkInsRoutes } from "./http/controllers/check-ins/routes.js";

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET
})

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: "Validation error.", issues: z.treeifyError(error) })
  }

  if (env.NODE_ENV !== "production") {
    console.log(error)
  } else {
    //TODO: HERE WE SHOULD LOG TO EXTERNAL TOOL LIKE DATADOG/NEWRELIC/SENTRY
  }

  return reply.status(500).send({ message: "Internal server error." })
})