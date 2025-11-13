export type Address = {
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface AddressResponse {
  id: string;
  street: string;
  city: string;
  state: string;
  cep: string;
  neighborhood: string;
  number?: string;
  complement?: string;
}
