import { Box, Select, Typography } from "@mui/material";

import { useSelectInput } from "./hook";
import type { SelectInputProps } from "./interface";

export function SelectInput<T = string>({
  label,
  options,
  id,
  placeholder = "",
}: SelectInputProps<T>) {
  const { setSelectInput, searchParams } = useSelectInput();

  const selectedValue = searchParams.get(`select${id}`);

  return (
    <Box sx={{paddingTop: 2}}>
      <Typography fontSize={16} fontWeight="bold">
        {label}
      </Typography>
      <Select
        native
        id="select"
        variant="outlined"
        slotProps={{
          input: {
            sx: {
              fontSize: 15,
              color: "black", 
              "&::placeholder": {
                color: "grey.900", 
                opacity: 0.5,
              },
            },
          },
        }}
        value={selectedValue ?? ""}
        onChange={(event) => setSelectInput(String(event.target.value), id)}
      >
        <option value="">{placeholder}</option>
        {options?.map(({ id, label }) => (
          <option key={String(id)} value={String(id)}>
            {label}
          </option>
        ))}
      </Select>
    </Box>
  );
}
