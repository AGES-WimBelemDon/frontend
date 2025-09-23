import { useQuery } from "@tanstack/react-query";

import { getOptionsForAgeRange, getOptionsForCivilState, type Option, type SelectId } from "../services/select-options";

export function useSelectOptions(selectId: SelectId) {
  const selectIdAPIMap: Record<SelectId, () => Promise<Option[]>> = {
    "age-range": getOptionsForAgeRange,
    "civil-state": getOptionsForCivilState,
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["selectOptions", selectId],
    queryFn: selectIdAPIMap[selectId],
  });

  return {
    isLoadingSelectOptions: isPending,
    selectOptionsError: error,
    selectOptions: data,
  };
}
