import { useEffect, useState } from "react";


import type { EditResponsibleModalProps, ResponsibleFormData } from "./interface";
import { useFilters } from "../../hooks/useFilters";
import { useScreenSize } from "../../hooks/useScreenSize";
import { useToast } from "../../hooks/useToast";
import { updateFamilyMember, updateFamilyMemberAddress, getFamilyMemberAddress, getFamilyMemberById } from "../../services/family-members";
import type { CreateAddressData } from "../../services/family-members";

export function useEditResponsibleModal({
  responsibleId,
  onClose,
  onSuccess,
}: EditResponsibleModalProps) {
  const { showToast } = useToast();
  const { isMobile } = useScreenSize();
  const { raceOptions, genderOptions, educationLevelOptions, socialProgramsOptions, employmentStatusOptions } = useFilters();

  const [formData, setFormData] = useState<ResponsibleFormData>({});
  const [address, setAddress] = useState<Partial<CreateAddressData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!responsibleId) return;

    async function fetchResponsibleData() {
      try {
        const data = await getFamilyMemberById(responsibleId);
        const addressData = await getFamilyMemberAddress(responsibleId);

        setFormData({
          fullName: data.fullName || "",
          socialName: data.socialName || "",
          registrationNumber: data.registrationNumber || "",
          dateOfBirth: data.dateOfBirth || "",
          nis: data.nis || "",
          phoneNumber: data.phoneNumber || "",
          email: data.email || "",
          relationship: data.relationship || "",
          race: data.race || "",
          gender: data.gender || "",
          educationLevel: data.educationLevel || "",
          socialPrograms: data.socialPrograms || "",
          employmentStatus: data.employmentStatus || "",
        });

        setAddress({
          street: addressData.street || "",
          neighborhood: addressData.neighborhood || "",
          city: addressData.city || "",
          state: addressData.state || "",
          cep: addressData.cep || "",
          number: addressData.number || "",
          complement: addressData.complement || "",
        });
      } catch {
        console.error("Erro ao carregar dados do responsável:", "error");
        showToast("Erro ao carregar os dados do responsável.", "error");
      }
    }

    fetchResponsibleData();
  }, [responsibleId, showToast]);

  function updateField<K extends keyof ResponsibleFormData>(field: K, value: ResponsibleFormData[K]) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function updateResponsible() {
    setIsSubmitting(true);
    try {
      await updateFamilyMember(responsibleId, formData);
      await updateFamilyMemberAddress(responsibleId, address);
      showToast("Responsável atualizado com sucesso!", "success");
      onSuccess?.();
      onClose();
    } catch {
      showToast("Erro ao atualizar o responsável.", "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    formData,
    address,
    updateField,
    setAddress,
    updateResponsible,
    isSubmitting,
    isMobile,
    raceOptions,
    genderOptions,
    educationLevelOptions,
    socialProgramsOptions,
    employmentStatusOptions,
  };
}