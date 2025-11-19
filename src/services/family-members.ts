import { api, endpoints } from "./api";
import type { AddressResponse } from "../types/address";
import type { CreateAddressData, CreateFamilyMemberData, FamilyMemberResponse } from "../types/family-member";
import type { Id } from "../types/id";

export async function createFamilyMember(data: CreateFamilyMemberData): Promise<FamilyMemberResponse> {
  try {
    const response = await api.post<FamilyMemberResponse>(endpoints.familyMembers.base, data);
    return response.data;
  } catch {
    throw new Error("Error on servicesCreateFamilyMember");
  }
}

export async function createFamilyMemberAddress(
  familyMemberId: Id,
  addressData: CreateAddressData
): Promise<void> {
  try {
    await api.post(endpoints.familyMembers.addressById(familyMemberId), addressData);
  } catch {
    throw new Error("Error on servicesCreateFamilyMemberAddress");
  }
}
  
export async function updateFamilyMember(
  familyMemberId: Id,
  data: Partial<CreateFamilyMemberData>
): Promise<void> {
  try {
    await api.patch(endpoints.familyMembers.byId(familyMemberId), data);
  } catch {
    throw new Error("Error on servicesUpdateFamilyMember");
  }
}

export async function updateFamilyMemberAddress(
  familyMemberId: Id,
  addressData: Partial<CreateAddressData>
): Promise<void> {
  try {
    const address = await getFamilyMemberAddress(familyMemberId);
    
    if (!address || !address.id) {
      throw new Error("Address not found");
    }
    
    await api.patch(endpoints.address.byId(address.id), addressData);
  } catch {
    throw new Error("Error on servicesUpdateFamilyMemberAddress");
  }
}

export async function deleteFamilyMember(familyMemberId: Id): Promise<void> {
  try {
    await api.delete(endpoints.familyMembers.byId(familyMemberId));
  } catch {
    throw new Error("Error on servicesDeleteFamilyMember");
  }
}

export async function deleteFamilyMemberAddress(familyMemberId: Id): Promise<void> {
  try {
    await api.delete(endpoints.familyMembers.addressById(familyMemberId));
  } catch {
    throw new Error("Error on servicesDeleteFamilyMemberAddress");
  }
}

export async function getFamilyMemberById(familyMemberId: Id): Promise<CreateFamilyMemberData> {
  try {
    const response = await api.get<CreateFamilyMemberData>(endpoints.familyMembers.byId(familyMemberId));
    return response.data;
  } catch {
    throw new Error("Error on servicesGetFamilyMemberById");
  }
}

export async function getFamilyMemberAddress(familyMemberId: Id): Promise<AddressResponse | null> {
  try {
    const response = await api.get<AddressResponse>(endpoints.familyMembers.addressById(familyMemberId));
    return response.data;
  } catch {
    throw new Error("Error on servicesGetFamilyMemberAddress");
  }
}