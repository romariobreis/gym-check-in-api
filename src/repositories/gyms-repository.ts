import type { Gym, Prisma } from "@/generated/prisma/client.js";

export interface FindManyNearbyParams {
  latitude: number,
  longitude: number
}

export interface GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  findById(id: string): Promise<Gym | null>
  findMany(search: string, page: number): Promise<Gym[]>;
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>;
}