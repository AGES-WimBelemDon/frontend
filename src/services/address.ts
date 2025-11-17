import type { Address, AddressResponse } from "../types/address";


export function formatAddress(address: Address | AddressResponse): string {
  const fields = [address.street, address.number];
  if (address.complement) {
    fields.push(`, ${address.complement}`);
  }
  fields.push(` - ${address.neighborhood}`, `${address.city} - ${address.state}`)
  if ("cep" in address) {
    fields.push(address.cep);
  } else if ("code" in address) {
    fields.push(address.code);
  }
  return fields.join(", ");
}

export async function fetchAddress(cep: string): Promise<Partial<Address> | null> {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    
    return {
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf,
      street: data.logradouro,
      complement: data.complemento,
    };
  } catch (error) {
    console.error("Error fetching address:", error);
    return null;
  }
}
