import { useEffect, useState } from "react";

import type { EditResponsibleModalProps, ResponsibleFormData } from "./interface";
import { useFilters } from "../../hooks/useFilters";
import { useToast } from "../../hooks/useToast";
import { updateFamilyMember, updateFamilyMemberAddress } from "../../services/family-members";
import type { CreateAddressData } from "../../services/family-members";

export function useEditResponsibleModal({
  responsibleId,
  onClose,
  onSuccess,
}: EditResponsibleModalProps) {
  const { showToast } = useToast();
  const { raceOptions, genderOptions, educationLevelOptions, socialProgramsOptions, employmentStatusOptions } = useFilters();

  const [formData, setFormData] = useState<ResponsibleFormData>({});
  const [address, setAddress] = useState<Partial<CreateAddressData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchResponsibleData() {
      try {
        // Aqui você precisa substituir com a chamada real do backend para buscar o responsável
        // Exemplo: const data = await getFamilyMemberById(responsibleId);
        // const addressData = await getFamilyMemberAddress(responsibleId);

        // Por enquanto, valores mock:
        const data: ResponsibleFormData = {}; 
        const addressData: Partial<CreateAddressData> = {};

        setFormData(data);
        setAddress(addressData);
      } catch {
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
    raceOptions,
    genderOptions,
    educationLevelOptions,
    socialProgramsOptions,
    employmentStatusOptions,
  };
}