import type { Id } from "./id";

export type CreateFamilyMemberData = {
  fullName: string;
  relationship: string;
  phoneNumber: string;
  studentIds: Id[];
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
  id: Id;
};
