import { Registration } from "./Registration";

export type Exhibition = {
    id?: number,
    title: string,
    fullPrice: number,
    description: string,
    capacity: number,
    start: string,
    end: string,
    registrations: Registration[]
};