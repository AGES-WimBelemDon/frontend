import type { Address } from "../types/address";


export function formatAddress(address: Address): string {
  return `${address.street}, ${address.number}${address.complement ? `, ${address.complement}` : ""} - ${address.neighborhood}, ${address.city} - ${address.state}, ${address.cep}`;
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
