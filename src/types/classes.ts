import type { Classes } from "../components/ClassesModal/interface";

export type ApiClass = {
  id: number;
} & Classes;

export type StudentFrequency = {
  id: number;
  name: string;
  frequency: number;
}
