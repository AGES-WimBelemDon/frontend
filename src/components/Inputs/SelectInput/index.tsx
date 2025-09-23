import { Box, Select, Typography } from "@mui/material";

import { useSelectInput } from "./hook";
import type { SelectInputProps } from "../interface";

export function SelectInput({
  label,
  options,
  id,
}: SelectInputProps) {
  const { getSelect, setSelectInput } = useSelectInput({ id });

  return (
    <Box sx={{ paddingTop: 2 }}>
      <Typography fontSize={16} fontWeight="bold">
        {label}
      </Typography>
      <Select
        native
        id={`select${id}`}
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
        value={getSelect()}
        onChange={(select) => setSelectInput(String(select.target.value))}
      >
        <option value=""></option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </Box>
  );
}
