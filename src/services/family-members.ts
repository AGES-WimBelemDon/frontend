import { api, endpoints } from "./api";

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