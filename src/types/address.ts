import type { Id } from "./id";

export type Address = {
  code: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface AddressResponse {
  id: Id;
  street: string;
  city: string;
  state: string;
  cep: string;
  neighborhood: string;
  number?: string;
  complement?: string;
}
