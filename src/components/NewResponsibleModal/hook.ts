import { useState } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import type { ResponsibleData } from "./interface";
import { strings } from "../../constants";
import { useFilters } from "../../hooks/useFilters";
import { useScreenSize } from "../../hooks/useScreenSize";
import { useToast } from "../../hooks/useToast";
import { fetchAddress, type Address } from "../../services/address";
import { createFamilyMember, createFamilyMemberAddress } from "../../services/family-members";

export function useNewResponsibleModal(studentId?: string) {
  const { showToast } = useToast();
  const { isMobile } = useScreenSize();
  const queryClient = useQueryClient();
  const [address, setAddress] = useState<Partial<Address> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<ResponsibleData>>({});
  const { 
    civilStateOptions,
    raceOptions,
    genderOptions,
    educationLevelOptions,
    socialProgramsOptions,
    employmentStatusOptions 
  } = useFilters();
  
  const [searchParams, setSearchParams] = useSearchParams();

  const isOpen = searchParams.get("action") === "open-new-responsible-modal";

  function openModal() {
    const params = new URLSearchParams(searchParams);
    params.set("action", "open-new-responsible-modal");
    setSearchParams(params);
  };

  function closeModal() {
    const params = new URLSearchParams();
    setSearchParams(params);
  };

  function getAddressDetails() {
    if (!address?.code) {
      return Promise.resolve(null);
    }
  
    if (address.code.length !== 8) {
      return Promise.resolve(null);
    }
  
    return fetchAddress(address.code).then((addressData) => {
      if (addressData) {
        setAddress(prev => ({ ...prev, ...addressData }));
      }
      return addressData;
    });
  }
    
  useQuery({
    queryKey: ["address", address?.code],
    queryFn: getAddressDetails,
    enabled: !!address?.code && address.code.length === 8,
  })
  
  async function addResponsible(e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const familyMemberData = Object.fromEntries(formData.entries()) as ResponsibleData;
    
    console.log("== Form data:", familyMemberData);
    console.log("== Address state:", address);

    if(!familyMemberData.fullName){
      showToast(strings.newResponsibleModal.requiredFields.fullName, "error");
      return;
    }

    if(!familyMemberData.registrationNumber){
      showToast(strings.newResponsibleModal.requiredFields.registrationNumber, "error");
      return;
    }

    if(!familyMemberData.dateOfBirth){
      showToast(strings.newResponsibleModal.requiredFields.birthDate, "error");
      return;
    }

    if(!familyMemberData.phoneNumber){
      showToast(strings.newResponsibleModal.requiredFields.phone, "error");
      return;
    }

    if(!familyMemberData.relationship){
      showToast(strings.newResponsibleModal.requiredFields.relationship, "error");
      return;
    }

    if(!address?.code || address.code.length !== 8){
      showToast(strings.newResponsibleModal.requiredFields.cep, "error");
      return;
    }

    if(!address?.number){
      showToast(strings.newResponsibleModal.requiredFields.number, "error");
      return;
    }

    if(!address?.street || !address?.city || !address?.state || !address?.neighborhood){
      showToast("Por favor, aguarde o carregamento do endereço completo", "error");
      return;
    }

    if (!studentId) {
      showToast("Student ID is required", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const familyMemberPayload = {
        fullName: familyMemberData.fullName,
        relationship: familyMemberData.relationship,
        phoneNumber: familyMemberData.phoneNumber,
        studentIds: [parseInt(studentId)],
        socialName: familyMemberData.socialName || undefined,
        gender: familyMemberData.gender || undefined,
        educationLevel: familyMemberData.educationLevel || undefined,
        dateOfBirth: familyMemberData.dateOfBirth,
        socialPrograms: familyMemberData.socialPrograms || undefined,
        registrationNumber: familyMemberData.registrationNumber,
        email: familyMemberData.email || undefined,
        race: familyMemberData.race || undefined,
        employmentStatus: familyMemberData.employmentStatus || undefined,
        nis: familyMemberData.nis || undefined,
      };

      console.log("Creating family member with payload:", familyMemberPayload);

      const familyMemberResponse = await createFamilyMember(familyMemberPayload);
      console.log("Family member created with ID:", familyMemberResponse.id);

      const addressPayload = {
        street: address.street!,
        neighborhood: address.neighborhood!,
        city: address.city!,
        state: address.state!,
        cep: address.code!,
        number: address.number!,
        complement: address.complement || undefined,
      };

      console.log("Creating address with payload:", addressPayload);

      await createFamilyMemberAddress(familyMemberResponse.id, addressPayload);
      console.log("Address created successfully");

      showToast(strings.newResponsibleModal.successMessage, "success");
    
      await queryClient.invalidateQueries({ 
        queryKey: ["responsibles", studentId] 
      });

      setAddress(null);
      closeModal();
    } catch (error) {
      console.error("Error creating responsible:", error);
      console.error("Full error details:", JSON.stringify(error, null, 2));
      if (error instanceof Error && "response" in error) {
        console.error("API Response:", (error as { response?: { data: unknown } }).response?.data);
      }
      showToast("Erro ao criar responsável. Por favor, tente novamente.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof ResponsibleData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const clearForm = () => {
    setFormData({});
  };

  return {
    isOpen,
    openModal,
    closeModal,
    isMobile,
    civilStateOptions,
    raceOptions,
    genderOptions,
    educationLevelOptions,
    socialProgramsOptions,
    employmentStatusOptions,
    addResponsible,
    isSubmitting,
    formData,
    address,
    setAddress,
    updateField,
    clearForm,
  };
}
