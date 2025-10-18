import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";


import type { ResponsibleData } from "./interface";
import { strings } from "../../constants";
import { useFilters } from "../../hooks/useFilters";
import { useScreenSize } from "../../hooks/useScreenSize";
import { useToast } from "../../hooks/useToast";
import { fetchAddress, type Address } from "../../services/address";
import { createFamilyMember, createFamilyMemberAddress } from "../../services/family-members";
import { useDateInput } from "../Inputs/DateInput/hook";
import { useSelectInput } from "../Inputs/SelectInput/hook";
import { useTextInput } from "../Inputs/TextInput/hook";

export function useNewResponsibleModal(studentId?: string) {
  const { showToast } = useToast();
  const { getText } = useTextInput();
  const { isMobile } = useScreenSize();
  const { getSelect } = useSelectInput();
  const { getDate } = useDateInput();
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
  
    fetchAddress(address.code).then(setAddress);
  }
    
  useQuery({
    queryKey: ["address", address?.code],
    queryFn: getAddressDetails,
  })
  
  function getResponsibleFields(): ResponsibleData | undefined {
    const fullName = getText("responsible-fullName");
    const socialName = getText("responsible-socialName");
    const registrationNumber = getText("responsible-registrationNumber");
    const dateOfBirth = getDate("responsible-dateOfBirth");
    const nis = getText("responsible-nis");
    const phoneNumber = getText("responsible-phoneNumber");
    const email = getText("responsible-email");
    const relationship = getText("responsible-relationship");
    const race = getSelect("responsible-race");
    const gender = getSelect("responsible-gender");
    const educationLevel = getSelect("responsible-educationLevel");
    const socialPrograms = getSelect("responsible-socialPrograms");
    const employmentStatus = getSelect("responsible-employmentStatus");
    const street = getText("responsible-street");
    const neighborhood = getText("responsible-neighborhood");
    const city = getText("responsible-city");
    const state = getText("responsible-state");
    const cep = getText("responsible-cep");
    const number = getText("responsible-number");
    const complement = getText("responsible-complement");

    if (
      fullName !== "" &&
      registrationNumber !== "" &&
      dateOfBirth !== "" &&
      phoneNumber !== "" &&
      relationship !== "" &&
      street !== "" &&
      neighborhood !== "" &&
      city !== "" &&
      state !== "" &&
      cep !== "" &&
      number !== ""
    ) {
      return {
        fullName,
        socialName: socialName || undefined,
        registrationNumber,
        dateOfBirth,
        nis: nis || undefined,
        phoneNumber,
        email: email || undefined,
        relationship,
        race: race || undefined,
        gender: gender || undefined,
        educationLevel: educationLevel || undefined,
        socialPrograms: socialPrograms || undefined,
        employmentStatus: employmentStatus || undefined,
        street,
        neighborhood,
        city,
        state,
        cep,
        number,
        complement: complement || undefined,
      };
    }
  };
  
  async function addResponsible() {
    const responsible = getResponsibleFields();
    console.log("Responsible fields:", responsible);

    if (!responsible) {
      showToast(strings.newResponsibleModal.pleaseFillAllFields, "error");
      return;
    }

    if (!studentId) {
      showToast("Student ID is required", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const familyMemberData = {
        fullName: responsible.fullName,
        relationship: responsible.relationship,
        phoneNumber: responsible.phoneNumber,
        studentIds: [parseInt(studentId)],
        dateOfBirth: responsible.dateOfBirth,
        registrationNumber: responsible.registrationNumber,
        ...(responsible.socialName && { socialName: responsible.socialName }),
        ...(responsible.gender && { gender: responsible.gender }),
        ...(responsible.educationLevel && { educationLevel: responsible.educationLevel }),
        ...(responsible.socialPrograms && { socialPrograms: responsible.socialPrograms }),
        ...(responsible.email && responsible.email.includes("@") && responsible.email.includes(".") && { email: responsible.email }),
        ...(responsible.race && { race: responsible.race }),
        ...(responsible.employmentStatus && { employmentStatus: responsible.employmentStatus }),
        ...(responsible.nis && { nis: responsible.nis }),
      };

      console.log("Sending family member data:", JSON.stringify(familyMemberData, null, 2));
      const familyMemberResponse = await createFamilyMember(familyMemberData);

      const addressData = {
        street: responsible.street,
        neighborhood: responsible.neighborhood,
        city: responsible.city,
        state: responsible.state,
        cep: responsible.cep,
        number: responsible.number,
        ...(responsible.complement && { complement: responsible.complement }),
      };

      console.log("Sending address data:", JSON.stringify(addressData, null, 2));
      console.log("Family member ID:", familyMemberResponse.id);
      await createFamilyMemberAddress(familyMemberResponse.id, addressData);

      showToast(strings.newResponsibleModal.successMessage, "success");
      closeModal();
    } catch (error) {
      console.error("Error creating responsible:", error);
      console.error("Full error details:", JSON.stringify(error, null, 2));
      if (error instanceof Error && "response" in error) {
        console.error("API Response:", (error as { response?: { data: unknown } }).response?.data);
      }
      showToast("Error creating responsible. Please try again.", "error");
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
