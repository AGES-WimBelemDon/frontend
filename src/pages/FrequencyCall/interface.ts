import type { FrequencyCardStudent } from "../../components/FrequencyCard/interface";

export interface FrequencyCallObject {
    students: FrequencyCardStudent[],
    date: string,
}