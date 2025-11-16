export interface PersonCardProps {
  id?: string;
  fullName: string;
  socialName?: string;
  registrationNumber: string;
  dateOfBirth: string;
  nis: string;
  phoneNumber: string;
  email: string;
  address: string;
  relationship: string;
  race: string;
  gender: string;
  educationLevel: string;
  socialPrograms: string;
  employmentStatus: string;
  onEditClick?: (id: string) => void;
}
