import { api, endpoints } from "./api";
import type { AddressResponse } from "../types/address";

export type CreateFamilyMemberData = {
  fullName: string;
  relationship: string;
  phoneNumber: string;
  studentIds: number[];
  socialName?: string;
  gender?: string;
  educationLevel?: string;
  dateOfBirth: string;
  socialPrograms?: string;
  registrationNumber: string;
  email?: string;
  race?: string;
  employmentStatus?: string;
  nis?: string;
};

export type CreateAddressData = {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  number: string;
  complement?: string;
};

export type FamilyMemberResponse = {
  id: string;
};

export async function createFamilyMember(data: CreateFamilyMemberData): Promise<FamilyMemberResponse> {
  try {
    console.log("Creating family member with data:", data);
    const response = await api.post<FamilyMemberResponse>(endpoints.familyMembers.base, data);
    return response.data;
  } catch (error) {
    console.error("API Error in createFamilyMember:", error);
    throw error;
  }
}

export async function createFamilyMemberAddress(
  familyMemberId: string | number,
  addressData: CreateAddressData
): Promise<void> {
  try {
    console.log(`Creating address for family member ID ${familyMemberId} with data:`, addressData);
    await api.post(endpoints.familyMembers.addressById(familyMemberId), addressData);
  } catch {
    throw new Error("Error creating family member address");
  }
}
export async function updateFamilyMember(
  familyMemberId: string,
  data: Partial<CreateFamilyMemberData>
): Promise<void> {
  try {
    await api.patch(endpoints.familyMembers.byId(familyMemberId), data);
  } catch {
    throw new Error("Failed to update family member");
  }
}

export async function updateFamilyMemberAddress(
  familyMemberId: string,
  addressData: Partial<CreateAddressData>
): Promise<void> {
  try {
    const address = await getFamilyMemberAddress(familyMemberId);
    
    if (!address || !address.id) {
      throw new Error("Address not found");
    }
    
    await api.patch(endpoints.address.byId(address.id), addressData);
  } catch {
    throw new Error("Failed to update family member address");
  }
}

export async function deleteFamilyMember(familyMemberId: string): Promise<void> {
  try {
    await api.delete(endpoints.familyMembers.byId(familyMemberId));
  } catch {
    throw new Error("Failed to delete family member");
  }
}

export async function deleteFamilyMemberAddress(familyMemberId: string): Promise<void> {
  try {
    await api.delete(endpoints.familyMembers.addressById(familyMemberId));
  } catch {
    throw new Error("Failed to delete family member address");
  }
}

export async function getFamilyMemberById(familyMemberId: string): Promise<CreateFamilyMemberData> {
  try {
    const response = await api.get<CreateFamilyMemberData>(endpoints.familyMembers.byId(familyMemberId));
    return response.data;
  } catch {
    throw new Error("Error loading responsible");
  }
}

export async function getFamilyMemberAddress(familyMemberId: string): Promise<AddressResponse | null> {
  try {
    const response = await api.get<AddressResponse>(endpoints.familyMembers.addressById(familyMemberId));
    return response.data;
  } catch {
    return null;
  }
}