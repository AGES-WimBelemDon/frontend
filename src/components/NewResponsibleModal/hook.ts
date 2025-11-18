import { useState, useEffect, useCallback } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import type { ResponsibleData } from "./interface";
import { strings } from "../../constants";
import { useFilters } from "../../hooks/useFilters";
import { useScreenSize } from "../../hooks/useScreenSize";
import { useToast } from "../../hooks/useToast";
import { fetchAddress } from "../../services/address";
import { 
  createFamilyMember, 
  createFamilyMemberAddress,
  updateFamilyMember,
  updateFamilyMemberAddress,
  getFamilyMemberById,
  getFamilyMemberAddress
} from "../../services/family-members";
import type { CreateFamilyMemberData } from "../../services/family-members";
import type { Address } from "../../types/address";

export function useNewResponsibleModal(studentId?: string) {
  const { showToast } = useToast();
  const { isMobile } = useScreenSize();
  const queryClient = useQueryClient();
  const [address, setAddress] = useState<Partial<Address> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<ResponsibleData>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
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
  const editId = searchParams.get("editId");

  const loadResponsibleData = useCallback(async (id: string) => {
    try {
      const [responsibleData, addressData] = await Promise.all([
        getFamilyMemberById(id),
        getFamilyMemberAddress(id)
      ]);

      let formattedDate = responsibleData.dateOfBirth;
      if (formattedDate) {
        if (formattedDate.includes("T")) {
          formattedDate = formattedDate.split("T")[0];
        }
        if (formattedDate.includes(" ")) {
          formattedDate = formattedDate.split(" ")[0];
        }
        const parsedDate = new Date(formattedDate);
        if (!isNaN(parsedDate.getTime())) {
          formattedDate = parsedDate.toISOString().split("T")[0];
        }
      }

      setFormData({
        fullName: responsibleData.fullName,
        socialName: responsibleData.socialName,
        registrationNumber: responsibleData.registrationNumber,
        dateOfBirth: formattedDate || "",
        nis: responsibleData.nis,
        phoneNumber: responsibleData.phoneNumber,
        email: responsibleData.email,
        relationship: responsibleData.relationship,
        race: responsibleData.race,
        gender: responsibleData.gender,
        educationLevel: responsibleData.educationLevel,
        socialPrograms: responsibleData.socialPrograms,
        employmentStatus: responsibleData.employmentStatus,
      });

      if (addressData && addressData.cep) {
        setAddress({
          code: addressData.cep,
          street: addressData.street,
          neighborhood: addressData.neighborhood,
          city: addressData.city,
          state: addressData.state,
          number: addressData.number,
          complement: addressData.complement,
        });
      }
    } catch (error) {
      console.error("Error loading responsible data:", error);
      showToast(strings.newResponsibleModal.errorLoadingResponsible, "error");
    }
  }, [showToast]);

  useEffect(() => {
    if (editId && isOpen) {
      setEditingId(editId);
      loadResponsibleData(editId);
    } else {
      setEditingId(null);
      setFormData({});
      setAddress(null);
    }
  }, [editId, isOpen, loadResponsibleData]);

  function openModal(editId?: string) {
    const params = new URLSearchParams(searchParams);
    params.set("action", "open-new-responsible-modal");
    if (editId) {
      params.set("editId", editId);
    } else {
      params.delete("editId");
    }
    setSearchParams(params);
  };

  function closeModal() {
    const params = new URLSearchParams();
    setSearchParams(params);
    setEditingId(null);
    setFormData({});
    setAddress(null);
  };

  function getAddressDetails() {
    if (!address?.cep) {
      return Promise.resolve(null);
    }
  
    if (address.cep.length !== 8) {
      return Promise.resolve(null);
    }
  
    return fetchAddress(address.cep).then((addressData) => {
      if (addressData) {
        setAddress(prev => ({ ...prev, ...addressData }));
      }
      return addressData;
    });
  }
    
  useQuery({
    queryKey: ["address", address?.cep],
    queryFn: getAddressDetails,
    enabled: !!address?.cep && address.cep.length === 8,
  })
  
  async function addResponsible(e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const familyMemberData = Object.fromEntries(formData.entries()) as ResponsibleData;
    
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

    if(!address?.cep || address.cep.length !== 8){
      showToast(strings.newResponsibleModal.requiredFields.cep, "error");
      return;
    }

    if(!address?.number){
      showToast(strings.newResponsibleModal.requiredFields.number, "error");
      return;
    }

    if(!address?.street || !address?.city || !address?.state || !address?.neighborhood){
      showToast(strings.newResponsibleModal.waitAddressLoading, "error");
      return;
    }

    if (!studentId) {
      showToast(strings.newResponsibleModal.studentIdRequired, "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const familyMemberPayload: Partial<CreateFamilyMemberData> & { studentIds?: number[] } = {
        fullName: familyMemberData.fullName,
        relationship: familyMemberData.relationship,
        phoneNumber: familyMemberData.phoneNumber,
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

      if (!editingId) {
        familyMemberPayload.studentIds = [parseInt(studentId)];
      }

      const addressPayload = {
        street: address.street!,
        neighborhood: address.neighborhood!,
        city: address.city!,
        state: address.state!,
        cep: address.cep!,
        number: address.number!,
        complement: address.complement || undefined,
      };

      if (editingId) {
        await updateFamilyMember(editingId, familyMemberPayload);

        const existingAddress = await getFamilyMemberAddress(editingId);
        
        if (existingAddress && existingAddress.cep) {
          await updateFamilyMemberAddress(editingId, addressPayload);
        } else {
          await createFamilyMemberAddress(editingId, addressPayload);
        }
        showToast(strings.newResponsibleModal.updateSuccessMessage, "success");
      } else {
        const familyMemberResponse = await createFamilyMember(familyMemberPayload as CreateFamilyMemberData);
  
        await createFamilyMemberAddress(familyMemberResponse.id, addressPayload);
        showToast(strings.newResponsibleModal.successMessage, "success");
      }
    
      await queryClient.invalidateQueries({ 
        queryKey: ["responsibles", studentId] 
      });

      setAddress(null);
      closeModal();
    } catch (error) {
      console.error("Error saving responsible:", error);
      const errorMessage = editingId 
        ? strings.newResponsibleModal.updateErrorMessage 
        : strings.newResponsibleModal.createErrorMessage;
      showToast(errorMessage, "error");
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
    isEditing: !!editingId,
  };
}