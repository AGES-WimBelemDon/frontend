import type { Id } from "./id";

export type Address = {
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export type AddressResponse = Address & {
  id: Id;
  number?: string;
}
