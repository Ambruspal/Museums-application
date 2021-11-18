import { Exhibition } from "./Exhibition";

export type Museum = {
    id?: number,
    name: string,
    city: string,
    zip: string,
    address: string,
    openingHours: string,
    description: string
    exhibitions: Exhibition[]
}