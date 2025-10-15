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
  id: string;
  street: string;
  city: string;
  state: string;
  cep: string;
  neighborhood: string;
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
