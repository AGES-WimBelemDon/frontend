import type { Id } from "./id";
import type { Classes } from "../components/ClassesModal/interface";

export type ApiClass = {
  id: Id;
} & Classes;

export type StudentFrequency = {
  id: Id;
  name: string;
  frequency: number;
}
