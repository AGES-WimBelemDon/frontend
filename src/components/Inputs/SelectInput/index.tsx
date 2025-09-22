import { Box, Select, Typography } from '@mui/material';

import { useSelectInput } from './hook';

export function SelectInput({
  label,
  options,
  id,
}: {
  label: string;
  options: string[];
  id: string;
}) {
  const { setSelectInput, searchParams } = useSelectInput();

  const select = searchParams.get(`select${id}`);

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
        value={select ?? ''}
        onChange={(select) => setSelectInput(String(select.target.value), id)}
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
